import React from 'react';
import './Navbar.css'; // Untuk styling Navbar

function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <button
        className={activeTab === 'password' ? 'active' : ''}
        onClick={() => setActiveTab('password')}
      >
        Password Strength Checker
      </button>
      <button
        className={activeTab === 'file' ? 'active' : ''}
        onClick={() => setActiveTab('file')}
      >
        File Hash Generator & Verifier
      </button>
    </nav>
  );
}

export default Navbar;