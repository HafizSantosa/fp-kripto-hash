# Final Project: Kriptografi - Fungsi Hash & Integritas

## ET234501 Kriptografi - Tahun Ajaran 2024/2025 Genap

**Anggota Kelompok**
- 5027221044 - Subkhan Masudi
- 5027221058 - Irfan Qobus Salim
- 5027221061 - Hafiz Akmaldi Santosa
- 5027221030 - Atha Rahma A
- 5027221047 - Angela Christie
- 5027221051 - Ditya Wahyu Ramdhan
- 5027221050 - Jody Hezekiah Tanasa Sagala
- 5002211173 - Aini Rini Yara Fadillah

---

## 1. Pendahuluan

Proyek ini adalah bagian dari tugas Final Project mata kuliah Kriptografi (ET234501) yang berfokus pada implementasi praktis dari konsep Fungsi Hash dan Verifikasi Integritas. Aplikasi web ini terdiri dari dua komponen utama:

1.  **Password Strength Checker:** Mendemonstrasikan bagaimana fungsi hash digunakan dalam keamanan *password* dan memberikan umpan balik tentang kekuatan *password*.
2.  **File Hash Generator & Verifier:** Memungkinkan pengguna menghasilkan hash dari sebuah file menggunakan berbagai algoritma (MD5, SHA-1, SHA-256, SHA-512) dan memverifikasi integritas file dengan membandingkan hash yang dihasilkan dengan hash yang diharapkan.

[cite_start]Tujuan utama dari proyek ini adalah untuk memperdalam pemahaman teori tentang fungsi hash dan bagaimana aplikasi ini dapat digunakan untuk memastikan integritas data dan keamanan informasi.

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

* [cite_start]**Frontend:** React.js 
* **Bahasa Pemrograman:** JavaScript
* **Styling:** CSS
* **Library Hashing:** `crypto-js` (untuk MD5, SHA-1, SHA-256, SHA-512)

---

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
    Ini akan menginstal React dan `crypto-js`.

3.  **Jalankan Aplikasi:**
    Setelah instalasi selesai, jalankan aplikasi menggunakan perintah:
    ```bash
    npm start
    ```
    Aplikasi akan terbuka di *browser* default (`http://localhost:3000`).

---

## 5. Cara Penggunaan Aplikasi

### 5.1. Password Strength Checker

1.  Akses tab "Password Strength Checker".
2.  Ketikkan *password* Anda di kolom input.
3.  Lihat indikator kekuatan *password* (warna dan *progress bar*) dan saran di bawahnya.
4.  Perhatikan nilai hash SHA-256 dari *password* Anda yang ditampilkan sebagai simulasi penyimpanan hash.

### 5.2. File Hash Generator & Verifier

1.  Akses tab "File Hash Generator & Verifier".
2.  Klik tombol "Pilih File" dan pilih file dari komputer Anda.
3.  Pilih algoritma hash yang diinginkan dari *dropdown* ("MD5", "SHA-1", "SHA-256", atau "SHA-512").
4.  Klik tombol "Generate Hash". Hash file akan ditampilkan.
5.  Untuk verifikasi, tempelkan hash yang diharapkan (dari sumber lain yang terpercaya) ke dalam kolom "Hash yang Diharapkan".
6.  Klik "Verifikasi Hash" untuk melihat apakah hash cocok atau tidak.

---

## 6. Dokumentasi Teknis dan Desain

* **Struktur Folder:**
    * `public/`: Berisi `index.html` dan aset statis lainnya.
    * `src/`: Berisi kode sumber React:
        * `components/`: Folder untuk komponen UI modular (`Navbar.js`, `PasswordChecker.js`, `FileHasher.js`).
        * `App.js`: Komponen utama yang mengelola navigasi dan merender komponen fitur.
        * `index.js`: Titik masuk aplikasi React.
        * `App.css`, `index.css`, dll.: File styling CSS.
* **Pengelolaan State:** Aplikasi menggunakan React Hooks (`useState`, `useEffect`) untuk mengelola state lokal komponen, seperti *password* yang dimasukkan, file yang dipilih, hash yang dihasilkan, dan hasil verifikasi.
* **Perhitungan Hash:**
    * Menggunakan library `crypto-js` yang *robust* untuk semua perhitungan hash.
    * File dibaca sebagai `ArrayBuffer` oleh `FileReader` dan kemudian dikonversi menjadi `WordArray` agar kompatibel dengan `crypto-js`.
    * Perhitungan hash sepenuhnya dilakukan di sisi *client* (di *browser* pengguna).

---

## 7. Pembagian Tugas Individu 

[cite_start]Ini adalah bagian penting untuk penilaian individu. Harap isi dengan kontribusi nyata setiap anggota kelompok.

* **Hafiz Akmaldi Santosa (Ketua Tim & Arsitek Aplikasi)**
    * Mengkoordinasikan keseluruhan proyek dan memfasilitasi komunikasi tim.
    * Mendesain arsitektur aplikasi (struktur komponen, alur data).
    * Membuat *boilerplate* proyek React dan mengonfigurasi dependensi utama.
    * Melakukan *code review* dan memastikan konsistensi kode.
    * Bertanggung jawab atas integrasi akhir semua komponen.
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