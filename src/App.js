import React, { useState } from "react";
import Navbar from "./components/Navbar";
import PasswordChecker from "./components/PasswordChecker";
import FileHasher from "./components/FileHasher";
import "./App.css"; // Untuk styling App.js

function App() {
	const [activeTab, setActiveTab] = useState("password"); // 'password' atau 'file'

	return (
		<div className="App">
			<header className="App-header">
				<h1>Kriptografi: Fungsi Hash & Integritas </h1>
				<p>Final Project ET234501 Kriptografi Tahun Ajaran 2024/2025 Genap </p>
			</header>

			<Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

			<main className="App-main">
				{activeTab === "password" && <PasswordChecker />}
				{activeTab === "file" && <FileHasher />}
			</main>

			<footer className="App-footer">
				<p>&copy; 2025 Final Project Kriptografi</p>
			</footer>
		</div>
	);
}

export default App;
