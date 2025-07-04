import hashlib

def generate_hash(filepath, algorithm):
    try:
        hash_func = getattr(hashlib, algorithm.replace("-", "").lower(), None)
        if not hash_func:
            return {'error': 'Algoritma tidak dikenali'}

        with open(filepath, "rb") as f:
            file_bytes = f.read()
            hash_value = hash_func(file_bytes).hexdigest()
        return hash_value
    except Exception as e:
        return {'error': f'Error saat hashing: {str(e)}'}

def verify_hash(filepath, expected_hash, algorithm):
    actual_hash = generate_hash(filepath, algorithm)
    if isinstance(actual_hash, dict):
        return actual_hash
    if actual_hash.lower() == expected_hash.lower():
        return {'match': True, 'message': 'Hash cocok! Integritas file terverifikasi ✅'}
    else:
        return {'match': False, 'message': 'Hash TIDAK cocok! File mungkin telah diubah ❌'}

def analyze_password_strength(password):
    import re
    result = {
        'score': 0,
        'feedback': [],
        'color': 'gray',
        'hash': hashlib.sha256(password.encode()).hexdigest()
    }

    if len(password) >= 8:
        result['score'] += 1
    else:
        result['feedback'].append("Panjang minimal 8 karakter.")

    if re.search(r'[A-Z]', password):
        result['score'] += 1
    else:
        result['feedback'].append("Tambahkan huruf kapital.")

    if re.search(r'[a-z]', password):
        result['score'] += 1
    else:
        result['feedback'].append("Tambahkan huruf kecil.")

    if re.search(r'[0-9]', password):
        result['score'] += 1
    else:
        result['feedback'].append("Tambahkan angka.")

    if re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        result['score'] += 1
    else:
        result['feedback'].append("Tambahkan karakter khusus.")

    if result['score'] >= 4:
        result['color'] = 'green'
        result['overall'] = 'Sangat Kuat'
    elif result['score'] >= 3:
        result['color'] = 'orange'
        result['overall'] = 'Cukup Kuat'
    elif result['score'] >= 2:
        result['color'] = 'yellow'
        result['overall'] = 'Lemah'
    else:
        result['overall'] = 'Sangat Lemah'

    result['feedback'] = ' '.join(result['feedback']) if result['feedback'] else 'Password Anda sangat kuat!'
    return result
