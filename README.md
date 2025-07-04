# Final Project: Kriptografi - Fungsi Hash & Integritas

## ET234501 Kriptografi - Tahun Ajaran 2024/2025 Genap

**Anggota Kelompok**
| NRP        | Nama                                 |
|-------------|---------------------------------------|
| 5027221044  | Subkhan Masudi                        |
| 5027221058  | Irfan Qobus Salim                     |
| 5027221061  | Hafiz Akmaldi Santosa                 |
| 5027221030  | Atha Rahma A                          |
| 5027221047  | Angela Christie                       |
| 5027221051  | Ditya Wahyu Ramdhan                   |
| 5027221050  | Jody Hezekiah Tanasa Sagala           |
| 5002211173  | Aini Rini Yara Fadillah               |


---

## 1. Pendahuluan

Proyek ini adalah bagian dari tugas Final Project mata kuliah Kriptografi (ET234501) yang berfokus pada implementasi praktis dari konsep Fungsi Hash dan Verifikasi Integritas. Aplikasi web ini terdiri dari dua komponen utama:

1.  **Password Strength Checker:** Mendemonstrasikan bagaimana fungsi hash digunakan dalam keamanan *password* dan memberikan umpan balik tentang kekuatan *password*.
2.  **File Hash Generator & Verifier:** Memungkinkan pengguna menghasilkan hash dari sebuah file menggunakan berbagai algoritma (MD5, SHA-1, SHA-256, SHA-512) dan memverifikasi integritas file dengan membandingkan hash yang dihasilkan dengan hash yang diharapkan.

Tujuan utama dari proyek ini adalah untuk memperdalam pemahaman teori tentang fungsi hash dan bagaimana aplikasi ini dapat digunakan untuk memastikan integritas data dan keamanan informasi.

---

## 2. Fitur Aplikasi

### 2.1. Password Strength Checker

* **Input Password:** Input teks untuk memasukkan *password*.
* **Generasi Hash (SHA-256):** Secara otomatis menghitung dan menampilkan hash SHA-256 dari *password* yang dimasukkan. Dilengkapi dengan penjelasan bahwa dalam sistem nyata, hanya hash yang disimpan.
* **Indikator Kekuatan Password:** Memberikan penilaian visual (progress bar dan warna) serta saran tekstual berdasarkan panjang, penggunaan huruf besar/kecil, angka, dan karakter khusus.
* **Umpan Balik Instan:** Memberikan *feedback* secara *real-time* saat *password* diketik.

### 2.2. File Hash Generator & Verifier

* **Unggah File:** Memungkinkan pengguna untuk memilih file dari perangkat mereka.
* **Pilihan Algoritma Hash:** Mendukung beberapa algoritma hashing populer seperti MD5, SHA-1, SHA-256, dan SHA-512.
* **Generasi Hash:** Menghitung dan menampilkan nilai hash dari file yang diunggah menggunakan algoritma yang dipilih.
* **Verifikasi Integritas:** Pengguna dapat menempelkan hash yang diharapkan, dan aplikasi akan membandingkannya dengan hash yang dihasilkan dari file yang diunggah untuk memverifikasi integritasnya.
* **Visualisasi Hasil Verifikasi:** Menampilkan pesan keberhasilan (hijau) atau kegagalan (merah) secara jelas.

---

## 3. Teknologi yang Digunakan

* **Frontend:** React.js 
* **Backend:** Python (Flask)
* **Bahasa Pemrograman:** JavaScript
* **Styling:** CSS
* **Library Hashing:** Hashlib

### 3.1 Penjelasan logika cara kerja MD5, SHA-1, SHA-256, dan SHA-512 :

#### 1. MD5  
* MD5 menghasilkan output 128-bit (32 karakter heksadesimal).

* Langkah-langkah:

    1. Padding: Pesan dipanjangkan agar panjangnya ≡ 448 mod 512 bit (agar totalnya 512-bit block).

    2. Inisialisasi: 4 register 32-bit (A, B, C, D).

    3. Pembagian: Data dibagi menjadi blok 512-bit.

    4. Transformasi: Setiap blok diproses dalam 4 ronde (total 64 operasi) menggunakan fungsi logika (F, G, H, I).

    5. Output: A, B, C, D digabungkan menjadi hash 128-bit. 

