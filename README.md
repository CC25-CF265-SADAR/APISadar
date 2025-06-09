# SADAR API Website - Documentation

Dokumentasi ini ditujukan sebagai panduan setup dasar untuk API aplikasi website SADAR: Saring, Amankan, Deteksi, Anti-Rugi yang menggunakan Node.js dan Hapi Framework dalam membuat back-end yang terkonfigurasi dengan database MongoDB.

## Deskripsi
SADAR (Saring, Amankan, Deteksi, Anti-Rugi) API adalah sistem integrasi yang memungkinkan pemanggilan API untuk mengambil dan menyimpan data ke dalam database MongoDB. Data yang dikelola mencakup informasi pengguna, modul pembelajaran, kuis, leaderboard, serta progress pengguna. Semua data ini kemudian ditampilkan secara dinamis pada antarmuka website (front-end).
## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (disarankan versi 12 atau lebih tinggi)
- [npm](https://www.npmjs.com/) (Node package manager)

### Installation

1. Download starter project [di sini](https://github.com/CC25-CF265-SADAR/APISadar/archive/refs/heads/main.zip).
2. Lakukan unzip file.
3. Pasang seluruh dependencies dengan perintah berikut.
   ```shell
   npm install
   ```

## Scripts

  Script ini menjalankan server dalam mode production menggunakan konfigurasi `server.js` dan berjalan pada Node.js dan framework **Hapi** .

- Start Development Server:

  ```shell
  npm run start
  ```

  Script ini menjalankan server dengan fitur live reload menggunakan library nodemon.

- Developmnet Live Reload:
  ```shell
  npm run start-dev
  ```

## Project Structure

Proyek starter ini dirancang agar kode tetap modular dan terorganisir.

```text
APISadar/
├── src/                    # Source project files
│   ├── handlers/           # Main logic for each API endpoint
│   ├── models/             # Schema definitions for MongoDB (using Mongoose)
│   ├── routes/             # Route definitions for the API
│   └── server.js           # Entry point of the Hapi server
├── .gitignore              # Files/folders ignored by Git (e.g., node_modules)
├── package-lock.json       # Project metadata and dependencies
└── package.json            # Project metadata and dependencies

```
