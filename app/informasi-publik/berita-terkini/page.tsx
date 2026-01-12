"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  Calendar,
  Clock,
  Eye,
  ChevronRight,
  Search,
  Tag,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/landing-header";
import { Footer } from "@/components/layout/landing-footer";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  views: number;
  image: string;
  featured?: boolean;
}

const newsCategories = [
  "Semua",
  "Pemerintahan",
  "Pembangunan",
  "Ekonomi",
  "Sosial Budaya",
  "Pendidikan",
  "Kesehatan",
  "Lingkungan",
  "Olahraga",
];

const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Bupati Naiera Resmikan Jembatan Penghubung Dua Kecamatan",
    excerpt:
      "Jembatan sepanjang 250 meter ini akan mempersingkat waktu tempuh antar kecamatan hingga 2 jam. Pembangunan jembatan ini merupakan bagian dari program konektivitas daerah.",
    category: "Pembangunan",
    date: "12 Januari 2026",
    readTime: "5 menit",
    views: 1250,
    image: "/placeholder-news-1.jpg",
    featured: true,
  },
  {
    id: "2",
    title: "Program Beasiswa Naiera Cerdas Tahun 2026 Dibuka",
    excerpt:
      "Pemerintah Kabupaten Naiera membuka pendaftaran beasiswa untuk 1.000 pelajar berprestasi dari keluarga kurang mampu.",
    category: "Pendidikan",
    date: "11 Januari 2026",
    readTime: "3 menit",
    views: 980,
    image: "/placeholder-news-2.jpg",
    featured: true,
  },
  {
    id: "3",
    title: "Vaksinasi COVID-19 Booster Kedua Dimulai di 15 Puskesmas",
    excerpt:
      "Dinas Kesehatan Kabupaten Naiera memulai program vaksinasi booster kedua secara serentak di seluruh puskesmas.",
    category: "Kesehatan",
    date: "10 Januari 2026",
    readTime: "4 menit",
    views: 756,
    image: "/placeholder-news-3.jpg",
  },
  {
    id: "4",
    title: "Festival Budaya Naiera 2026 Akan Digelar Bulan Depan",
    excerpt:
      "Perhelatan tahunan yang menampilkan kekayaan budaya lokal ini diperkirakan akan menarik 50.000 pengunjung.",
    category: "Sosial Budaya",
    date: "9 Januari 2026",
    readTime: "3 menit",
    views: 1100,
    image: "/placeholder-news-4.jpg",
  },
  {
    id: "5",
    title: "UMKM Naiera Tembus Pasar Ekspor ke 5 Negara ASEAN",
    excerpt:
      "Produk kerajinan dan kuliner khas Naiera berhasil menembus pasar ekspor berkat program pendampingan pemerintah.",
    category: "Ekonomi",
    date: "8 Januari 2026",
    readTime: "6 menit",
    views: 890,
    image: "/placeholder-news-5.jpg",
  },
  {
    id: "6",
    title: "Rapat Koordinasi Penanggulangan Banjir Musim Hujan",
    excerpt:
      "Bupati memimpin rapat koordinasi dengan seluruh camat untuk mengantisipasi potensi banjir di musim hujan.",
    category: "Pemerintahan",
    date: "7 Januari 2026",
    readTime: "4 menit",
    views: 650,
    image: "/placeholder-news-6.jpg",
  },
  {
    id: "7",
    title: "Atlet Naiera Raih 5 Medali Emas di PON XXI",
    excerpt:
      "Kontingen Kabupaten Naiera berhasil membawa pulang 5 medali emas dari cabang olahraga atletik dan renang.",
    category: "Olahraga",
    date: "6 Januari 2026",
    readTime: "3 menit",
    views: 1500,
    image: "/placeholder-news-7.jpg",
  },
  {
    id: "8",
    title: "Program Penanaman 10.000 Pohon di Kawasan Hutan Lindung",
    excerpt:
      "Dalam rangka Hari Lingkungan Hidup, pemerintah daerah melakukan penanaman pohon bersama masyarakat.",
    category: "Lingkungan",
    date: "5 Januari 2026",
    readTime: "4 menit",
    views: 420,
    image: "/placeholder-news-8.jpg",
  },
];

const popularArticles = newsArticles
  .slice()
  .sort((a, b) => b.views - a.views)
  .slice(0, 5);

