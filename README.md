# Keio Notes – Aplikasi Catatan Berbasis Web

Keio Notes adalah aplikasi catatan berbasis web yang dibangun menggunakan **Next.js (App Router)**.  
Aplikasi ini berfokus pada pengalaman pengguna yang sederhana dan estetis untuk menulis catatan serta mengelola aktivitas to-do harian. Seluruh data disimpan menggunakan **localStorage** tanpa backend atau database.

## Tech Stack

- Framework: Next.js (App Router)
- Library: React
- Bahasa: TypeScript
- Styling: Tailwind CSS
- Icons: Lucide React
- Storage: Web Storage API (localStorage)

## Menjalankan proyek

Pastikan **Node.js** sudah terpasang di perangkat.

1. **Clone repository**
```bash
git clone https://github.com/auxiliaz/keio-notes-app.git
cd keio-notes-app 
```
2. **Install dependencies**
```bash
npm install
```
3. **Jalankan development server**
```bash
npm run dev
```
2. **Akses aplikasi**
```bash
http://localhost:3000
```

## Fitur utama

- Landing page sebagai halaman awal aplikasi.
- Sistem autentikasi (login & register) berbasis localStorage.
- Manajemen catatan (create, read, update, delete).
- Detail catatan dengan mode edit.
- Tag pada catatan untuk pengelompokan.
- Upload gambar ke dalam catatan (disimpan di localStorage).
- Halaman to-do untuk mengelola daftar tugas.
- Logout untuk menghapus data autentikasi.
- Desain minimalis dan responsif.

## Alur kerja aplikasi

1. **Landing Page**
   - Pengguna pertama kali masuk ke landing page.
   - Halaman ini berfungsi sebagai pengantar sebelum autentikasi.

2. **Autentikasi Pengguna**
   - Pengguna dapat melakukan register dan login.
   - Data akun disimpan di localStorage.
   - Autentikasi bersifat simulasi (client-side only), tanpa backend.

3. **Dashboard / Notes Page**
   - Setelah login, pengguna diarahkan ke halaman catatan.
   - Pengguna dapat:
     1. Membuat catatan baru
     2. Melihat daftar catatan
     3. Mengedit judul dan isi catatan
     4. Menambahkan dan menghapus tag
     5. Mengunggah gambar
     6. Menghapus catatan
   - Semua perubahan langsung disinkronkan ke localStorage.

4. **Note Detail Page**
   - Menampilkan isi catatan secara lengkap.
   - Mode edit tersedia untuk memperbarui data catatan.
   - Penghapusan catatan dilakukan dari halaman ini.
   - Data diperbarui langsung ke localStorage.

5. **To-Do Page**
   - Menampilkan satu aktivitas yang didefinisikan secara statis di dalam kode.
   - Di dalam aktivitas tersebut, pengguna dapat:
     1. Menambahkan item to-do
     2. Menandai to-do sebagai selesai
     3. Menghapus item to-do
   - Data to-do juga disimpan di localStorage.

6. **Logout**
   - Menghapus data autentikasi dari localStorage.
   - Pengguna diarahkan kembali ke halaman register / landing page.

## Manajemen Data

- Seluruh data (user, notes, tags, images, to-do items) disimpan menggunakan localStorage.
- Tidak menggunakan backend maupun database.
- Data hanya tersedia pada browser dan perangkat yang sama.

## Struktur penting

- `app/` – Menggunakan App Router Next.js.
- `app/(auth)/` – Halaman login dan register.
- `app/notes/` – Halaman daftar catatan.
- `app/notes/[id]/` – Halaman detail catatan.
- `app/todo/` – Halaman manajemen to-do.
- `components/` – Komponen UI reusable.
- `lib/` – Helper dan utilitas localStorage.

## Keterbatasan Aplikasi

- Tidak menggunakan backend atau database.
- Autentikasi hanya simulasi dan tidak aman untuk produksi.
- Aktivitas to-do masih statis dan didefinisikan di dalam kode.
- Data bergantung pada browser (akan hilang jika localStorage dibersihkan).

## Pengembangan lanjutan

Beberapa pengembangan yang dapat dilakukan ke depannya:

1. Menambahkan backend dan database.
2. Autentikasi server-side.
3. Multi-activity untuk to-do.
4. Sinkronisasi data antar perangkat.
5. Fitur pencarian dan filter catatan.