* Rumus Fungsi Non-Linear :
```F(B, C, D) = (B ∧ C) ∨ (¬B ∧ D)
G(B, C, D) = (B ∧ D) ∨ (C ∧ ¬D)
H(B, C, D) = B ⊕ C ⊕ D
I(B, C, D) = C ⊕ (B ∨ ¬D)
```

#### 2. SHA-1 
**Logika Dasar:**
* Input dibagi jadi blok 512-bit.

* 5 register 32-bit: A, B, C, D, E

* 80 ronde proses, tiap 20 ronde pakai fungsi dan konstanta berbeda.

**Rumus Fungsi Per Ronde:**
```
f(t; B,C,D) = 
    (B ∧ C) ∨ (¬B ∧ D)        untuk 0 ≤ t ≤ 19
    B ⊕ C ⊕ D                untuk 20 ≤ t ≤ 39
    (B ∧ C) ∨ (B ∧ D) ∨ (C ∧ D)  untuk 40 ≤ t ≤ 59
    B ⊕ C ⊕ D                untuk 60 ≤ t ≤ 79

```

#### 3. SHA-256
* Input dibagi jadi blok 512-bit.

* 8 register 32-bit: A, B, C, D, E, F, G, H

* 64 ronde proses, tiap 16 ronde pakai fungsi dan konstanta berbeda.

**Inisialisasi Hash Values**
```
8 konstanta 32-bit (akar kuadrat dari 8 bilangan prima pertama):
H₀ = 0x6a09e667    H₄ = 0x510e527f
H₁ = 0xbb67ae85    H₅ = 0x9b05688c
H₂ = 0x3c6ef372     H₆ = 0x1f83d9ab
H₃ = 0xa54ff53a      H₇ = 0x5be0cd19
```
**Empat Ronde Operasi (Total 64 langkah)**

**Untuk setiap 512-bit chunk:**
* Bagi menjadi 16 kata 32-bit (W₀ sampai W₁₅)
* Extend menjadi 64 kata menggunakan rumus: Wₜ = σ₁(Wₜ₋₂) + Wₜ₋₇ + σ₀(Wₜ₋₁₅) + Wₜ₋₁₆
* Jalankan 64 rounds kompresi dengan 8 working variables (a,b,c,d,e,f,g,h)
* Update hash values

#### 4. SHA-512

**Logika Dasar:**
* Input dibagi menjadi blok 1024-bit.

* Register: 8 buah @ 64-bit (a–h).

* 80 ronde, dengan rumus hampir sama seperti SHA-256 tapi bit-nya 64.

**fungsi**
```
Ch(x, y, z)  = (x ∧ y) ⊕ (¬x ∧ z)
Maj(x, y, z) = (x ∧ y) ⊕ (x ∧ z) ⊕ (y ∧ z)

Σ0(x) = ROTR²⁸(x) ⊕ ROTR³⁴(x) ⊕ ROTR³⁹(x)
Σ1(x) = ROTR¹⁴(x) ⊕ ROTR¹⁸(x) ⊕ ROTR⁴¹(x)

σ0(x) = ROTR¹(x) ⊕ ROTR⁸(x) ⊕ SHR⁷(x)
σ1(x) = ROTR¹⁹(x) ⊕ ROTR⁶¹(x) ⊕ SHR⁶(x)

```


## 4. Cara Menjalankan Aplikasi

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi secara lokal di mesin Anda:

1.  **Clone Repository (jika ini adalah repositori Git Anda):**
    ```bash
    git clone https://github.com/HafizSantosa/fp-kripto-hash
    cd fp-kripto-hash
    ```

2.  **Instal Dependensi:**
    Pastikan Node.js dan npm (Node Package Manager) sudah terinstal di sistem Anda. Kemudian, instal semua dependensi yang diperlukan dengan perintah:
    ```bash
    npm install
    ```
3.  **Jalankan Backend:**
    Pastikan Python sudah terinstal di sistem Anda. Kemudian, instal semua dependensi yang diperlukan dengan perintah:
    ```bash
    pip install -r requirements.txt
    ```
    Kemudian, jalankan backend dengan perintah:
    ```bash
    python backend/app.py
    ```
    Backend akan berjalan di `http://localhost:5000`

