# Naiera Color System Documentation

## Overview

Sistem warna Naiera dikelola secara terpusat melalui file `app/globals.css`. Dengan mengedit variabel CSS di file ini, Anda dapat mengubah seluruh tema aplikasi dengan mudah.

## Struktur Warna

### 1. Brand Colors (Warna Utama)

| Variable            | Penggunaan                              | Light Mode  | Dark Mode    |
| ------------------- | --------------------------------------- | ----------- | ------------ |
| `--primary`         | Warna utama brand (tombol, link, aksen) | Emerald 600 | Teal lighter |
| `--primary-hover`   | Hover state                             | Emerald 700 | -            |
| `--primary-light`   | Background ringan                       | Emerald 100 | -            |
| `--primary-lighter` | Background sangat ringan                | Emerald 50  | -            |
| `--secondary`       | Warna pendukung                         | Slate 600   | -            |
| `--accent`          | Warna aksen/highlight                   | Teal 500    | -            |

### 2. Semantic Colors (Warna Semantik)

| Variable        | Penggunaan      | Contoh                           |
| --------------- | --------------- | -------------------------------- |
| `--success`     | Status berhasil | Badge "Aktif", notifikasi sukses |
| `--warning`     | Peringatan      | Badge "Menunggu", alert          |
| `--destructive` | Error/bahaya    | Tombol hapus, pesan error        |
| `--info`        | Informasional   | Tips, informasi umum             |

### 3. Neutral Colors (Warna Netral)

| Variable             | Penggunaan                 |
| -------------------- | -------------------------- |
| `--background`       | Background halaman         |
| `--foreground`       | Teks utama                 |
| `--muted`            | Background elemen sekunder |
| `--muted-foreground` | Teks sekunder              |
| `--border`           | Border elemen              |
| `--card`             | Background kartu           |

### 4. Category Colors (Warna Kategori)

Untuk halaman dengan kategori konten yang berbeda:

| Variable                | Kategori     |
| ----------------------- | ------------ |
| `--category-government` | Pemerintahan |
| `--category-health`     | Kesehatan    |
| `--category-education`  | Pendidikan   |
| `--category-finance`    | Keuangan     |
| `--category-tourism`    | Pariwisata   |
| `--category-social`     | Sosial       |

## Cara Penggunaan

### Di Tailwind CSS

```tsx
// Menggunakan warna primary
<button className="bg-primary text-primary-foreground hover:bg-primary-hover">
  Tombol
</button>

// Menggunakan warna semantic
<span className="bg-success-light text-success-foreground">
  Berhasil
</span>

// Menggunakan utility class
<button className="btn-primary">
  Tombol Primary
</button>
```

### Utility Classes yang Tersedia

| Class                  | Deskripsi                     |
| ---------------------- | ----------------------------- |
| `.btn-primary`         | Tombol dengan warna primary   |
| `.btn-secondary`       | Tombol dengan warna secondary |
| `.btn-accent`          | Tombol dengan warna accent    |
| `.badge-success`       | Badge sukses                  |
| `.badge-warning`       | Badge peringatan              |
| `.badge-error`         | Badge error                   |
| `.badge-info`          | Badge informasi               |
| `.card-interactive`    | Kartu dengan hover effect     |
| `.bg-hero-gradient`    | Gradient untuk hero section   |
| `.bg-primary-gradient` | Gradient primary ke accent    |

## Mengubah Tema

### Langkah 1: Buka file `app/globals.css`

### Langkah 2: Edit nilai warna di bagian `:root`

Contoh mengubah warna primary dari Hijau ke Biru:

```css
:root {
  /* Sebelum (Emerald/Green) */
  --primary: oklch(0.53 0.18 155);

  /* Sesudah (Blue) */
  --primary: oklch(0.54 0.2 250);
}
```

### Langkah 3: Save dan refresh browser

## Format Warna OKLCH

Sistem warna menggunakan format OKLCH untuk presisi dan konsistensi:

```
oklch(L C H)
L = Lightness (0-1) - Kecerahan
C = Chroma (0-0.4) - Saturasi/kejenuhan
H = Hue (0-360) - Warna dasar
```

### Referensi Hue:

| Hue     | Warna        |
| ------- | ------------ |
| 0-30    | Merah        |
| 30-60   | Oranye       |
| 60-90   | Kuning       |
| 90-150  | Hijau-Lime   |
| 150-180 | Cyan-Teal    |
| 180-210 | Cyan         |
| 210-270 | Biru         |
| 270-330 | Ungu-Magenta |
| 330-360 | Pink-Merah   |

## Contoh Tema

### Tema Biru (Government)

```css
:root {
  --primary: oklch(0.54 0.2 250);
  --primary-hover: oklch(0.47 0.2 250);
  --primary-light: oklch(0.93 0.07 250);
  --accent: oklch(0.6 0.18 220);
}
```

### Tema Ungu (Creative)

```css
:root {
  --primary: oklch(0.55 0.2 300);
  --primary-hover: oklch(0.48 0.2 300);
  --primary-light: oklch(0.93 0.07 300);
  --accent: oklch(0.6 0.18 320);
}
```

### Tema Oranye (Energetic)

```css
:root {
  --primary: oklch(0.65 0.2 50);
  --primary-hover: oklch(0.58 0.2 50);
  --primary-light: oklch(0.94 0.07 50);
  --accent: oklch(0.7 0.18 30);
}
```

## Migrasi dari Hardcoded Colors

Untuk migrasi dari warna hardcoded Tailwind ke sistem tema:

| Hardcoded          | Gunakan                 |
| ------------------ | ----------------------- |
| `bg-emerald-600`   | `bg-primary`            |
| `bg-emerald-100`   | `bg-primary-light`      |
| `text-emerald-600` | `text-primary`          |
| `bg-green-500`     | `bg-success`            |
| `bg-amber-500`     | `bg-warning`            |
| `bg-red-500`       | `bg-destructive`        |
| `bg-blue-500`      | `bg-info`               |
| `bg-slate-100`     | `bg-muted`              |
| `text-slate-500`   | `text-muted-foreground` |

## Best Practices

1. **Selalu gunakan variabel tema** daripada warna hardcoded
2. **Gunakan varian `light`** untuk background elemen
3. **Gunakan varian `foreground`** untuk teks di atas warna solid
4. **Test di dark mode** setelah mengubah warna
5. **Dokumentasikan perubahan** jika membuat tema baru
