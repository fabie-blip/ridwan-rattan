# Ridwan Rattan Craft Cirebon - Website Ekspor Furnitur Rotan

> **Projek Penilaian Sumatif Akhir Semester (PSAS) Kelas X PPLG**  
> **Mata Pelajaran:** Web Development  
> **Teknologi:** HTML5, CSS3, JavaScript (Vanilla JS), Bootstrap 5.3  
> **Target Hosting:** GitHub Pages (100% Client-Side Front-End, Tanpa Backend)

---

## 📌 Studi Kasus & Latar Belakang
Pak Ridwan adalah pemilik bengkel kerajinan dan bisnis ekspor rotan di sentra rotan Tegalwangi, Cirebon, Jawa Barat. Calon klien domestik dan internasional sering menanyakan hal-hal berulang:
1. Apakah produk tersedia (*ready stock*) atau harus diproduksi (*pre-order*)?
2. Apa saja pilihan varian (ukuran, finishing, atau motif anyaman)?
3. Berapa total harga pesanan dalam USD & Rupiah?
4. Berapa perkiraan biaya pengiriman (ongkir) ke negara tujuan?
5. Berapa lama barang sampai di pelabuhan tujuan calon klien?
6. Apa saja persyaratan legalitas ekspor, sertifikasi ISPM 15, dan proses pembayarannya?

Website ini dibangun sebagai **media publikasi resmi bisnis Pak Ridwan** sekaligus menyediakan **simulator pesanan & estimasi ekspor interaktif** yang menghitung harga, ongkir, serta estimasi tanggal barang tiba secara *real-time*.

---

## 🌟 Fitur Utama Website (Sesuai Soal PSAS)

| No | Fitur Wajib | Implementasi di Website |
|---|---|---|
| **1** | **Publikasi Bisnis** | Profil bengkel Tegalwangi Cirebon, sejarah sejak 2008, 4 pilar keunggulan bahan alami, sertifikasi SVLK/V-Legal, alamat, kontak, dan CTA. |
| **2** | **Ketersediaan Produk** | Status transparan di setiap produk (*Ready Stock*, *Stok Terbatas*, *Pre-Order 14-18 Hari*) lengkap dengan indikator badge warna. |
| **3** | **Varian Produk** | Dropdown dan pill varian interaktif (Finishing Natural Clear, Honey Glaze, Kubu Grey, Ukuran M/L/Set, dan Kain Sunbrella). |
| **4** | **Total Harga Otomatis** | Perhitungan JavaScript dinamis: `(Harga Dasar + Selisih Varian) × Kuantitas` dalam mata uang USD ($) dan Rupiah (Rp). |
| **5** | **Biaya Pengiriman (Ongkir)** | Dihitung berdasarkan rute pelabuhan ekspor (Singapura, Australia, Jepang, Eropa, USA, Domestik) dikali faktor metode kargo (Laut LCL, FCL Kontainer, Udara Express) dikali jumlah unit ditambah biaya fumigasi ISPM 15. |
| **6** | **Estimasi Waktu Tiba** | Menghitung waktu persiapan produksi + transit perjalanan pengiriman, menghasilkan rentang hari serta **perkiraan tanggal kalender tiba** secara dinamis. |
| **7** | **FAQ Interaktif** | Accordion Bootstrap berisi 7 jawaban komprehensif atas pertanyaan umum buyer (legalitas SVLK, MOQ kargo, kemasan 3 lapis, sistem pembayaran T/T & L/C). |
| **+** | **Generator Pesan WhatsApp** | Tombol CTA langsung membuat pesan WhatsApp rapi ke nomor Pak Ridwan berisi seluruh rincian simulasi yang dipilih. |

---

## 📁 Struktur File & Folder
Seluruh file diletakkan langsung di dalam root folder dengan nama berhuruf kecil dan tanda hubung (`-`), serta menggunakan **path relatif murni** sehingga aman saat diunggah ke GitHub Pages:

```text
ridwan-rattan/
├── index.html                  # File utama website (semantic HTML5 & Bootstrap 5)
├── README.md                   # Dokumentasi teknis & panduan live coding
├── .gitignore                  # Mengabaikan file sampah sistem OS
├── css/
│   └── style.css               # Desain kustom tema rotan Cirebon & responsivitas
├── js/
│   ├── data.js                 # Basis data statis (profil, produk, rute, tarif, FAQ)
│   └── app.js                  # Logika interaktif DOM & kalkulasi otomatis Vanilla JS
└── assets/
    └── images/
        ├── logo.svg            # Logo merek Ridwan Rattan Cirebon
        ├── hero-rattan.svg     # Ilustrasi hero furniture rotan
        ├── about-workshop.svg  # Ilustrasi bengkel pengrajin Tegalwangi
        ├── produk-kursi-santai.svg
        ├── produk-meja-tamu.svg
        ├── produk-lampu-gantung.svg
        ├── produk-keranjang-laundry.svg
        ├── produk-daybed-outdoor.svg
        └── produk-lemari-kabinet.svg
```

---

## 🧠 Ringkasan Logika JavaScript (Persiapan Live Coding 30%)

