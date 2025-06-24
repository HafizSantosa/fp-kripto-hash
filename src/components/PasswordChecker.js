import React, { useState, useEffect } from 'react';
import { sha256 } from 'js-sha256'; // Instal library ini: npm install js-sha256
import './PasswordChecker.css'; // Untuk styling

function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, feedback: '', color: 'gray' });

  useEffect(() => {
    if (password) {
      setHashedPassword(sha256(password));
      analyzePasswordStrength(password);
    } else {
      setHashedPassword('');
      setStrength({ score: 0, feedback: 'Masukkan password untuk mengecek kekuatannya.', color: 'gray' });
    }
  }, [password]);

  const analyzePasswordStrength = (pwd) => {
    let score = 0;
    let feedback = [];

    if (pwd.length >= 8) {
      score += 1;
    } else {
      feedback.push('Panjang minimal 8 karakter.');
    }
    if (/[A-Z]/.test(pwd)) {
      score += 1;
    } else {
      feedback.push('Tambahkan huruf kapital.');
    }
    if (/[a-z]/.test(pwd)) {
      score += 1;
    } else {
      feedback.push('Tambahkan huruf kecil.');
    }
    if (/[0-9]/.test(pwd)) {
      score += 1;
    } else {
      feedback.push('Tambahkan angka.');
    }
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) {
      score += 1;
    } else {
      feedback.push('Tambahkan karakter khusus (!@#$%...).');
    }

    let color = 'red';
    let overallFeedback = 'Sangat Lemah';
    if (score >= 4) {
      color = 'green';
      overallFeedback = 'Sangat Kuat';
    } else if (score >= 3) {
      color = 'orange';
      overallFeedback = 'Cukup Kuat';
    } else if (score >= 2) {
      color = 'yellow';
      overallFeedback = 'Lemah';
    }

    setStrength({
      score: score,
      feedback: feedback.length > 0 ? feedback.join(' ') : 'Password Anda sangat kuat!',
      overall: overallFeedback,
      color: color
    });
  };

  return (
    <div className="password-checker">
      <h2>Password Strength Checker </h2>
      <p>Aplikasi ini mensimulasikan penggunaan fungsi hash untuk keamanan password. </p>
      <div className="input-group">
        <label htmlFor="password-input">Masukkan Password:</label>
        <input
          type="password"
          id="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ketik password Anda di sini"
        />
      </div>

      <div className="strength-display">
        <h3>Kekuatan Password: <span style={{ color: strength.color }}>{strength.overall}</span></h3>
        <div className="strength-bar-container">
          <div className="strength-bar" style={{ width: `${(strength.score / 5) * 100}%`, backgroundColor: strength.color }}></div>
        </div>
        <p className="strength-feedback">{strength.feedback}</p>
      </div>

      {password && (
        <div className="hash-display">
          <h3>Hash SHA-256 Password (Simulasi):</h3>
          <p className="hashed-value">{hashedPassword}</p>
          <p className="concept-note">
            Dalam sistem nyata, hanya hash ini yang disimpan di database, bukan password asli. Ini menjaga keamanan data.
          </p>
        </div>
      )}
    </div>
  );
}

export default PasswordChecker;