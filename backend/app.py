from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from utils import generate_hash, verify_hash, analyze_password_strength
from flask_cors import CORS
import requests

VIRUSTOTAL_API_KEY = ""

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['UPLOAD_FOLDER'] = './uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/hash-file', methods=['POST'])
def hash_file():
    file = request.files.get('file')
    algorithm = request.form.get('algorithm', 'SHA-256')

    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
    file.save(filepath)

    hash_result = generate_hash(filepath, algorithm)
    if 'error' in hash_result:
        return jsonify(hash_result), 400
    return jsonify({'hash': hash_result})

@app.route('/verify-hash', methods=['POST'])
def verify():
    file = request.files.get('file')
    expected_hash = request.form.get('expected_hash')
    algorithm = request.form.get('algorithm', 'SHA-256')

    if not file or not expected_hash:
        return jsonify({'error': 'File and expected hash are required'}), 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
    file.save(filepath)

    result = verify_hash(filepath, expected_hash, algorithm)
    return jsonify(result)

@app.route('/password-check', methods=['POST'])
def password_check():
    data = request.get_json()
    password = data.get('password', '')

    result = analyze_password_strength(password)
    return jsonify(result)

@app.route('/check-virus', methods=['POST'])
def check_virus():
    data = request.get_json()
    file_hash = data.get("hash", "").lower()

    if not file_hash:
        return jsonify({"error": "Hash is required"}), 400

    algo_map = {
        32: "MD5",
        40: "SHA-1",
        64: "SHA-256",
        128: "SHA-512"
    }
    algorithm = algo_map.get(len(file_hash), "Unknown")

    url = f"https://www.virustotal.com/api/v3/files/{file_hash}"
    headers = {
        "x-apikey": VIRUSTOTAL_API_KEY
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        result = response.json()
        data = result.get("data", {}).get("attributes", {})
        malicious = data.get("last_analysis_stats", {}).get("malicious", 0)
        harmless = data.get("last_analysis_stats", {}).get("harmless", 0)
        suspicious = data.get("last_analysis_stats", {}).get("suspicious", 0)

        return jsonify({
            "hash": file_hash,
            "algorithm": algorithm,
            "malicious": malicious,
            "harmless": harmless,
            "suspicious": suspicious,
            "message": "Hash ditemukan di VirusTotal",
            "verified": True
        })
    elif response.status_code == 404:
        return jsonify({
            "hash": file_hash,
            "algorithm": algorithm,
            "message": "Hash tidak ditemukan di VirusTotal",
            "verified": False
        })
    else:
        return jsonify({
            "error": "Gagal menghubungi VirusTotal",
            "status_code": response.status_code
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
