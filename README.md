# JejakKarbon

JejakKarbon adalah aplikasi yang membantu pengguna menghitung jejak karbon mereka berdasarkan aktivitas sehari-hari. Aplikasi ini juga memiliki fitur gamifikasi untuk meningkatkan kesadaran dan partisipasi pengguna dalam mengurangi emisi karbon.

## Fitur Utama

1. **Login & Register** - Pengguna dapat mendaftar dan masuk ke dalam aplikasi.
2. **Kalkulator Jejak Karbon** - Menghitung emisi karbon berdasarkan aktivitas harian.
3. **Dashboard User** - Menampilkan ringkasan emisi karbon, dan statistik lainnya.
4. **Gamifikasi**
   - **Sistem Poin**: Pengguna mendapatkan poin dari aktivitas ramah lingkungan.
   - **Leaderboard**: Peringkat berdasarkan jumlah poin yang dikumpulkan.
   - **Quest**: Mengerjakan misi untuk mendapatkan point.
   - **Achievement**: Penghargaan untuk pencapaian tertentu.
5. **Community Post** - Pengguna dapat membuat post dan berinteraksi melalui postingan dan komentar.

## API Routes

### User Routes
| Method | Endpoint        | Deskripsi |
|--------|---------------|-----------|
| GET    | `/profile`    | Mengambil data profil pengguna |
| GET    | `/users`      | Mengambil daftar semua pengguna (Admin Only) |
| PUT    | `/profile`    | Memperbarui profil pengguna (dapat mengunggah foto profil) |
| DELETE | `/users`      | Menghapus pengguna |

### Leaderboard & Gamifikasi
| Method | Endpoint        | Deskripsi |
|--------|---------------|-----------|
| GET    | `/leaderboard` | Mengambil daftar leaderboard |
| GET    | `/missions`    | Mengambil daftar misi |
| POST   | `/missions/take` | Mengambil misi oleh pengguna |

### Kalkulator Jejak Karbon
| Method  | Endpoint                | Deskripsi |
|---------|------------------------|-----------|
| POST    | `/kalkulator`          | Menyimpan data emisi karbon pengguna |
| GET     | `/kalkulator/riwayat`  | Mengambil riwayat emisi karbon pengguna |
| DELETE  | `/kalkulator/:id`      | Menghapus data emisi karbon (Admin Only) |

### Community Post
| Method  | Endpoint                 | Deskripsi |
|---------|-------------------------|-----------|
| GET     | `/community`             | Mengambil semua post komunitas |
| GET     | `/community/:postId`     | Mengambil satu post berdasarkan ID |
| POST    | `/community`             | Membuat post baru |

### Komentar & Reply
| Method  | Endpoint                                       | Deskripsi |
|---------|-----------------------------------------------|-----------|
| GET     | `/community/:postId/comments`                | Mengambil semua komentar di post tertentu |
| POST    | `/community/:postId/comments`                | Membuat komentar baru |
| PUT     | `/community/:postId/comments/:commentId`     | Memperbarui komentar (hanya pemilik) |
| POST    | `/community/:postId/comments/:commentId/reply` | Membalas komentar tertentu |

### Like System (Community)
| Method  | Endpoint                           | Deskripsi |
|---------|-----------------------------------|-----------|
| GET     | `/community/:postId/like`        | Mengambil semua like pada post komunitas |
| POST    | `/community/:postId/like`        | Memberikan like pada post komunitas |
| DELETE  | `/community/:postId/like/:likeId` | Menghapus like dari post komunitas |

## Teknologi yang Digunakan
- **Frontend:** React.js + TailwindCSS
- **Backend:** Express.js + Sequelize
- **Database:** MySQL
- **Autentikasi:** JWT (JSON Web Token)
- **Visualisasi Data:** Chart.js

## Cara Menjalankan Aplikasi
1. Clone repositori ini:
   ```bash
   git clone https://github.com/JiePrass/SEFEST25WEBDEV_WellPlayed
   cd SEFEST25WEBDEV_WellPlayed
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Konfigurasi file `.env` dengan database dan JWT_SECRET.
4. Jalankan aplikasi backend:
   ```bash
   pnpm run dev
   ```
5. Jalankan frontend:
   ```bash
   cd frontend
   pnpm install
   pnpm run dev
   ```


