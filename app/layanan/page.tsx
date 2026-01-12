"use client";

import { useState } from "react";
import Link from "next/link";
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
  Briefcase,
  ArrowRight,
  Landmark,
  TreePine,
  MapPin,
  ShieldAlert,
  Palmtree,
  Award,
  Factory,
  Heart,
  Sprout,
  FileSearch,
  Building,
  Cloud,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/landing-header";
import { Footer } from "@/components/layout/landing-footer";

interface Service {
  slug: string;
  icon: LucideIcon;
  name: string;
  description: string;
  category: string;
  categorySlug: string;
  badge?: string;
}

interface Category {
  name: string;
  slug: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const categories: Category[] = [
  {
    name: "Kependudukan",
    slug: "population",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary-lighter",
  },
  {
    name: "Kesehatan",
    slug: "health",
    icon: HeartPulse,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    name: "Pendidikan",
    slug: "education",
    icon: GraduationCap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Ekonomi",
    slug: "economy",
    icon: Briefcase,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    name: "Ketenagakerjaan",
    slug: "manpower",
    icon: Users,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    name: "Pariwisata",
    slug: "tourism",
    icon: Palmtree,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  {
    name: "Infrastruktur",
    slug: "infrastructure",
    icon: Building2,
    color: "text-slate-600",
    bgColor: "bg-slate-50",
  },
  {
    name: "Sosial",
    slug: "social",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    name: "Lingkungan",
    slug: "environment",
    icon: TreePine,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    name: "Pemerintahan",
    slug: "government",
    icon: Landmark,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    name: "PPID",
    slug: "ppid",
    icon: FileSearch,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    name: "Kebencanaan",
    slug: "disaster",
    icon: ShieldAlert,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
];

const services: Service[] = [
  // Kependudukan
  {
    slug: "e-ktp",
    icon: IdCard,
    name: "E-KTP",
    description: "Pembuatan dan perpanjangan KTP Elektronik",
    category: "Kependudukan",
    categorySlug: "population",
    badge: "Populer",
  },
  {
    slug: "kk",
    icon: FileText,
    name: "Kartu Keluarga",
    description: "Pembuatan dan perubahan Kartu Keluarga",
    category: "Kependudukan",
    categorySlug: "population",
  },
  {
    slug: "akta-kelahiran",
    icon: FileCheck,
    name: "Akta Kelahiran",
    description: "Pembuatan Akta Kelahiran",
    category: "Kependudukan",
    categorySlug: "population",
  },
  {
    slug: "pindah-domisili",
    icon: Home,
    name: "Pindah Domisili",
    description: "Pengurusan surat pindah domisili",
    category: "Kependudukan",
    categorySlug: "population",
  },

  // Kesehatan
  {
    slug: "bpjs-kesehatan",
    icon: Heart,
    name: "BPJS Kesehatan",
    description: "Pendaftaran dan informasi BPJS",
    category: "Kesehatan",
    categorySlug: "health",
    badge: "Populer",
  },
  {
    slug: "puskesmas",
    icon: Building2,
    name: "Layanan Puskesmas",
    description: "Informasi layanan kesehatan Puskesmas",
    category: "Kesehatan",
    categorySlug: "health",
  },
  {
    slug: "posyandu",
    icon: Users,
    name: "Posyandu",
    description: "Layanan kesehatan ibu dan anak",
    category: "Kesehatan",
    categorySlug: "health",
  },

  // Pendidikan
  {
    slug: "ppdb",
    icon: GraduationCap,
    name: "PPDB Online",
    description: "Penerimaan Peserta Didik Baru",
    category: "Pendidikan",
    categorySlug: "education",
    badge: "Baru",
  },
  {
    slug: "beasiswa",
    icon: Award,
    name: "Beasiswa",
    description: "Informasi dan pendaftaran beasiswa",
    category: "Pendidikan",
    categorySlug: "education",
  },
  {
    slug: "surat-keterangan-sekolah",
    icon: FileText,
    name: "Surat Keterangan Sekolah",
    description: "Pengurusan surat keterangan",
    category: "Pendidikan",
    categorySlug: "education",
  },

  // Ekonomi
  {
    slug: "izin-usaha",
    icon: FileCheck,
    name: "Izin Usaha (NIB)",
    description: "Pengurusan Nomor Induk Berusaha",
    category: "Ekonomi",
    categorySlug: "economy",
  },
  {
    slug: "pajak-daerah",
    icon: CreditCard,
    name: "Pajak Daerah",
    description: "Pembayaran dan informasi pajak",
    category: "Ekonomi",
    categorySlug: "economy",
    badge: "Baru",
  },
  {
    slug: "modal-umkm",
    icon: Factory,
    name: "Bantuan Modal UMKM",
    description: "Program bantuan modal UMKM",
    category: "Ekonomi",
    categorySlug: "economy",
  },

  // Ketenagakerjaan
  {
    slug: "kartu-kuning",
    icon: FileSearch,
    name: "Kartu Kuning",
    description: "Kartu pencari kerja (AK/I)",
    category: "Ketenagakerjaan",
    categorySlug: "manpower",
  },
  {
    slug: "job-fair",
    icon: Building,
    name: "Job Fair",
    description: "Informasi bursa kerja",
    category: "Ketenagakerjaan",
    categorySlug: "manpower",
    badge: "Populer",
  },
  {
    slug: "pelatihan-kerja",
    icon: Award,
    name: "Pelatihan Kerja",
    description: "Program pelatihan dan sertifikasi",
    category: "Ketenagakerjaan",
    categorySlug: "manpower",
  },

  // Pariwisata
  {
    slug: "info-wisata",
    icon: MapPin,
    name: "Informasi Wisata",
    description: "Panduan destinasi wisata lokal",
    category: "Pariwisata",
    categorySlug: "tourism",
  },
  {
    slug: "izin-event",
    icon: Award,
    name: "Izin Event",
    description: "Perizinan event dan kegiatan publik",
    category: "Pariwisata",
    categorySlug: "tourism",
  },

  // Infrastruktur
  {
    slug: "imb",
    icon: Building,
    name: "IMB (PBG)",
    description: "Izin Mendirikan Bangunan",
    category: "Infrastruktur",
    categorySlug: "infrastructure",
  },
  {
    slug: "aduan-infrastruktur",
    icon: MessageCircle,
    name: "Aduan Infrastruktur",
    description: "Laporan kerusakan fasilitas umum",
    category: "Infrastruktur",
    categorySlug: "infrastructure",
    badge: "Populer",
  },
  {
    slug: "transportasi-umum",
    icon: Bus,
    name: "Transportasi Umum",
    description: "Info rute dan jadwal transportasi",
    category: "Infrastruktur",
    categorySlug: "infrastructure",
  },

  // Sosial
  {
    slug: "bansos",
    icon: Users,
    name: "Bantuan Sosial",
    description: "Program bantuan sosial masyarakat",
    category: "Sosial",
    categorySlug: "social",
  },
  {
    slug: "dtks",
    icon: Home,
    name: "DTKS",
    description: "Data Terpadu Kesejahteraan Sosial",
    category: "Sosial",
    categorySlug: "social",
  },

  // Lingkungan
  {
    slug: "bank-sampah",
    icon: Sprout,
    name: "Bank Sampah",
    description: "Program pengelolaan sampah",
    category: "Lingkungan",
    categorySlug: "environment",
  },
  {
    slug: "aduan-lingkungan",
    icon: MessageCircle,
    name: "Aduan Lingkungan",
    description: "Laporan masalah lingkungan",
    category: "Lingkungan",
    categorySlug: "environment",
  },

  // Pemerintahan
  {
    slug: "surat-rt-rw",
    icon: FileText,
    name: "Surat RT/RW",
    description: "Pengurusan surat keterangan RT/RW",
    category: "Pemerintahan",
    categorySlug: "government",
  },
  {
    slug: "dana-desa",
    icon: Building,
    name: "Dana Desa",
    description: "Transparansi penggunaan dana desa",
    category: "Pemerintahan",
    categorySlug: "government",
  },

  // PPID
  {
    slug: "ppid",
    icon: FileSearch,
    name: "Informasi Publik",
    description: "Permohonan informasi publik (PPID)",
    category: "PPID",
    categorySlug: "ppid",
  },
  {
    slug: "dokumen-publik",
    icon: FileText,
    name: "Dokumen Publik",
    description: "Akses dokumen dan regulasi",
    category: "PPID",
    categorySlug: "ppid",
  },

  // Kebencanaan
  {
    slug: "darurat",
    icon: ShieldAlert,
    name: "Layanan Darurat",
    description: "Nomor darurat dan tanggap bencana",
    category: "Kebencanaan",
    categorySlug: "disaster",
    badge: "Penting",
  },
  {
    slug: "info-bencana",
    icon: Cloud,
    name: "Info Bencana",
    description: "Peringatan dini dan info cuaca",
    category: "Kebencanaan",
    categorySlug: "disaster",
  },
];

export default function LayananPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === null || service.categorySlug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main className="bg-slate-50">
        {/* Hero Section */}
        <section className="from-primary to-primary-hover bg-gradient-to-br py-16 text-white">
          <div className="container mx-auto max-w-6xl px-4">
            {/* Breadcrumb */}
            <nav className="text-primary-light mb-6 flex items-center gap-2 text-sm">
              <Link href="/" className="hover:text-white">
                Beranda
              </Link>
              <span>/</span>
              <span className="text-white">Layanan</span>
            </nav>

            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              Portal Layanan Publik
            </h1>
            <p className="text-primary-lighter mb-8 max-w-2xl text-lg">
              Temukan dan akses berbagai layanan publik yang tersedia untuk
              Anda. Pilih kategori atau cari layanan yang Anda butuhkan.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Cari layanan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 rounded-xl border-0 bg-white pl-12 text-slate-800 shadow-lg placeholder:text-slate-400"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-slate-200 bg-white py-6">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === null
                    ? "bg-primary text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Semua Layanan
              </button>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedCategory === cat.slug
                        ? "bg-primary text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12">
          <div className="container mx-auto max-w-6xl px-4">
            {/* Results Count */}
            <p className="mb-6 text-sm text-slate-600">
              Menampilkan {filteredServices.length} layanan
              {selectedCategory &&
                ` dalam kategori "${categories.find((c) => c.slug === selectedCategory)?.name}"`}
              {searchQuery && ` untuk "${searchQuery}"`}
            </p>

            {filteredServices.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.slug}
                      href={`/layanan/${service.slug}`}
                      className="group hover:border-primary/30 relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      {/* Badge */}
                      {service.badge && (
                        <div className="absolute top-4 right-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              service.badge === "Baru"
                                ? "bg-amber-100 text-amber-700"
                                : service.badge === "Penting"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-primary-light text-primary-hover"
                            }`}
                          >
                            {service.badge}
                          </span>
                        </div>
                      )}

                      {/* Icon */}
                      <div className="bg-primary-lighter text-primary group-hover:bg-primary mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-all group-hover:text-white">
                        <Icon size={28} />
                      </div>

                      {/* Content */}
                      <h3 className="group-hover:text-primary mb-2 text-lg font-bold text-slate-800">
                        {service.name}
                      </h3>
                      <p className="mb-4 text-sm text-slate-600">
                        {service.description}
                      </p>

                      {/* Category & Action */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {service.category}
                        </span>
                        <div className="text-primary flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
                          Lihat Detail
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-800">
                  Layanan tidak ditemukan
                </h3>
                <p className="text-slate-600">
                  Coba ubah kata kunci pencarian atau pilih kategori lain.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
