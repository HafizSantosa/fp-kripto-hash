import React, { useState } from 'react';
import { sha256, sha512, md5 } from 'js-sha256'; // js-sha256 juga memiliki md5, sha512
import './FileHasher.css'; // Untuk styling

function FileHasher() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [generatedHash, setGeneratedHash] = useState('');
  const [expectedHash, setExpectedHash] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setGeneratedHash('');
    setVerificationResult('');
  };

  const handleGenerateHash = async () => {
    if (!selectedFile) {
      alert('Pilih file terlebih dahulu!');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const buffer = e.target.result;
      let hash = '';

      // Untuk demo, kita baca seluruh file ke memori. Untuk file sangat besar,
      // ini bisa dioptimalkan dengan membaca per bagian (chunking).
      switch (algorithm) {
        case 'MD5':
          hash = md5(buffer);
          break;
        case 'SHA-1':
          // js-sha256 tidak memiliki SHA-1 secara built-in.
          // Anda mungkin perlu library lain seperti 'crypto-js' atau implementasi manual
          // Untuk demo ini, kita bisa lewati atau gunakan SHA-256 sebagai placeholder
          alert('SHA-1 tidak didukung oleh library demo ini. Silakan pilih SHA-256 atau SHA-512.');
          hash = 'N/A';
          break;
        case 'SHA-256':
          hash = sha256(buffer);
          break;
        case 'SHA-512':
          hash = sha512(buffer);
          break;
        default:
          hash = '';
      }
      setGeneratedHash(hash);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleVerifyHash = () => {
    if (!generatedHash || !expectedHash) {
      setVerificationResult('Silakan generate hash file dan masukkan hash yang diharapkan.');
      return;
    }
    if (generatedHash.toLowerCase() === expectedHash.toLowerCase()) {
      setVerificationResult('Hash cocok! Integritas file terverifikasi. ✅');
    } else {
      setVerificationResult('Hash TIDAK cocok! File mungkin telah dirusak atau diubah. ❌');
    }
  };

  return (
    <div className="file-hasher">
      <h2>File Hash Generator & Verifier </h2>
      <p>Verifikasi integritas file menggunakan fungsi hash. </p>

      <div className="input-group">
        <label htmlFor="file-input">Pilih File:</label>
        <input type="file" id="file-input" onChange={handleFileChange} />
        {selectedFile && <p>File terpilih: <strong>{selectedFile.name}</strong></p>}
      </div>

      <div className="input-group">
        <label htmlFor="algorithm-select">Pilih Algoritma Hash:</label>
        <select id="algorithm-select" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="MD5">MD5</option>
          {/* <option value="SHA-1">SHA-1 (Tidak direkomendasikan untuk keamanan)</option> */}
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
          <p className="verification-result">{verificationResult}</p>
        )}
      </div>
    </div>
  );
}

export default FileHasher;