Saat sesi live coding di hadapan guru penguji, jelaskan bagian-bagian penting berikut:

### 1. Struktur Data (`js/data.js`)
- Data disimpan dalam satu objek global `RATTAN_DATA`.
- `products`: Berisi array objek produk dengan properti `basePriceUSD`, `stockStatus`, `dimensions`, dan array `variants` yang memiliki `priceAdjustmentUSD`.
- `destinations`: Berisi rute ekspor (Singapura, Eropa, USA, dll.) dengan `baseRateUSD` serta rentang waktu transit laut (`seaLeadDays`) dan udara (`airLeadDays`).
- `shippingMethods`: Berisi metode kirim (Laut LCL, FCL Kontainer, Udara) dengan pengali tarif `rateMultiplier` dan biaya dokumen fumigasi `flatDocumentationFeeUSD`.

### 2. Rumus Perhitungan Total Harga & Ongkir (`calculateExportOrder()` di `js/app.js`)
```javascript
// A. Harga Satuan Varian
const unitPriceUSD = product.basePriceUSD + (variant.priceAdjustmentUSD || 0);

// B. Subtotal Produk
const subtotalUSD = unitPriceUSD * quantity;

// C. Biaya Pengiriman (Ongkir)
const shippingRatePerUnitUSD = destination.baseRateUSD * method.rateMultiplier;
const totalShippingUSD = Math.round(shippingRatePerUnitUSD * quantity);

// D. Biaya Dokumen Ekspor & Fumigasi ISPM 15
const docFeeUSD = method.flatDocumentationFeeUSD;

// E. Total Keseluruhan (Grand Total)
const grandTotalUSD = subtotalUSD + totalShippingUSD + docFeeUSD;
const grandTotalIDR = grandTotalUSD * exchangeRate; // Konversi Rp
```

### 3. Rumus Estimasi Waktu Tiba
```javascript
// 1. Waktu Produksi / Pengepakan (Lead Time)
let prodLeadMin = product.stockStatus === 'ready' ? 2 : (product.stockStatus === 'limited' ? 3 : 14);
let prodLeadMax = product.stockStatus === 'ready' ? 4 : (product.stockStatus === 'limited' ? 6 : 18);

// 2. Waktu Perjalanan Transit (Transit Time)
let transitMin = method.type === 'air' ? destination.airLeadDaysMin : destination.seaLeadDaysMin;
let transitMax = method.type === 'air' ? destination.airLeadDaysMax : destination.seaLeadDaysMax;

// 3. Total Hari & Perkiraan Tanggal Tiba Kalender
let totalDaysMin = prodLeadMin + transitMin;
let totalDaysMax = prodLeadMax + transitMax;
```

---

## 🚀 Panduan Upload ke GitHub & Mengaktifkan GitHub Pages

### Cara 1: Menggunakan Terminal Git (Direkomendasikan)
1. Buka terminal di folder project ini:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit project PSAS web development ridwan rattan"
   ```
2. Buat repository baru di [GitHub](https://github.com/new) dengan nama misalnya: `ridwan-rattan-cirebon` (pilih opsi **Public**).
3. Hubungkan repositori lokal ke GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/USERNAME_ANDA/ridwan-rattan-cirebon.git
   git push -u origin main
   ```

### Cara 2: Upload Langsung Lewat Web Browser GitHub
1. Buat repository baru di [GitHub](https://github.com/new), beri nama `ridwan-rattan-cirebon` (pilih **Public**).
2. Di halaman repositori baru yang masih kosong, klik tombol **"uploading an existing file"**.
3. Tarik (*drag and drop*) seluruh isi folder project (`index.html`, `README.md`, `.gitignore`, folder `css`, folder `js`, dan folder `assets`).
4. Klik tombol **"Commit changes"**.

### Cara Mengaktifkan GitHub Pages:
1. Di repository GitHub Anda, buka tab **Settings** (ikon gerigi di atas).
2. Di menu sebelah kiri, klik menu **Pages** (di bawah bagian *Code and automation*).
3. Pada bagian **Build and deployment**:
   - **Source**: Pilih `Deploy from a branch`.
   - **Branch**: Pilih `main`, dan folder `/ (root)`.
4. Klik tombol **Save**.
5. Tunggu 1–2 menit, lalu refresh halaman Settings > Pages hingga muncul banner hijau bertuliskan:  
   `Your site is live at https://USERNAME_ANDA.github.io/ridwan-rattan-cirebon/`

---

## ✅ Checklist Verifikasi Bebas Error
- [x] File `index.html` berada di root direktori.
- [x] Semua link CSS, JS, dan gambar menggunakan path relatif murni tanpa awalan slash `/` atau path drive lokal `C:/...`.
- [x] Seluruh aset gambar SVG berukuran ringan dan tersimpan di dalam folder lokal `assets/images/`.
- [x] Tidak ada file backend/PHP atau database.
- [x] Seluruh fungsi perhitungan harga, varian, ongkir, dan waktu tiba berjalan dinamis via Vanilla JS.
- [x] Tidak ada error di Console Developer Tools browser (F12).
