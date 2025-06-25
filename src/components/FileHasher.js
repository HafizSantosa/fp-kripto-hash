import React, { useState } from 'react';
import CryptoJS from 'crypto-js'; // Menggunakan crypto-js untuk hashing
import './FileHasher.css'; // Untuk styling

function FileHasher() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [algorithm, setAlgorithm] = useState('SHA-256'); // Default algoritma
  const [generatedHash, setGeneratedHash] = useState('');
  const [expectedHash, setExpectedHash] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setGeneratedHash(''); // Reset hash saat file berubah
    setVerificationResult(''); // Reset hasil verifikasi saat file berubah
    setExpectedHash(''); // Reset expected hash juga agar bersih
  };

  const handleGenerateHash = async () => {
    if (!selectedFile) {
      alert('Pilih file terlebih dahulu!');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target.result; // Hasil pembacaan file sebagai ArrayBuffer
      // Konversi ArrayBuffer ke WordArray yang dibutuhkan oleh CryptoJS
      const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);

      let hash = '';

      try {
        switch (algorithm) {
          case 'MD5':
            hash = CryptoJS.MD5(wordArray).toString();
            break;
          case 'SHA-1':
            hash = CryptoJS.SHA1(wordArray).toString();
            break;
          case 'SHA-256':
            hash = CryptoJS.SHA256(wordArray).toString();
            break;
          case 'SHA-512':
            hash = CryptoJS.SHA512(wordArray).toString();
            break;
          default:
            hash = 'Algoritma tidak dikenal';
            break;
        }
      } catch (error) {
        console.error('Error generating hash:', error);
        hash = 'Error saat menghasilkan hash';
        alert('Terjadi kesalahan saat menghasilkan hash. Cek konsol browser untuk detail.');
      }
      setGeneratedHash(hash);
    };
    reader.readAsArrayBuffer(selectedFile); // Baca file sebagai ArrayBuffer
  };

  const handleVerifyHash = () => {
    // Pastikan hash yang dihasilkan dan hash yang diharapkan tidak kosong
    if (!generatedHash || !expectedHash) {
      setVerificationResult('Silakan generate hash file dan masukkan hash yang diharapkan.');
      return;
    }

    // Bandingkan hash (case-insensitive)
    if (generatedHash.toLowerCase() === expectedHash.toLowerCase()) {
      setVerificationResult('Hash cocok! Integritas file terverifikasi. ✅');
    } else {
      setVerificationResult('Hash TIDAK cocok! File mungkin telah dirusak atau diubah. ❌');
    }
  };

  // Menambahkan kelas dinamis untuk hasil verifikasi
  const getVerificationResultClass = () => {
    if (verificationResult.includes('✅')) {
      return 'verification-result success';
    } else if (verificationResult.includes('❌')) {
      return 'verification-result failure';
    }
    return 'verification-result';
  };

  return (
    <div className="file-hasher">
      <h2>File Hash Generator & Verifier</h2>
      <p>Verifikasi integritas file menggunakan fungsi hash.</p>

      <div className="input-group">
        <label htmlFor="file-input">Pilih File:</label>
        <input type="file" id="file-input" onChange={handleFileChange} />
        {selectedFile && <p>File terpilih: <strong>{selectedFile.name}</strong></p>}
      </div>

      <div className="input-group">
        <label htmlFor="algorithm-select">Pilih Algoritma Hash:</label>
        <select id="algorithm-select" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="MD5">MD5</option>
          <option value="SHA-1">SHA-1 (Tidak direkomendasikan untuk keamanan)</option>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-512">SHA-512</option>
        </select>
      </div>

      <button onClick={handleGenerateHash} disabled={!selectedFile}>Generate Hash</button>

      {generatedHash && (
        <div className="hash-result">
          <h3>Hash yang Dihasilkan ({algorithm}):</h3>
          <p className="hashed-value">{generatedHash}</p>
        </div>
      )}

      <div className="verification-section">
        <h3>Verifikasi Integritas File:</h3>
        <p className="concept-note">
          Tempelkan hash yang diharapkan dari sumber terpercaya untuk memverifikasi apakah file ini asli dan tidak berubah.
        </p>
        <div className="input-group">
          <label htmlFor="expected-hash">Hash yang Diharapkan:</label>
          <input
            type="text"
            id="expected-hash"
            value={expectedHash}
            onChange={(e) => setExpectedHash(e.target.value)}
            placeholder="Masukkan hash yang diharapkan di sini"
          />
        </div>
        <button onClick={handleVerifyHash} disabled={!generatedHash}>Verifikasi Hash</button>
        {verificationResult && (
          <p className={getVerificationResultClass()}>{verificationResult}</p>
        )}
      </div>
    </div>
  );
}

export default FileHasher;