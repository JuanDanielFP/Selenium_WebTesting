# Selenium_WebTesting

Selenium Webdriver testing menggunakan Mocha dengan Mochawesome reports.

## 📋 Prasyarat

Sebelum memulai, pastikan Anda sudah menginstall:
- **Node.js** (versi 14 atau lebih tinggi) - Download dari [nodejs.org](https://nodejs.org)
- **npm** (biasanya sudah termasuk dengan Node.js)

## 🚀 Setup untuk Pengguna Baru

### 1. Clone Repository
```bash
git clone <repository-url>
cd Selenium_WebTesting
```

### 2. Install Dependencies
Jalankan perintah berikut untuk menginstall semua dependencies yang diperlukan:
```bash
npm install
```

Perintah ini akan menginstall:
- `mocha` - Test framework
- `mochawesome` - Reporter untuk hasil test
- `selenium-webdriver` - Selenium WebDriver untuk testing

### 3. Verifikasi Instalasi
Pastikan semua dependencies sudah terinstall dengan benar:
```bash
npm list
```

## 📝 Menjalankan Test

Untuk menjalankan semua test, gunakan perintah:
```bash
npm run jalanin
```

Perintah ini akan:
- Menjalankan semua test file di folder `tests/` secara rekursif
- Menggunakan timeout 6000ms per test
- Menghasilkan laporan HTML dengan Mochawesome reporter

### Hasil Report
Setelah test selesai, laporan HTML akan dibuat di folder `mochawesome-report/`

## 📂 Struktur Project

```
Selenium_WebTesting/
├── package.json              # Konfigurasi project dan dependencies
├── README.md                 # File ini
└── tests/
    └── test-sauce.js         # File test example
```

## 🛠 Troubleshooting

### Error: "Cannot find module 'mochawesome'"
**Solusi:** Pastikan sudah menjalankan `npm install` terlebih dahulu.

### Error: Timeout pada test
Jika test membutuhkan waktu lebih lama, Anda bisa menambah timeout dengan mengedit `package.json`:
```json
"jalanin": "mocha tests --recursive --timeout 10000 --reporter mochawesome"
```

## 📚 Dokumentasi Tambahan

- [Mocha Documentation](https://mochajs.org/)
- [Selenium WebDriver Documentation](https://www.selenium.dev/documentation/webdriver/)
- [Mochawesome Reporter](https://github.com/adamgruber/mochawesome)

