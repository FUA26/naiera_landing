# Struktur Data Layanan

## Deskripsi
Dokumentasi ini menjelaskan struktur data layanan yang diambil dari direktori.

## Struktur Direktori

```
data/services/
├── categories.json          # Daftar semua kategori layanan
├── population.json          # Layanan kategori Kependudukan
├── health.json              # Layanan kategori Kesehatan
├── education.json           # Layanan kategori Pendidikan
├── economy.json             # Layanan kategori Ekonomi
├── manpower.json            # Layanan kategori Ketenagakerjaan
├── tourism.json             # Layanan kategori Pariwisata
├── infrastructure.json      # Layanan kategori Infrastruktur
├── social.json              # Layanan kategori Sosial
├── environment.json         # Layanan kategori Lingkungan
├── government.json          # Layanan kategori Pemerintahan
├── ppid.json                # Layanan kategori PPID
├── disaster.json            # Layanan kategori Kebencanaan
└── multisector.json         # Layanan kategori Multisektor
```

## Format Data

### Category (categories.json)

```json
{
  "id": "population",           // ID unik kategori
  "name": "Kependudukan",        // Nama kategori (Indonesia)
  "icon": "Users",               // Nama icon dari lucide-react
  "color": "primary",            // Warna tema
  "bgColor": "bg-primary-lighter", // Background color class
  "slug": "population"           // URL-friendly ID
}
```

### Service (category-name.json)

```json
{
  "slug": "e-ktp",               // ID unik layanan (untuk URL)
  "icon": "IdCard",              // Nama icon dari lucide-react
  "name": "E-KTP",               // Nama layanan
  "description": "Deskripsi singkat layanan",
  "categoryId": "population",    // ID kategori yang terkait
  "badge": "Populer",            // Opsional: Badge status (Populer/Baru/Penting)
  "stats": "5.2k"                // Opsional: Statistik penggunaan
}
```

## Cara Menambah Layanan Baru

### 1. Menambah Layanan ke Kategori yang Sudah Ada

Edit file JSON kategori yang sesuai, misalnya untuk menambah layanan kesehatan:

```json
// data/services/health.json
[
  {
    "slug": "layanan-baru",
    "icon": "Stethoscope",
    "name": "Layanan Baru",
    "description": "Deskripsi layanan baru",
    "categoryId": "health",
    "stats": "1.2k"
  }
]
```

### 2. Menambah Kategori Baru

1. Tambahkan kategori ke `categories.json`:

```json
{
  "id": "new-category",
  "name": "Kategori Baru",
  "icon": "IconName",
  "color": "blue",
  "bgColor": "bg-blue-50",
  "slug": "new-category"
}
```

2. Buat file JSON baru untuk layanan kategori tersebut:

```bash
# data/services/new-category.json
[
  {
    "slug": "service-1",
    "icon": "IconName",
    "name": "Nama Layanan",
    "description": "Deskripsi layanan",
    "categoryId": "new-category",
    "stats": "500"
  }
]
```

## Icon Mapping

Icon menggunakan library [lucide-react](https://lucide.dev/icons/).

Contoh nama icon yang valid:
- `Users`, `HeartPulse`, `GraduationCap`, `Briefcase`
- `IdCard`, `FileText`, `FileCheck`, `Building`
- `MapPin`, `ShieldAlert`, `Search`, dll.

Untuk mencari icon lain, kunjungi: https://lucide.dev/icons/

## Fungsi Data Fetching

### lib/services-data.ts

```typescript
// Ambil semua kategori
getServiceCategories(): Promise<ServiceCategory[]>

// Ambil layanan per kategori
getServicesByCategory(categoryId: string): Promise<Service[]>

// Ambil semua layanan dengan info kategori
getAllServices(): Promise<ServiceWithCategory[]>

// Ambil kategori dengan layanan
getServicesGroupedByCategory(): Promise<ServiceCategory[]>

// Ambil satu layanan berdasarkan slug
getServiceBySlug(slug: string): Promise<ServiceWithCategory | null>

// Ambil kategori berdasarkan slug
getCategoryBySlug(slug: string): Promise<ServiceCategory | null>
```

## Penggunaan di Komponen

### Server Component (app/layanan/page.tsx)

```typescript
import { getServiceCategories, getAllServices } from '@/lib/services-data';

export default async function LayananPage() {
  const categories = await getServiceCategories();
  const services = await getAllServices();

  return <LayananPageClient categories={categories} services={services} />;
}
```

### Halaman Root (app/page.tsx)

```typescript
import { ServicesSection } from '@/components/sections/services-section-server';

export default function Page() {
  return (
    <div>
      <ServicesSection />
    </div>
  );
}
```

## Catatan Penting

1. **ID Unik**: Pastikan `slug` untuk layanan dan `id`/`slug` untuk kategori bersifat unik
2. **categoryId**: Harus cocok dengan `id` kategori di `categories.json`
3. **Icon**: Gunakan nama icon yang valid dari lucide-react
4. **Color**: Gunakan nama warna Tailwind yang valid (primary, blue, red, green, dll.)
5. **Background**: Gunakan class Tailwind untuk background (bg-blue-50, bg-red-50, dll.)

## Troubleshooting

### Jika layanan tidak muncul:
1. Periksa apakah `categoryId` cocok dengan kategori di `categories.json`
2. Pastikan file JSON valid (bisa dicek dengan JSON validator)
3. Pastikan slug bersifat unik

### Jika icon tidak muncul:
1. Periksa nama icon di https://lucide.dev/icons/
2. Pastikan nama icon ditulis dengan PascalCase (huruf kapital di awal)

### Jika warna tidak sesuai:
1. Periksa apakah class Tailwind yang digunakan valid
2. Pastikan warna telah didefinisikan di konfigurasi Tailwind
