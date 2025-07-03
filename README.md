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

### 3.1 penjelasan logika cara kerja MD5, SHA-1, SHA-256, dan SHA-512 :

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

#### 5.1.1 Logika Penilaian 
```const analyzePasswordStrength = (pwd) => {
  let score = 0;
  let feedback = [];

  // Kriteria dan Penambahan Skor
  if (pwd.length >= 8) { score += 1; } else { feedback.push('Panjang minimal 8 karakter.'); }
  if (/[A-Z]/.test(pwd)) { score += 1; } else { feedback.push('Tambahkan huruf kapital.'); }
  if (/[a-z]/.test(pwd)) { score += 1; } else { feedback.push('Tambahkan huruf kecil.'); }
  if (/[0-9]/.test(pwd)) { score += 1; } else { feedback.push('Tambahkan angka.'); }
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) { score += 1; } else { feedback.push('Tambahkan karakter khusus (!@#$%...).'); }

  // Penentuan Overall Feedback dan Warna
  let color = 'red';
  let overallFeedback = 'Sangat Lemah';
  if (score >= 4) {
    color = 'green';
    overallFeedback = 'Sangat Kuat';
  } else if (score >= 3) {
    color = 'orange';
    overallFeedback = 'Cukup Kuat';
  } else if (score >= 2) {
    color = 'yellow';
    overallFeedback = 'Lemah';
  }

  // Memperbarui State Strength
  setStrength({
    score: score,
    feedback: feedback.length > 0 ? feedback.join(' ') : 'Password Anda sangat kuat!',
    overall: overallFeedback,
    color: color
  });
};
```
* Fungsi ini bertanggung jawab untuk mengevaluasi kekuatan password.

* Ini menginisialisasi score menjadi 0 dan feedback array kosong.

* Kemudian, ia memeriksa password terhadap 5 kriteria menggunakan regex (regular expressions):

* Panjang minimal 8 karakter.

* Mengandung huruf kapital.

* Mengandung huruf kecil.

* Mengandung angka(123...).

* Mengandung karakter khusus(!@#...).

*  Untuk setiap kriteria yang terpenuhi, **score ditingkatkan 1**. Jika tidak terpenuhi, pesan saran ditambahkan ke array feedback.

Penentuan Kekuatan Keseluruhan: Berdasarkan score total (maksimal 5):

1. Skor 4-5: "Sangat Kuat" (hijau)

2. Skor 3: "Cukup Kuat" (oranye)

3. Skor 2: "Lemah" (kuning)

4. Skor 0-1: "Sangat Lemah" (merah)

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

1.  Akses tab "File Hash Generator & Verifier".
2.  Klik tombol "Pilih File" dan pilih file dari komputer Anda.
3.  Pilih algoritma hash yang diinginkan dari *dropdown* ("MD5", "SHA-1", "SHA-256", atau "SHA-512").
4.  Klik tombol "Generate Hash". Hash file akan ditampilkan.
5.  Untuk verifikasi, tempelkan hash yang diharapkan (dari sumber lain yang terpercaya) ke dalam kolom "Hash yang Diharapkan".
6.  Klik "Verifikasi Hash" untuk melihat apakah hash cocok atau tidak.

#### Cara penggunaan 

1. Akses tab "File Hash Generator & Verifier"
![halamanview](dokumentasi/File%20Hash%20Generator%20&%20Verifier/tampilan%20web.png)


2. Klik tombol "Pilih File" dan pilih file dari komputer Anda 
 ![pilihfile](dokumentasi/File%20Hash%20Generator%20&%20Verifier/pilih-file.png)


 3. Pilih algoritma hash yang diinginkan

 ![pilihalgoritma](dokumentasi/File%20Hash%20Generator%20&%20Verifier/pilih-algo.png)

 4. Klik tombol "Generate Hash". Hash file akan ditampilkan.

 ![generatehash](dokumentasi/File%20Hash%20Generator%20&%20Verifier/generate-hash.png)

 5. hasil dari hash yang di generate

 ![hasilhash](dokumentasi/File%20Hash%20Generator%20&%20Verifier/hasil-hash.png)
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