import React, { useState } from 'react';
import './FileHasher.css';

function FileHasher() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [generatedHash, setGeneratedHash] = useState('');
  const [expectedHash, setExpectedHash] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [virusCheckResult, setVirusCheckResult] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setGeneratedHash('');
    setVerificationResult('');
    setExpectedHash('');
    setVirusCheckResult(null);
  };

  const handleGenerateHash = async () => {
    if (!selectedFile) {
      alert("Pilih file terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("algorithm", algorithm);

    try {
      const response = await fetch("http://localhost:5000/hash-file", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.hash) {
        setGeneratedHash(data.hash);
        setVirusCheckResult(null); // reset
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Gagal fetch:", error);
      alert("Terjadi kesalahan saat menghubungi server.");
    }
  };

  const handleVerifyHash = async () => {
    if (!selectedFile || !expectedHash) {
      setVerificationResult("Silakan generate hash dan masukkan hash yang diharapkan.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("expected_hash", expectedHash);
    formData.append("algorithm", algorithm);

    try {
      const response = await fetch("http://localhost:5000/verify-hash", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setVerificationResult(data.message);
    } catch (error) {
      console.error("Gagal verifikasi:", error);
      alert("Terjadi kesalahan saat menghubungi server.");
    }
  };

  const handleCheckVirusTotal = async () => {
    try {
      const res = await fetch("http://localhost:5000/check-virus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hash: generatedHash }),
      });

      const data = await res.json();
      setVirusCheckResult(data);
    } catch (error) {
      console.error("Gagal cek VirusTotal:", error);
      alert("Gagal menghubungi server VirusTotal.");
    }
  };

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
          <option value="SHA-1">SHA-1 (Tidak direkomendasikan)</option>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-512">SHA-512</option>
        </select>
      </div>

      <button onClick={handleGenerateHash} disabled={!selectedFile}>Generate Hash</button>

      {generatedHash && (
        <div className="hash-result">
          <h3>Hash yang Dihasilkan ({algorithm}):</h3>
          <p className="hashed-value">{generatedHash}</p>
          <button onClick={handleCheckVirusTotal}>Cek di VirusTotal</button>
        </div>
      )}

      {virusCheckResult && (
        <div className="virus-check-result">
          <h3>Hasil Pemeriksaan VirusTotal:</h3>
          <p><strong>Status:</strong> {virusCheckResult.verified ? "✅ Hash dikenali" : "❌ Hash tidak ditemukan"}</p>
          {virusCheckResult.verified && (
            <>
              <p><strong>Malicious:</strong> {virusCheckResult.malicious}</p>
              <p><strong>Harmless:</strong> {virusCheckResult.harmless}</p>
              <p><strong>Suspicious:</strong> {virusCheckResult.suspicious}</p>
            </>
          )}
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
