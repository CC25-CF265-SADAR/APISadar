# SADAR API Website - Documentation

Dokumentasi ini ditujukan sebagai panduan setup dasar untuk API aplikasi website SADAR: Saring, Amankan, Deteksi, Anti-Rugi yang menggunakan Node.js dan Hapi Framework dalam membuat back-end yang terkonfigurasi dengan database MongoDB.

## Deskripsi
SADAR (Saring, Amankan, Deteksi, Anti-Rugi) API adalah sistem integrasi yang memungkinkan pemanggilan API untuk mengambil dan menyimpan data ke dalam database MongoDB. Data yang dikelola mencakup informasi pengguna, modul pembelajaran, kuis, leaderboard, serta progress pengguna. Semua data ini kemudian ditampilkan secara dinamis pada antarmuka website (front-end).
## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Endpoints API](#endpoints-api)
- [Environment Variables](#environment-variables)

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

## Endpoints API
### Progress User
Dokumentasi ini mencakup seluruh endpoint yang menangani penyimpanan, pengambilan, dan pembaruan status progres belajar pengguna, termasuk status kuis.
| Method | Endpoint                                         | Deskripsi                                                            |
| ------ | ------------------------------------------------ | -------------------------------------------------------------------- |
| POST   | `/progress`                                      | Menyimpan atau memperbarui progress pengguna untuk suatu modul       |
| GET    | `/progress`                                      | Mengambil seluruh progress pengguna (berdasarkan user dari JWT)      |
| GET    | `/progress/{userId}/{moduleId}/update-checkquiz` | Memperbarui nilai `checkQuiz` jika user sudah menjawab soal di modul |

- Save User Progress 
  - Method: **POST** 
  - Endpoint: **/progress** 
  - Headers:
    - Authorization: Bearer <token>
  - Request Body:
   ```shell
      {
        "moduleId": "string",
        "topicsProgress": [
          {
            "topicId": "string",
            "checkpoint": true
          }
        ],
        "checkQuiz": true
      }
   ```
  - Response Body:
  ```shell
   {
     "message": "Progress saved",
     "data": {
       "_id": "...",
       "userId": "...",
       "modulesProgress": [
         {
           "moduleId": "...",
           "topicsProgress": [...],
           "checkQuiz": true
         }
       ],
       ...
     }
   }

- Get User Progress
  - Method: **GET** 
  - Endpoint: **/progress** 
  - Headers:
    - Authorization: Bearer <token>
  - Response Body:
   ```shell
      {
        "data": {
          "_id": "...",
          "userId": "...",
          "modulesProgress": [...]
        }
      }
   ```
- Update Check Quiz Status
  - Method: **GET** 
  - Endpoint: **/progress/{userId}/{moduleId}/update-checkquiz** 
  - Response Body:
  ```shell
   {
     "message": "checkQuiz updated successfully"
   }

### Modules & Quiz 
Dokumentasi ini mencakup seluruh endpoint yang berkaitan dengan modul pembelajaran, konten, pertanyaan kuis, dan jawaban pengguna.
| Endpoint                          | Method | Auth | Description                        |
| --------------------------------- | ------ | ---- | ---------------------------------- |
| `/modules`                        | GET    | ❌    | Ambil semua modul                  |
| `/modules`                        | POST   | ❌    | Tambah modul baru                  |
| `/modules/{id}/details`           | GET    | ❌    | Ambil detail modul                 |
| `/modules/details`                | POST   | ❌    | Tambah detail modul                |
| `/content`                        | POST   | ❌    | Tambah konten                      |
| `/content/{id}`                   | GET    | ✅    | Ambil konten berdasarkan ID        |
| `/modules/{modId}/questions`      | GET    | ✅    | Ambil pertanyaan berdasarkan modul |
| `/modules/{modId}/questions`      | POST   | ❌    | Tambah pertanyaan ke modul         |
| `/modules/{modId}/questions/save` | POST   | ✅    | Simpan jawaban pengguna            |
| `/modules/{modId}/results`        | GET    | ✅    | Ambil hasil kuis berdasarkan user  |

- Tambah Modul 
  - Method: **POST** 
  - Endpoint: **/modules** 
  - Request Body:
   ```shell
   {
     "id": "modul-1",
     "title": "Pengenalan Node.js",
     "description": "Belajar dasar Node.js",
     "thumbnail": "thumbnail-url.jpg",
     "totalTopics": 5
   }
   ```
- Ambil Semua Modul
  - Method: **GET** 
  - Endpoint: **/progress/{userId}/{moduleId}/update-checkquiz** 
  - Response Body:
  ```shell
   [
     {
       "_id": "...",
       "id": "modul-1",
       "title": "...",
       "description": "...",
       ...
     }
   ]
- Tambah Detail Modul
  - Method: **POST** 
  - Endpoint: **/modules/details** 
  - Request Body:
   ```shell
   {
     "modId": "modul-1",
     "title": "Detail Modul Node.js",
     "topics": [
       {
         "topicId": "topic-1",
         "title": "Apa itu Node.js"
       }
     ]
   }
   ```
- Ambil Detail Modul
  - Method: **GET** 
  - Endpoint: **/modules/{id}/details** 
  - Response Body:
  ```shell
   {
     "modId": "modul-1",
     "title": "Detail Modul Node.js",
     "topics": [...]
   }
- Tambah Konten
  - Method: **POST** 
  - Endpoint: **/content** 
  - Request Body:
   ```shell
   {
     "id": "topic-1",
     "title": "Pengantar Node.js",
     "pages": ["Page 1", "Page 2"],
     "nextTopicId": "topic-2",
     "prevTopicId": null
   }
- Ambil Konten
  - Method: **GET** 
  - Endpoint: **/content/{id}**
  - Headers:
    - Authorization: Bearer <token>
  - Response Body:
  ```shell
   {
     "id": "topic-1",
     "title": "Pengantar Node.js",
     "pages": ["Page 1", "Page 2"],
     ...
   }
- Tambah Pertanyaan
  - Method: **POST** 
  - Endpoint: **/modules/{modId}/questions** 
  - Request Body:
   ```shell
   {
     "modId": "modul-1",
     "id": "q1",
     "type": "multiple-choice",
     "question": "Apa itu Node.js?",
     "options": ["Runtime", "Library", "Framework"],
     "answer": ["Runtime"],
     "multiple": false
   }
- Ambil Pertanyaan Berdasarkan Modul
  - Method: **GET** 
  - Endpoint: **/modules/{modId}/questions**
  - Headers:
    - Authorization: Bearer <token>
  - Response Body:
  ```shell
   {
     "modId": "modul-1",
     "questions": [...]
   }
- Simpan Jawaban
  - Method: **POST** 
  - Endpoint: **/modules/{modId}/questions/save**
  - Headers:
    - Authorization: Bearer <token>
  - Request Body:
   ```shell
   {
     "answers": [
       {
         "questionId": "q1",
         "userAnswer": ["Runtime"]
       }
     ],
     "score": 100,
     "totalQuestions": 1
   }
- Ambil Hasil Jawaban
  - Method: **GET** 
  - Endpoint: **/modules/{modId}/results**
  - Headers:
    - Authorization: Bearer <token>
  - Response Body:
  ```shell
    {
     "modId": "modul-1",
     "userId": "...",
     "answers": [...],
     "score": 100,
     "totalQuestions": 1
   }
  
### Leaderboard
Dokumentasi ini mencakup seluruh endpoint yang menyediakan fitur untuk mencatat dan mengambil data tautan phishing dan kata kunci spam berdasarkan jumlah kemunculannya.
| Method | Endpoint                | Deskripsi                   |
| ------ | ----------------------- | --------------------------- |
| POST   | `/leaderboard/phishing` | Simpan link phishing        |
| POST   | `/leaderboard/spam`     | Simpan kata kunci spam      |
| GET    | `/leaderboard/phishing` | Ambil top 5 link phishing   |
| GET    | `/leaderboard/spam`     | Ambil top 5 kata kunci spam |

- Simpan Link Phishing
  - Method: **POST** 
  - Endpoint: **/leaderboard/phishing**
  - Request Body:
   ```shell
   {
     "url": "http://malicious-site.com"
   }
   ```
  - Response Body:
   ```shell
   {
     "message": "Link saved"
   }
- Simpan Kata Kunci Spam
  - Method: **POST** 
  - Endpoint: **/leaderboard/spam**
  - Request Body:
   ```shell
   {
     "keywords": ["free money", "work from home"]
   }
   ```
  - Response Body:
   ```shell
   {
     "message": "Keywords saved"
   }
- Ambil Top 5 Link Phishing
  - Method: **GET** 
  - Endpoint: **/leaderboard/phishing**
  - Query Param (opsional): monthOnly = true → hanya data bulan ini
     ```shell
    /leaderboard/phishing?monthOnly=true
  - Response Body:
  ```shell
   [
     {
       "_id": "123",
       "url": "http://malicious-site.com",
       "count": 12,
       "createdAt": "2024-06-01T12:00:00Z"
     }
   ]
- Ambil Top 5 Kata Kunci Spam
  - Method: **GET** 
  - Endpoint: **/leaderboard/spam**
  - Query Param (opsional): monthOnly = true → hanya data bulan ini
     ```shell
    /leaderboard/spam?monthOnly=true
  - Response Body:
  ```shell
   [
     {
       "_id": "abc",
       "keyword": "free money",
       "count": 25,
       "createdAt": "2024-06-02T15:00:00Z"
     }
   ]

### User Authentication
Dokumentasi ini mencakup seluruh endpoint yang menyediakan fitur autentikasi pengguna menggunakan login email/password dan login melalui Google OAuth. Fitur pemulihan akun juga disediakan seperti lupa password dan reset password.
| Method | Endpoint           | Deskripsi                            |
| ------ | ------------------ | ------------------------------------ |
| POST   | `/register`        | Registrasi akun baru                 |
| POST   | `/login`           | Login dengan email dan password      |
| POST   | `/forgot-password` | Kirim email reset password           |
| POST   | `/reset-password`  | Reset password menggunakan token     |
| POST   | `/auth/google`     | Login/daftar menggunakan akun Google |

- Register
  - Method: **POST** 
  - Endpoint: **/register**
  - Request Body:
   ```shell
   {
     "email": "user@example.com",
     "password": "secret123"
   }
   ```
  - Response Body Berhasil:
   ```shell
   {
     "message": "User registered successfully"
   }
  - Response Body Email Terdaftar:
   ```shell
   {
     "message": "Email already exists"
   }
- Login
  - Method: **POST** 
  - Endpoint: **/login**
  - Request Body:
   ```shell
   {
     "email": "user@example.com",
     "password": "secret123"
   }
   ```
  - Response Body Berhasil:
   ```shell
   {
     "token": "<JWT_TOKEN>"
   }
  - Response Body Email/Password Salah:
   ```shell
   {
     "message": "Invalid credentials"
   }
- Forgot Password
  - Method: **POST** 
  - Endpoint: **/forgot-password**
  - Request Body:
   ```shell
   {
     "email": "user@example.com"
   }
   ```
  - Response Body Berhasil:
   ```shell
   {
     "message": "Email reset password telah dikirim."
   }
  - Response Body Email Tidak Ditemukan:
   ```shell
   {
     "message": "Pastikan email Anda telah terdaftar"
   }
 - 📧 Email yang dikirim akan berisi tautan seperti:
   *https:{BASE_URL}#/reset-password?token=...*
- Reset Password
  - Method: **POST** 
  - Endpoint: **/reset-password**
  - Request Body:
   ```shell
   {
     "token": "<JWT_RESET_TOKEN>",
     "newPassword": "newSecret123"
   }
   ```
  - Response Body Berhasil:
   ```shell
   {
     "message": "Password berhasil diperbarui."
   }
  - Response Body Token Tidak Valid/Kadaluarsa:
   ```shell
   {
     "message": "Token tidak valid atau kadaluarsa."
   }
- Google OAuth
  - Method: **POST** 
  - Endpoint: **/auth/google**
  - Request Body:
   ```shell
   {
     "id_token": "<GOOGLE_ID_TOKEN>"
   }
   ```
  - Response Body Berhasil:
   ```shell
   {
     "token": "<JWT_TOKEN>"
   }
  - Response Body Token Tidak Valid/Kadaluarsa:
   ```shell
   {
     "message": "Google authentication failed"
   }
📌 Catatan:
- CORS hanya diizinkan dari localhost atau url deployment
- Pengguna Google baru akan otomatis dibuat jika belum ada

## Environment Variables
Pastikan variabel berikut diatur di .env:
- JWT_SECRET=your_jwt_secret
- GOOGLE_CLIENT_ID=your_google_client_id
- GOOGLE_CLIENT_SECRET=your_google_client_secret
- MJ_APIKEY_PUBLIC=your_mailjet_public_key
- MJ_APIKEY_PRIVATE=your_mailjet_private_key
- CLIENT_BASE_URL=your_url_website
- MONGO_URI=your_mongodb_config
