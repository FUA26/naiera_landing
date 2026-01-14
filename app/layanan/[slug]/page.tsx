import { notFound } from "next/navigation";
import {
  CreditCard,
  FileCheck,
  FileText,
  GraduationCap,
  HeartPulse,
  IdCard,
  MessageCircle,
  Bus,
  Home,
  Building2,
  Users,
  ArrowRight,
  TreePine,
  MapPin,
  ShieldAlert,
  Award,
  Factory,
  Heart,
  Sprout,
  FileSearch,
  Building,
  Cloud,
  CheckCircle2,
  Clock,
  FileDown,
  AlertCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ServiceDetail {
  slug: string;
  icon: LucideIcon;
  name: string;
  description: string;
  category: string;
  badge?: string;
  stats?: string;
  requirements: string[];
  process: string[];
  duration: string;
  cost: string;
  downloadForms?: string[];
  relatedServices?: string[];
}

// Service data dengan slug
const servicesData: ServiceDetail[] = [
  // Kependudukan
  {
    slug: "e-ktp",
    icon: IdCard,
    name: "E-KTP",
    description:
      "Layanan pembuatan dan perpanjangan Kartu Tanda Penduduk Elektronik",
    category: "population",
    badge: "Populer",
    stats: "5.2k",
    requirements: [
      "Fotokopi Kartu Keluarga",
      "Surat Pengantar RT/RW",
      "Pas foto 4x6 (2 lembar)",
      "Fotokopi Akta Kelahiran",
    ],
    process: [
      "Datang ke kantor kecamatan dengan membawa persyaratan",
      "Mengisi formulir permohonan",
      "Foto dan rekam sidik jari",
      "Menunggu proses verifikasi (1-3 hari kerja)",
      "Pengambilan E-KTP",
    ],
    duration: "3-7 hari kerja",
    cost: "Gratis",
    downloadForms: ["Formulir Permohonan E-KTP"],
    relatedServices: ["kk", "akta-kelahiran"],
  },
  {
    slug: "kk",
    icon: FileText,
    name: "Kartu Keluarga",
    description: "Layanan pembuatan dan perubahan Kartu Keluarga",
    category: "population",
    stats: "3.8k",
    requirements: [
      "Surat Pengantar RT/RW",
      "Fotokopi E-KTP Kepala Keluarga",
      "Fotokopi Akta Nikah/Cerai (jika ada perubahan)",
      "Fotokopi KK lama (untuk perubahan)",
    ],
    process: [
      "Mengajukan permohonan di kantor kecamatan",
      "Menyerahkan persyaratan lengkap",
      "Verifikasi data oleh petugas",
      "Penerbitan KK baru",
      "Pengambilan KK",
    ],
    duration: "1-3 hari kerja",
    cost: "Gratis",
    downloadForms: ["Formulir Permohonan KK"],
    relatedServices: ["e-ktp", "akta-kelahiran"],
  },
  {
    slug: "akta-kelahiran",
    icon: FileCheck,
    name: "Akta Kelahiran",
    description:
      "Layanan pembuatan Akta Kelahiran untuk bayi baru lahir atau terlambat",
    category: "population",
    stats: "2.1k",
    requirements: [
      "Surat Keterangan Lahir dari Rumah Sakit/Bidan",
      "Fotokopi KK Orang Tua",
      "Fotokopi E-KTP Orang Tua",
      "Fotokopi Akta Nikah Orang Tua",
      "Surat Pengantar RT/RW (untuk kelahiran terlambat)",
    ],
    process: [
      "Mengajukan permohonan di Dinas Kependudukan",
      "Menyerahkan persyaratan lengkap",
      "Verifikasi data",
      "Penerbitan Akta Kelahiran",
      "Pengambilan dokumen",
    ],
    duration: "1-7 hari kerja",
    cost: "Gratis (tepat waktu), Rp 50.000 (terlambat)",
    downloadForms: ["Formulir Permohonan Akta Kelahiran"],
    relatedServices: ["e-ktp", "kk"],
  },
  {
    slug: "pindah-domisili",
    icon: Home,
    name: "Surat Pindah Domisili",
    description: "Layanan pengurusan surat pindah domisili antar wilayah",
    category: "population",
    stats: "890",
    requirements: [
      "Fotokopi KK",
      "Fotokopi E-KTP seluruh anggota keluarga yang pindah",
      "Surat Pengantar RT/RW",
      "Surat Keterangan Pindah dari kelurahan asal",
    ],
    process: [
      "Mengurus surat pengantar dari RT/RW",
      "Mengajukan di kelurahan asal",
      "Mendapat Surat Keterangan Pindah",
      "Lapor ke kelurahan tujuan",
      "Update data kependudukan",
    ],
    duration: "3-5 hari kerja",
    cost: "Gratis",
    downloadForms: ["Formulir Pindah Domisili"],
    relatedServices: ["e-ktp", "kk"],
  },

  // Kesehatan
  {
    slug: "bpjs-kesehatan",
    icon: Heart,
    name: "BPJS Kesehatan",
    description: "Layanan pendaftaran dan informasi BPJS Kesehatan",
    category: "health",
    badge: "Populer",
    stats: "8.5k",
    requirements: [
      "Fotokopi KK",
      "Fotokopi E-KTP",
      "Pas foto 3x4 (2 lembar)",
      "Email aktif",
    ],
    process: [
      "Registrasi online atau datang ke kantor BPJS",
      "Mengisi formulir pendaftaran",
      "Memilih kelas perawatan",
      "Pembayaran iuran pertama",
      "Aktivasi kartu BPJS",
    ],
    duration: "1-3 hari kerja",
    cost: "Mulai dari Rp 42.000/bulan",
    downloadForms: ["Formulir Pendaftaran BPJS"],
    relatedServices: ["puskesmas", "posyandu"],
  },
  {
    slug: "puskesmas",
    icon: Building2,
    name: "Layanan Puskesmas",
    description: "Informasi dan layanan kesehatan di Puskesmas terdekat",
    category: "health",
    stats: "4.2k",
    requirements: [
      "Kartu identitas (E-KTP/KK)",
      "Kartu BPJS (jika ada)",
      "Surat rujukan (untuk kasus tertentu)",
    ],
    process: [
      "Datang ke Puskesmas terdekat",
      "Pendaftaran di loket",
      "Pemeriksaan oleh tenaga medis",
      "Mendapat resep/tindakan medis",
      "Pengambilan obat di apotek Puskesmas",
    ],
    duration: "Langsung (sesuai antrian)",
    cost: "Gratis dengan BPJS, Rp 10.000-50.000 (umum)",
    relatedServices: ["bpjs-kesehatan", "posyandu"],
  },
  {
    slug: "posyandu",
    icon: Users,
    name: "Posyandu",
    description: "Layanan kesehatan ibu dan anak di Posyandu",
    category: "health",
    stats: "2.3k",
    requirements: [
      "Buku KIA (Kesehatan Ibu dan Anak)",
      "Kartu identitas ibu",
      "Kartu BPJS (jika ada)",
    ],
    process: [
      "Datang ke Posyandu sesuai jadwal",
      "Pendaftaran",
      "Penimbangan bayi/balita",
      "Imunisasi (sesuai jadwal)",
      "Konsultasi kesehatan",
    ],
    duration: "Sesuai jadwal Posyandu",
    cost: "Gratis",
    relatedServices: ["bpjs-kesehatan", "puskesmas"],
  },

  // Pendidikan
  {
    slug: "ppdb",
    icon: GraduationCap,
    name: "PPDB Online",
    description: "Penerimaan Peserta Didik Baru secara online",
    category: "education",
    badge: "Baru",
    stats: "3.7k",
    requirements: [
      "Ijazah/Surat Keterangan Lulus",
      "Fotokopi Akta Kelahiran",
      "Fotokopi KK",
      "Pas foto terbaru",
      "Surat Keterangan Tidak Mampu (jika ada)",
    ],
    process: [
      "Registrasi online di portal PPDB",
      "Mengisi data dan upload dokumen",
      "Memilih sekolah tujuan",
      "Menunggu hasil seleksi",
      "Daftar ulang jika diterima",
    ],
    duration: "Sesuai jadwal PPDB",
    cost: "Gratis",
    downloadForms: ["Panduan PPDB Online"],
    relatedServices: ["beasiswa", "surat-keterangan-sekolah"],
  },
  {
    slug: "beasiswa",
    icon: Award,
    name: "Beasiswa Pendidikan",
    description: "Informasi dan pendaftaran beasiswa pendidikan",
    category: "education",
    stats: "1.5k",
    requirements: [
      "Fotokopi rapor semester terakhir",
      "Surat Keterangan Tidak Mampu dari kelurahan",
      "Fotokopi KK",
      "Surat rekomendasi dari sekolah",
      "Fotokopi rekening listrik",
    ],
    process: [
      "Cek ketersediaan beasiswa",
      "Mengisi formulir pendaftaran",
      "Upload dokumen persyaratan",
      "Verifikasi data",
      "Pengumuman penerima beasiswa",
    ],
    duration: "1-2 bulan",
    cost: "Gratis",
    downloadForms: ["Formulir Beasiswa"],
    relatedServices: ["ppdb", "surat-keterangan-sekolah"],
  },
  {
    slug: "surat-keterangan-sekolah",
    icon: FileText,
    name: "Surat Keterangan Sekolah",
    description: "Pengurusan berbagai surat keterangan dari sekolah",
    category: "education",
    stats: "2.8k",
    requirements: [
      "Surat permohonan dari orang tua/wali",
      "Fotokopi rapor terakhir",
      "Fotokopi E-KTP orang tua",
      "Materai 10.000",
    ],
    process: [
      "Mengajukan permohonan ke sekolah",
      "Menyerahkan persyaratan",
      "Proses verifikasi",
      "Penerbitan surat keterangan",
      "Pengambilan dokumen",
    ],
    duration: "1-3 hari kerja",
    cost: "Gratis - Rp 10.000",
    relatedServices: ["ppdb", "beasiswa"],
  },

  // Ekonomi
  {
    slug: "izin-usaha",
    icon: FileCheck,
    name: "Izin Usaha (NIB)",
    description: "Pengurusan Nomor Induk Berusaha dan izin usaha",
    category: "economy",
    stats: "1.9k",
    requirements: [
      "Fotokopi E-KTP pemilik usaha",
      "Fotokopi NPWP",
      "Surat keterangan domisili usaha",
      "Pas foto 4x6",
      "Denah lokasi usaha",
    ],
    process: [
      "Registrasi di OSS (Online Single Submission)",
      "Mengisi data usaha",
      "Upload dokumen persyaratan",
      "Verifikasi data",
      "Penerbitan NIB",
    ],
    duration: "1-7 hari kerja",
    cost: "Gratis",
    downloadForms: ["Panduan OSS"],
    relatedServices: ["pajak-daerah", "modal-umkm"],
  },
  {
    slug: "pajak-daerah",
    icon: CreditCard,
    name: "Pajak Daerah",
    description: "Pembayaran dan informasi pajak daerah (PBB, dll)",
    category: "economy",
    badge: "Baru",
    stats: "4.5k",
    requirements: [
      "SPPT PBB",
      "Fotokopi E-KTP",
      "Bukti kepemilikan tanah/bangunan",
    ],
    process: [
      "Cek tagihan pajak online/offline",
      "Pembayaran melalui bank/online",
      "Mendapat bukti pembayaran",
      "Validasi pembayaran",
      "Simpan bukti pembayaran",
    ],
    duration: "Langsung",
    cost: "Sesuai tagihan",
    relatedServices: ["izin-usaha"],
  },
  {
    slug: "modal-umkm",
    icon: Factory,
    name: "Bantuan Modal UMKM",
    description: "Program bantuan modal untuk pelaku UMKM",
    category: "economy",
    stats: "680",
    requirements: [
      "Fotokopi E-KTP",
      "Fotokopi KK",
      "NIB/Izin Usaha",
      "Proposal usaha",
      "Surat keterangan usaha dari kelurahan",
    ],
    process: [
      "Mengajukan permohonan bantuan",
      "Menyerahkan proposal dan dokumen",
      "Survey lokasi usaha",
      "Verifikasi kelayakan",
      "Pencairan bantuan modal",
    ],
    duration: "1-3 bulan",
    cost: "Gratis",
    downloadForms: ["Template Proposal Usaha"],
    relatedServices: ["izin-usaha"],
  },

  // Ketenagakerjaan
  {
    slug: "kartu-kuning",
    icon: FileSearch,
    name: "Kartu Kuning (AK/I)",
    description: "Kartu pencari kerja untuk akses lowongan pekerjaan",
    category: "manpower",
    stats: "2.4k",
    requirements: [
      "Fotokopi E-KTP",
      "Fotokopi ijazah terakhir",
      "Pas foto 3x4 (2 lembar)",
      "Surat Pengantar RT/RW",
    ],
    process: [
      "Datang ke Dinas Tenaga Kerja",
      "Mengisi formulir pendaftaran",
      "Menyerahkan persyaratan",
      "Foto",
      "Pengambilan Kartu Kuning",
    ],
    duration: "1-3 hari kerja",
    cost: "Gratis",
    downloadForms: ["Formulir Kartu Kuning"],
    relatedServices: ["job-fair", "pelatihan-kerja"],
  },
  {
    slug: "job-fair",
    icon: Building,
    name: "Job Fair",
    description: "Informasi bursa kerja dan job fair",
    category: "manpower",
    badge: "Populer",
    stats: "1.8k",
    requirements: ["Kartu Kuning", "CV terbaru", "Fotokopi ijazah", "Pas foto"],
    process: [
      "Cek jadwal job fair",
      "Persiapkan dokumen",
      "Datang ke lokasi job fair",
      "Mengikuti seleksi perusahaan",
      "Follow up hasil seleksi",
    ],
    duration: "Sesuai jadwal event",
    cost: "Gratis",
    relatedServices: ["kartu-kuning", "pelatihan-kerja"],
  },
  {
    slug: "pelatihan-kerja",
    icon: Award,
    name: "Pelatihan Kerja",
    description: "Program pelatihan dan sertifikasi keahlian",
    category: "manpower",
    stats: "950",
    requirements: [
      "Fotokopi E-KTP",
      "Fotokopi ijazah terakhir",
      "Pas foto 3x4",
      "Surat keterangan sehat",
    ],
    process: [
      "Pendaftaran program pelatihan",
      "Seleksi peserta",
      "Mengikuti pelatihan",
      "Ujian sertifikasi",
      "Penerimaan sertifikat",
    ],
    duration: "1-6 bulan (tergantung program)",
    cost: "Gratis - Rp 500.000",
    downloadForms: ["Formulir Pendaftaran Pelatihan"],
    relatedServices: ["kartu-kuning", "job-fair"],
  },

  // Pariwisata
  {
    slug: "info-wisata",
    icon: MapPin,
    name: "Informasi Wisata",
    description: "Panduan destinasi wisata dan atraksi lokal",
    category: "tourism",
    stats: "15k",
    requirements: [],
    process: [
      "Akses portal wisata online",
      "Pilih destinasi wisata",
      "Cek informasi lengkap",
      "Booking tiket (jika diperlukan)",
      "Kunjungi destinasi",
    ],
    duration: "Langsung",
    cost: "Bervariasi per destinasi",
    relatedServices: ["izin-event"],
  },
  {
    slug: "izin-event",
    icon: Award,
    name: "Izin Event/Kegiatan",
    description: "Perizinan untuk event dan kegiatan publik",
    category: "tourism",
    stats: "120",
    requirements: [
      "Proposal kegiatan",
      "Fotokopi E-KTP penanggungjawab",
      "Surat rekomendasi RT/RW",
      "Denah lokasi kegiatan",
      "Surat pernyataan",
    ],
    process: [
      "Mengajukan permohonan izin",
      "Menyerahkan proposal dan dokumen",
      "Survey lokasi",
      "Koordinasi dengan pihak terkait",
      "Penerbitan izin",
    ],
    duration: "7-14 hari kerja",
    cost: "Gratis - Rp 500.000",
    downloadForms: ["Template Proposal Event"],
    relatedServices: ["info-wisata"],
  },

  // Infrastruktur
  {
    slug: "imb",
    icon: Building,
    name: "IMB (PBG)",
    description: "Izin Mendirikan Bangunan / Persetujuan Bangunan Gedung",
    category: "infrastructure",
    stats: "780",
    requirements: [
      "Fotokopi sertifikat tanah",
      "Fotokopi E-KTP pemilik",
      "Gambar rencana bangunan",
      "Surat pernyataan",
      "Fotokopi PBB tahun terakhir",
    ],
    process: [
      "Konsultasi rencana bangunan",
      "Mengajukan permohonan IMB",
      "Menyerahkan dokumen persyaratan",
      "Survey lokasi",
      "Penerbitan IMB",
    ],
    duration: "14-30 hari kerja",
    cost: "Rp 500.000 - Rp 5.000.000 (tergantung luas)",
    downloadForms: ["Formulir Permohonan IMB"],
    relatedServices: ["aduan-infrastruktur"],
  },
  {
    slug: "aduan-infrastruktur",
    icon: MessageCircle,
    name: "Aduan Infrastruktur",
    description: "Laporan kerusakan jalan, lampu, dan fasilitas umum",
    category: "infrastructure",
    badge: "Populer",
    stats: "1.2k",
    requirements: [
      "Foto lokasi kerusakan",
      "Deskripsi masalah",
      "Lokasi/alamat lengkap",
    ],
    process: [
      "Buat laporan aduan online/offline",
      "Upload foto dan deskripsi",
      "Verifikasi laporan",
      "Tindak lanjut oleh dinas terkait",
      "Update status perbaikan",
    ],
    duration: "3-30 hari (tergantung tingkat kerusakan)",
    cost: "Gratis",
    relatedServices: ["imb", "transportasi-umum"],
  },
  {
    slug: "transportasi-umum",
    icon: Bus,
    name: "Transportasi Umum",
    description: "Informasi rute dan jadwal transportasi umum",
    category: "infrastructure",
    stats: "5.6k",
    requirements: [],
    process: [
      "Akses aplikasi/website transportasi",
      "Cek rute dan jadwal",
      "Beli tiket/kartu",
      "Naik transportasi umum",
    ],
    duration: "Langsung",
    cost: "Rp 3.000 - Rp 15.000",
    relatedServices: ["aduan-infrastruktur"],
  },

  // Sosial
  {
    slug: "bansos",
    icon: Users,
    name: "Bantuan Sosial",
    description: "Program bantuan sosial untuk masyarakat kurang mampu",
    category: "social",
    stats: "3.5k",
    requirements: [
      "Fotokopi KK",
      "Fotokopi E-KTP",
      "Surat Keterangan Tidak Mampu",
      "Surat Pengantar RT/RW",
      "Foto rumah",
    ],
    process: [
      "Pendaftaran di kelurahan",
      "Verifikasi data",
      "Survey lapangan",
      "Penetapan penerima bantuan",
      "Penyaluran bantuan",
    ],
    duration: "1-3 bulan",
    cost: "Gratis",
    relatedServices: ["dtks"],
  },
  {
    slug: "dtks",
    icon: Home,
    name: "DTKS",
    description: "Data Terpadu Kesejahteraan Sosial",
    category: "social",
    stats: "2.8k",
    requirements: [
      "Fotokopi KK",
      "Fotokopi E-KTP seluruh anggota keluarga",
      "Surat Pengantar RT/RW",
    ],
    process: [
      "Pendaftaran di kelurahan",
      "Pengisian formulir DTKS",
      "Verifikasi data",
      "Survey rumah tangga",
      "Input data ke sistem",
    ],
    duration: "1-2 bulan",
    cost: "Gratis",
    relatedServices: ["bansos"],
  },

  // Lingkungan
  {
    slug: "bank-sampah",
    icon: Sprout,
    name: "Bank Sampah",
    description: "Program pengelolaan sampah dengan sistem tabungan",
    category: "environment",
    stats: "890",
    requirements: ["Fotokopi E-KTP", "Fotokopi KK", "Pas foto 3x4"],
    process: [
      "Daftar sebagai nasabah bank sampah",
      "Pilah sampah di rumah",
      "Setor sampah ke bank sampah",
      "Pencatatan berat dan jenis sampah",
      "Tabungan masuk ke rekening",
    ],
    duration: "Sesuai jadwal operasional",
    cost: "Gratis",
    relatedServices: ["aduan-lingkungan"],
  },
  {
    slug: "aduan-lingkungan",
    icon: MessageCircle,
    name: "Aduan Lingkungan",
    description: "Laporan masalah lingkungan dan kebersihan",
    category: "environment",
    stats: "450",
    requirements: [
      "Foto lokasi masalah",
      "Deskripsi masalah",
      "Lokasi/alamat lengkap",
    ],
    process: [
      "Buat laporan aduan",
      "Upload foto dan deskripsi",
      "Verifikasi laporan",
      "Tindak lanjut oleh dinas",
      "Update status penanganan",
    ],
    duration: "3-14 hari kerja",
    cost: "Gratis",
    relatedServices: ["bank-sampah"],
  },

  // Pemerintahan
  {
    slug: "surat-rt-rw",
    icon: FileText,
    name: "Surat RT/RW",
    description: "Pengurusan berbagai surat keterangan dari RT/RW",
    category: "government",
    stats: "4.2k",
    requirements: ["Fotokopi E-KTP", "Fotokopi KK", "Materai 10.000"],
    process: [
      "Datang ke RT/RW setempat",
      "Mengisi formulir permohonan",
      "Menyerahkan persyaratan",
      "Penerbitan surat",
      "Pengambilan surat",
    ],
    duration: "1-3 hari",
    cost: "Gratis - Rp 10.000",
    relatedServices: ["e-ktp", "kk"],
  },
  {
    slug: "dana-desa",
    icon: Building,
    name: "Transparansi Dana Desa",
    description: "Informasi penggunaan dan laporan dana desa",
    category: "government",
    stats: "120",
    requirements: [],
    process: [
      "Akses portal transparansi",
      "Pilih desa/kelurahan",
      "Lihat laporan keuangan",
      "Download dokumen (jika diperlukan)",
    ],
    duration: "Langsung",
    cost: "Gratis",
    relatedServices: ["surat-rt-rw"],
  },

  // PPID
  {
    slug: "ppid",
    icon: FileSearch,
    name: "Informasi Publik (PPID)",
    description: "Permohonan informasi publik sesuai UU KIP",
    category: "ppid",
    stats: "320",
    requirements: [
      "Fotokopi E-KTP",
      "Surat permohonan informasi",
      "Alasan permohonan",
    ],
    process: [
      "Mengajukan permohonan informasi",
      "Verifikasi permohonan",
      "Proses pengumpulan informasi",
      "Pemberitahuan ketersediaan informasi",
      "Penyerahan informasi",
    ],
    duration: "10-14 hari kerja",
    cost: "Gratis - Rp 50.000 (tergantung jenis)",
    downloadForms: ["Formulir Permohonan Informasi Publik"],
    relatedServices: ["dokumen-publik"],
  },
  {
    slug: "dokumen-publik",
    icon: FileText,
    name: "Dokumen Publik",
    description: "Akses dokumen dan regulasi pemerintah daerah",
    category: "ppid",
    stats: "1.5k",
    requirements: [],
    process: [
      "Akses portal dokumen publik",
      "Cari dokumen yang dibutuhkan",
      "Download dokumen",
    ],
    duration: "Langsung",
    cost: "Gratis",
    relatedServices: ["ppid"],
  },

  // Kebencanaan
  {
    slug: "darurat",
    icon: ShieldAlert,
    name: "Layanan Darurat",
    description: "Nomor darurat dan layanan tanggap bencana 24/7",
    category: "disaster",
    badge: "Penting",
    stats: "24/7",
    requirements: [],
    process: [
      "Hubungi nomor darurat 112/119",
      "Laporkan kejadian",
      "Ikuti instruksi petugas",
      "Tim darurat akan datang",
    ],
    duration: "Segera",
    cost: "Gratis",
    relatedServices: ["info-bencana"],
  },
  {
    slug: "info-bencana",
    icon: Cloud,
    name: "Info Bencana",
    description: "Informasi cuaca dan peringatan dini bencana",
    category: "disaster",
    stats: "Real-time",
    requirements: [],
    process: [
      "Akses portal info bencana",
      "Lihat peringatan dini",
      "Ikuti instruksi evakuasi (jika ada)",
      "Update informasi berkala",
    ],
    duration: "Real-time",
    cost: "Gratis",
    relatedServices: ["darurat"],
  },

  // Multisektor
  {
    slug: "layanan-terpadu",
    icon: FileCheck,
    name: "Layanan Terpadu",
    description: "Layanan administrasi terpadu satu pintu",
    category: "multisector",
    stats: "2.1k",
    requirements: ["Sesuai jenis layanan yang dibutuhkan"],
    process: [
      "Datang ke kantor layanan terpadu",
      "Ambil nomor antrian",
      "Konsultasi dengan petugas",
      "Serahkan persyaratan",
      "Proses layanan",
    ],
    duration: "Bervariasi",
    cost: "Bervariasi",
    relatedServices: ["pengaduan-masyarakat"],
  },
  {
    slug: "pengaduan-masyarakat",
    icon: MessageCircle,
    name: "Pengaduan Masyarakat",
    description: "Saluran pengaduan dan aspirasi masyarakat",
    category: "multisector",
    badge: "Populer",
    stats: "3.4k",
    requirements: [
      "Identitas pelapor (opsional untuk anonim)",
      "Deskripsi pengaduan",
      "Bukti pendukung (foto/dokumen)",
    ],
    process: [
      "Buat laporan pengaduan",
      "Isi detail pengaduan",
      "Upload bukti (jika ada)",
      "Verifikasi laporan",
      "Tindak lanjut dan update status",
    ],
    duration: "7-30 hari kerja",
    cost: "Gratis",
    relatedServices: ["layanan-terpadu"],
  },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const ServiceIcon = service.icon;

  return (
    <main className="bg-muted">
        {/* Hero Section */}
        <section className="from-primary to-primary-hover bg-gradient-to-br py-16 text-white">
          <div className="container mx-auto max-w-5xl px-4">
            {/* Breadcrumb */}
            <nav className="text-primary-lighter mb-6 flex items-center gap-2 text-sm">
              <Link href="/" className="hover:text-white">
                Beranda
              </Link>
              <span>/</span>
              <Link href="/layanan" className="hover:text-white">
                Layanan
              </Link>
              <span>/</span>
              <span className="text-white">{service.name}</span>
            </nav>

            {/* Header */}
            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <ServiceIcon size={40} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold md:text-4xl">
                    {service.name}
                  </h1>
                  {service.badge && (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        service.badge === "Baru"
                          ? "bg-amber-400 text-amber-900"
                          : service.badge === "Penting"
                            ? "bg-red-400 text-red-900"
                            : "bg-primary-light text-primary-dark"
                      }`}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-primary-lighter mb-4 text-lg">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} />
                    <span>{service.cost}</span>
                  </div>
                  {service.stats && (
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{service.stats} pengguna</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column - Main Info */}
              <div className="space-y-8 lg:col-span-2">
                {/* Requirements */}
                {service.requirements.length > 0 && (
                  <div className="border-border bg-card rounded-2xl border p-6 shadow-sm">
                    <h2 className="text-foreground mb-4 flex items-center gap-2 text-xl font-bold">
                      <FileText className="text-primary" size={24} />
                      Persyaratan
                    </h2>
                    <ul className="space-y-3">
                      {service.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2
                            className="text-primary mt-0.5 shrink-0"
                            size={20}
                          />
                          <span className="text-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Process */}
                <div className="border-border bg-card rounded-2xl border p-6 shadow-sm">
                  <h2 className="text-foreground mb-4 flex items-center gap-2 text-xl font-bold">
                    <FileCheck className="text-primary" size={24} />
                    Alur Proses
                  </h2>
                  <ol className="space-y-4">
                    {service.process.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <div className="bg-primary-lighter text-primary-hover flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-foreground">{step}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Download Forms */}
                {service.downloadForms && service.downloadForms.length > 0 && (
                  <div className="border-border bg-card rounded-2xl border p-6 shadow-sm">
                    <h2 className="text-foreground mb-4 flex items-center gap-2 text-xl font-bold">
                      <FileDown className="text-primary" size={24} />
                      Unduh Formulir
                    </h2>
                    <div className="space-y-3">
                      {service.downloadForms.map((form, index) => (
                        <a
                          key={index}
                          href="#"
                          className="hover:border-primary-light hover:bg-primary-lighter border-border flex items-center justify-between rounded-lg border p-4 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <FileDown className="text-primary" size={20} />
                            <span className="text-foreground font-medium">
                              {form}
                            </span>
                          </div>
                          <ArrowRight
                            className="text-muted-foreground"
                            size={20}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Quick Info */}
                <div className="border-border bg-card rounded-2xl border p-6 shadow-sm">
                  <h3 className="text-foreground mb-4 font-bold">
                    Informasi Cepat
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm font-medium">
                        <Clock size={16} />
                        Waktu Proses
                      </div>
                      <p className="text-foreground">{service.duration}</p>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm font-medium">
                        <CreditCard size={16} />
                        Biaya
                      </div>
                      <p className="text-foreground">{service.cost}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href="/login"
                  className="bg-primary shadow-primary/30 hover:bg-primary-hover block w-full rounded-xl px-6 py-4 text-center font-semibold text-white shadow-lg transition-all"
                >
                  Ajukan Layanan
                </Link>

                {/* Alert */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/30">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-400">
                    <AlertCircle size={20} />
                    Perhatian
                  </div>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Pastikan semua persyaratan sudah lengkap sebelum mengajukan
                    layanan untuk mempercepat proses.
                  </p>
                </div>

                {/* Related Services */}
                {service.relatedServices &&
                  service.relatedServices.length > 0 && (
                    <div className="border-border bg-card rounded-2xl border p-6 shadow-sm">
                      <h3 className="text-foreground mb-4 font-bold">
                        Layanan Terkait
                      </h3>
                      <div className="space-y-2">
                        {service.relatedServices.map((relatedSlug) => {
                          const relatedService = servicesData.find(
                            (s) => s.slug === relatedSlug
                          );
                          if (!relatedService) return null;
                          const RelatedIcon = relatedService.icon;
                          return (
                            <Link
                              key={relatedSlug}
                              href={`/layanan/${relatedSlug}`}
                              className="hover:bg-muted flex items-center gap-3 rounded-lg p-3 transition-colors"
                            >
                              <div className="bg-primary-lighter text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                                <RelatedIcon size={20} />
                              </div>
                              <div className="flex-1">
                                <p className="text-foreground text-sm font-medium">
                                  {relatedService.name}
                                </p>
                              </div>
                              <ArrowRight
                                className="text-muted-foreground"
                                size={16}
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
