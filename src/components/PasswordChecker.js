import React, { useState, useEffect } from 'react';
import './PasswordChecker.css'; // Untuk styling

function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, feedback: '', color: 'gray' });

  useEffect(() => {
    if (password) {
      fetch("http://localhost:5000/password-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })
        .then((res) => res.json())
        .then((data) => {
          setHashedPassword(data.hash);
          setStrength({
            score: data.score,
            feedback: data.feedback,
            overall: data.overall,
            color: data.color,
          });
        })
        .catch((err) => console.error("Error:", err));
    } else {
      setHashedPassword("");
      setStrength({
        score: 0,
        feedback: "Masukkan password untuk mengecek kekuatannya.",
        color: "gray",
      });
    }
  }, [password]);  

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