4.  **Jalankan Frontend:**
    Setelah backend, jalankan frontend menggunakan perintah:
    ```bash
    npm start
    ```
    Aplikasi akan terbuka di *browser* default (`http://localhost:3000`).

---

## 5. Cara Penggunaan Aplikasi

### 5.1. Password Strength Checker

1. Akses tab **"Password Strength Checker"** pada antarmuka aplikasi.
2. Ketikkan *password* Anda di kolom input yang tersedia.
3. Sistem secara otomatis akan mengirimkan password ke backend untuk dianalisis.
4. Hasil yang ditampilkan meliputi:
   - Nilai hash SHA-256 dari password Anda.
   - Indikator kekuatan password berupa warna dan *progress bar*.
   - Umpan balik atau saran perbaikan jika password dianggap lemah.

---

#### 5.1.1 Logika Penilaian (Backend - Python)

Logika penilaian password dilakukan oleh backend menggunakan fungsi `analyze_password_strength(password)` di Python.

Berikut ini penjelasan algoritma yang digunakan:

| Kriteria Pemeriksaan Password          | Poin | Umpan Balik Jika Tidak Terpenuhi               |
|----------------------------------------|------|------------------------------------------------|
| Panjang minimal 8 karakter             | +1   | Panjang minimal 8 karakter                     |
| Mengandung huruf kapital (A–Z)         | +1   | Tambahkan huruf kapital                        |
| Mengandung huruf kecil (a–z)           | +1   | Tambahkan huruf kecil                          |
| Mengandung angka (0–9)                 | +1   | Tambahkan angka                                |
| Mengandung karakter khusus (!@#$%...)  | +1   | Tambahkan karakter khusus (!@#$%...)          |

**Total Skor Maksimal: 5**

---

#### Interpretasi Skor

| Skor | Kekuatan      | Warna Tampilan |
|------|---------------|----------------|
| 4–5  | Sangat Kuat   | Hijau          |
| 3    | Cukup Kuat    | Oranye         |
| 2    | Lemah         | Kuning         |
| 0–1  | Sangat Lemah  | Merah          |

---

Fungsi ini akan mengembalikan:
- `score`: Skor akhir kekuatan password.
- `feedback`: Saran perbaikan jika ada kriteria yang tidak terpenuhi.
- `overall`: Penilaian umum seperti “Sangat Lemah” hingga “Sangat Kuat”.
- `color`: Warna indikator kekuatan.

---

> 🔐 *Catatan: Nilai hash yang ditampilkan merupakan hasil simulasi hashing dengan algoritma SHA-256. Dalam praktik nyata, hash inilah yang disimpan di database, bukan password aslinya.*

#### 5.1.2 UI/UX (Hasil yang di perlihatkan)

1. **Sangat Lemah**
![passwordsangatlemah](dokumentasi/Password%20Strength%20Checker/pass-sangat-lemah.png)

2. **Lemah**
![passwordlemah](dokumentasi/Password%20Strength%20Checker/pass-lemah.png)

3. **Cukup Kuat**   
![passwordcukupkuat](dokumentasi/Password%20Strength%20Checker/pass-cukup-kuat.png)

4. **Sangat Kuat**
![passwordsangatkuat](dokumentasi/Password%20Strength%20Checker/pass-sangat-kuat.png)


### 5.2. File Hash Generator & Verifier

1. Akses tab **"File Hash Generator & Verifier"** pada antarmuka aplikasi.
2. Klik tombol **"Pilih File"** dan pilih file dari komputer Anda.
3. Pilih algoritma hash yang diinginkan dari dropdown:
   - `MD5`
   - `SHA-1`
   - `SHA-256`
   - `SHA-512`
4. Klik tombol **"Generate Hash"** untuk mengirim file ke backend dan menghasilkan nilai hash.
5. Nilai hash dari file akan ditampilkan setelah diproses oleh server Flask.
6. Backend juga secara otomatis mengirimkan hash ke **VirusTotal** untuk mengecek apakah hash tersebut sudah terdaftar sebagai file berbahaya atau aman.
7. Hasil pengecekan dari VirusTotal akan ditampilkan, meliputi:
   - Apakah file tersebut pernah terdeteksi sebelumnya,
   - Jumlah engine antivirus yang menandai file sebagai malicious atau clean.
8. Untuk melakukan verifikasi manual:
   - Tempelkan hash dari sumber terpercaya ke kolom **"Hash yang Diharapkan"**.
   - Klik **"Verifikasi Hash"** untuk mengecek apakah hash tersebut sesuai dengan file yang Anda upload.

---

#### 🔧 Backend Logic

- File dikirim ke endpoint Flask `/hash-file`, disimpan sementara di folder `uploads/`, dan dihitung hash-nya menggunakan algoritma yang dipilih.
- Hash yang dihasilkan akan dicek ke **VirusTotal** menggunakan API publik untuk melihat riwayat keamanan file tersebut.
- Untuk verifikasi manual, file dikirim ke endpoint `/verify-hash` dan dibandingkan dengan nilai hash yang diinput oleh pengguna.

---

> *VirusTotal adalah layanan pemindaian file dan URL yang mengintegrasikan puluhan engine antivirus, sehingga pengguna dapat mengecek apakah file mereka aman berdasarkan hash.* <br>
> *Catatan: Folder `uploads/` hanya menyimpan file sementara selama proses hash dan verifikasi berlangsung. File tidak disimpan secara permanen.*


#### Cara penggunaan 

1. Akses tab "File Hash Generator & Verifier"

![halamanview](dokumentasi/File%20Hash%20Generator%20&%20Verifier/tampilan%20web.png)


2. Klik tombol "Pilih File" dan pilih file dari komputer Anda 
 ![pilihfile](dokumentasi/File%20Hash%20Generator%20&%20Verifier/pilih-file.png)


 3. Pilih algoritma hash yang diinginkan

 ![pilihalgoritma](dokumentasi/File%20Hash%20Generator%20&%20Verifier/pilih-algo.png)

 4. Klik tombol "Generate Hash". Hash file akan ditampilkan.

 ![generatehash](dokumentasi/File%20Hash%20Generator%20&%20Verifier/generate-hash.png)

 5. Hasil verifikasi manual dan dari VirusTotal dari hash yang di generate

 ![hasilhash](dokumentasi/File%20Hash%20Generator%20&%20Verifier/image.png)
---

## 6. Dokumentasi Teknis dan Desain

* **Struktur Folder:**
    * `public/`: Berisi `index.html` dan aset statis lainnya.
    * `src/`: Berisi kode sumber React:
        * `components/`: Folder untuk komponen UI modular (`Navbar.js`, `PasswordChecker.js`, `FileHasher.js`).
        * `App.js`: Komponen utama yang mengelola navigasi dan merender komponen fitur.
        * `index.js`: Titik masuk aplikasi React.
        * `App.css`, `index.css`, dll.: File styling CSS.
    * `backend/`: Folder untuk backend Flask API:
        * `app.py`: File utama yang berisi endpoint Flask (`/password-check`, `/hash-file`, `/verify-hash`) serta integrasi dengan VirusTotal API.
        * `utils.py`: Berisi fungsi-fungsi pendukung seperti:
            * `generate_hash()`: Fungsi hashing berdasarkan algoritma.
            * `verify_hash()`: Fungsi verifikasi hash file.
            * `analyze_password_strength()`: Fungsi penilaian kekuatan password.
            * `check_hash_virustotal()`: Fungsi untuk memeriksa hash ke VirusTotal.
        * `uploads/`: Folder sementara untuk menyimpan file yang diunggah dari frontend sebelum diproses (hash/verifikasi).
        * `requirements.txt`: Daftar dependensi Python (Flask, Flask-CORS, requests, dll).

* **Pengelolaan State:** Aplikasi menggunakan React Hooks (`useState`, `useEffect`) untuk mengelola state lokal komponen, seperti *password* yang dimasukkan, file yang dipilih, hash yang dihasilkan, dan hasil verifikasi.
* **Perhitungan Hash (Backend Flask)**

    - Perhitungan hash **tidak lagi dilakukan di sisi client** (browser).
    - File dikirim ke backend melalui HTTP POST (`/hash-file`) menggunakan `FormData`.
    - Di backend (Python Flask), file disimpan sementara ke folder `uploads/` dan dibaca secara biner.
    - Hash dihitung menggunakan **library `hashlib`** bawaan Python, yang mendukung berbagai algoritma seperti:
        - MD5
        - SHA-1
        - SHA-256
        - SHA-512
    - Hasil hash kemudian dikembalikan ke frontend dalam format JSON dan ditampilkan kepada pengguna.

---

## 7. Pembagian Tugas Individu 

Ini adalah bagian penting untuk penilaian individu. Harap isi dengan kontribusi nyata setiap anggota kelompok.

* **Hafiz Akmaldi Santosa (Ketua Tim & Arsitek Aplikasi)**
    * Mengkoordinasikan keseluruhan proyek dan memfasilitasi komunikasi tim.
    * Mendesain arsitektur aplikasi (struktur komponen, alur data).
    * Membuat *boilerplate* proyek React dan mengonfigurasi dependensi utama.
    * Melakukan *code review* dan memastikan konsistensi kode.
    * Bertanggung jawab atas integrasi akhir semua komponen.
    * Rajin sholat
* **Atha Rahma A (Pengembang Komponen Password Strength Checker - Logika)**
    * Mengembangkan logika inti untuk analisis kekuatan *password* dan memberikan saran peningkatan.
    * Mengintegrasikan perhitungan hash SHA-256 untuk simulasi penyimpanan *password*.
    * Melakukan *unit testing* untuk logika kekuatan *password*.
* **Irfan Qobus Salim (Pengembang Komponen Password Strength Checker - UI/UX)**
    * Merancang dan mengimplementasikan antarmuka pengguna (UI) komponen "Password Strength Checker" (input, tampilan hash, progress bar).
    * Menerapkan *styling* CSS yang menarik dan responsif untuk komponen ini.
    * Memastikan pengalaman pengguna (UX) yang intuitif dan *feedback* visual yang jelas.
* **Angela Christie (Pengembang Komponen File Hasher - Logika)**
    * Mengembangkan logika inti untuk membaca file dan menghitung hash menggunakan `crypto-js`.
    * Menangani konversi `ArrayBuffer` ke `WordArray` untuk `crypto-js`.
    * Mengimplementasikan logika perbandingan hash untuk fungsi verifikasi integritas file.
    * Melakukan *unit testing* untuk fungsi hashing dan verifikasi.
* **Subkhan Masudi (Pengembang Komponen File Hasher - UI/UX)**
    * Merancang dan mengimplementasikan antarmuka pengguna (UI) komponen "File Hash Generator & Verifier" (input file, *dropdown* algoritma, tampilan hash, input hash yang diharapkan, hasil verifikasi).
    * Menerapkan *styling* CSS yang menarik dan responsif untuk komponen ini.
    * Memastikan *feedback* visual yang jelas untuk status penghitungan dan hasil verifikasi.
* **Aini Rini Yara Fadillah (Pengembang Komponen Umum & Struktur Navigasi)**
    * Mengembangkan komponen `App.js` dan `Navbar.js` yang mengatur struktur aplikasi dan navigasi antar fitur.
    * Mendesain dan mengimplementasikan *styling* CSS global (`App.css`, `Navbar.css`).
    * Memastikan konsistensi *styling* dan tata letak di seluruh aplikasi.
    * Bertanggung jawab atas integrasi awal komponen *PasswordChecker* dan *FileHasher* ke dalam `App.js`.
* **Ditya Wahyu Ramdhan (Dokumentasi & Konten Teoritis)**
    * Menyusun dan menulis semua bagian dokumentasi `README.md` secara detail dan akurat.
    * Menjelaskan konsep teoritis fungsi hash dan integritas data yang relevan dengan aplikasi.
    * [cite_start]Menyiapkan materi dasar untuk presentasi teori terkait topik yang dipilih.
* **Jody Hezekiah Tanasa Sagala (Pengujian & Debugging)**
    * Melakukan pengujian fungsionalitas menyeluruh untuk kedua komponen aplikasi.
    * Menguji berbagai skenario dan kasus batas untuk mengidentifikasi *bug* atau *error*.
    * Membantu dalam proses *debugging* dan verifikasi perbaikan.
    * Memverifikasi akurasi hash yang dihasilkan oleh aplikasi dengan alat hashing eksternal yang terpercaya.


---