export default function BeritaTerkiniPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const featuredNews = newsArticles.filter((a) => a.featured);
  const filteredNews = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main className="bg-slate-50">
        {/* Hero Section */}
        <section className="from-primary to-primary-hover bg-gradient-to-br py-12 text-white">
          <div className="container mx-auto max-w-6xl px-4">
            <nav className="text-primary-lighter mb-4 flex items-center gap-2 text-sm">
              <Link href="/" className="hover:text-white">
                Beranda
              </Link>
              <ChevronRight size={14} />
              <Link href="/informasi-publik" className="hover:text-white">
                Informasi Publik
              </Link>
              <ChevronRight size={14} />
              <span className="text-white">Berita Terkini</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <Newspaper size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Berita Terkini</h1>
                <p className="text-primary-lighter">
                  Informasi terbaru seputar pemerintahan dan pembangunan daerah
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured News */}
        <section className="border-b border-slate-200 bg-white py-8">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-6 flex items-center gap-2">
              <TrendingUp className="text-primary" size={20} />
              <h2 className="text-lg font-bold text-slate-800">Berita Utama</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredNews.map((article) => (
                <Link
                  key={article.id}
                  href={`/informasi-publik/berita/${article.id}`}
                  className="group relative overflow-hidden rounded-2xl bg-slate-900"
                >
                  <div className="aspect-[16/9] w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    <div className="from-primary to-primary-hover absolute inset-0 flex items-center justify-center bg-gradient-to-br">
                      <Newspaper className="h-16 w-16 text-white/30" />
                    </div>
                  </div>
                  <div className="absolute right-0 bottom-0 left-0 p-6">
                    <span className="bg-primary mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white">
                      {article.category}
                    </span>
                    <h3 className="group-hover:text-primary-lighter mb-2 text-xl font-bold text-white transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-300">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="border-b border-slate-200 bg-white py-4">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative max-w-md flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {newsCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-8">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <p className="mb-4 text-sm text-slate-600">
                  Menampilkan {filteredNews.length} berita
                </p>
                <div className="space-y-6">
                  {filteredNews.map((article) => (
                    <Link
                      key={article.id}
                      href={`/informasi-publik/berita/${article.id}`}
                      className="group hover:border-primary-light flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="from-primary-lighter to-primary-light relative h-32 w-48 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br">
                        <div className="flex h-full w-full items-center justify-center">
                          <Newspaper className="text-primary-light h-10 w-10" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="bg-primary-lighter text-primary-hover rounded px-2 py-0.5 text-xs font-medium">
                            {article.category}
                          </span>
                          <span className="text-xs text-slate-500">
                            {article.date}
                          </span>
                        </div>
                        <h3 className="group-hover:text-primary mb-2 line-clamp-2 font-bold text-slate-800 transition-colors">
                          {article.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-slate-600">
                          {article.excerpt}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {article.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {article.views.toLocaleString()} views
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-2">
                  <button className="bg-primary rounded-lg px-4 py-2 text-sm font-medium text-white">
                    1
                  </button>
                  <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200">
                    2
                  </button>
                  <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200">
                    3
                  </button>
                  <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Popular Articles */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-800">
                    <TrendingUp className="text-primary" size={18} />
                    Berita Populer
                  </h3>
                  <div className="space-y-4">
                    {popularArticles.map((article, index) => (
                      <Link
                        key={article.id}
                        href={`/informasi-publik/berita/${article.id}`}
                        className="group flex gap-3"
                      >
                        <span className="bg-primary-lighter text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="group-hover:text-primary line-clamp-2 text-sm font-medium text-slate-800 transition-colors">
                            {article.title}
                          </h4>
                          <span className="text-xs text-slate-500">
                            {article.views.toLocaleString()} views
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-800">
                    <Tag className="text-primary" size={18} />
                    Kategori
                  </h3>
                  <div className="space-y-2">
                    {newsCategories.slice(1).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className="flex w-full items-center justify-between rounded-lg p-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        <span>{cat}</span>
                        <ChevronRight size={14} className="text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subscribe */}
                <div className="from-primary to-primary-hover rounded-2xl bg-gradient-to-br p-6 text-white">
                  <h3 className="mb-2 font-bold">Berlangganan Newsletter</h3>
                  <p className="text-primary-lighter mb-4 text-sm">
                    Dapatkan berita terbaru langsung ke email Anda
                  </p>
                  <Input
                    type="email"
                    placeholder="Email Anda"
                    className="placeholder:text-primary-lighter mb-3 border-0 bg-white/20 text-white"
                  />
                  <button className="text-primary hover:bg-primary-lighter w-full rounded-lg bg-white py-2 text-sm font-semibold transition-colors">
                    Berlangganan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
