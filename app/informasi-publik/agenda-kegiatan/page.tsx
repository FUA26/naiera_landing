"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Users,
  Filter,
  List,
  Grid3X3,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/landing-header";
import { Footer } from "@/components/layout/landing-footer";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  category: string;
  attendees?: number;
  color: string;
}

const eventCategories = [
  { name: "Semua", color: "bg-slate-500" },
  { name: "Pemerintahan", color: "bg-blue-500" },
  { name: "Budaya", color: "bg-purple-500" },
  { name: "Olahraga", color: "bg-green-500" },
  { name: "Pendidikan", color: "bg-amber-500" },
  { name: "Kesehatan", color: "bg-rose-500" },
];

const events: Event[] = [
  {
    id: "1",
    title: "Rapat Koordinasi Pimpinan Daerah",
    description: "Rapat koordinasi triwulan dengan seluruh kepala OPD",
    date: new Date(2026, 0, 15),
    time: "09:00 - 12:00 WIB",
    location: "Aula Kantor Bupati",
    category: "Pemerintahan",
    attendees: 50,
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Festival Budaya Naiera 2026",
    description: "Perhelatan tahunan menampilkan kekayaan budaya lokal",
    date: new Date(2026, 0, 20),
    time: "08:00 - 22:00 WIB",
    location: "Alun-alun Kabupaten Naiera",
    category: "Budaya",
    attendees: 5000,
    color: "bg-purple-500",
  },
  {
    id: "3",
    title: "Turnamen Sepak Bola Antar Kecamatan",
    description: "Kompetisi sepak bola tahunan antar kecamatan",
    date: new Date(2026, 0, 18),
    time: "14:00 - 17:00 WIB",
    location: "Stadion Naiera",
    category: "Olahraga",
    attendees: 1000,
    color: "bg-green-500",
  },
  {
    id: "4",
    title: "Seminar Pendidikan Digital",
    description: "Seminar tentang transformasi pendidikan di era digital",
    date: new Date(2026, 0, 22),
    time: "09:00 - 15:00 WIB",
    location: "Gedung DPRD Naiera",
    category: "Pendidikan",
    attendees: 200,
    color: "bg-amber-500",
  },
  {
    id: "5",
    title: "Vaksinasi Massal",
    description: "Program vaksinasi gratis untuk masyarakat",
    date: new Date(2026, 0, 25),
    time: "08:00 - 14:00 WIB",
    location: "Puskesmas Se-Kabupaten",
    category: "Kesehatan",
    attendees: 2000,
    color: "bg-rose-500",
  },
  {
    id: "6",
    title: "Musyawarah Perencanaan Pembangunan",
    description: "Musrenbang tingkat kabupaten tahun 2026",
    date: new Date(2026, 0, 28),
    time: "09:00 - 16:00 WIB",
    location: "Aula Bappeda",
    category: "Pemerintahan",
    attendees: 150,
    color: "bg-blue-500",
  },
  {
    id: "7",
    title: "Peringatan Hari Jadi Kabupaten",
    description: "Rangkaian acara peringatan HUT Kabupaten Naiera ke-75",
    date: new Date(2026, 1, 1),
    time: "07:00 - 22:00 WIB",
    location: "Berbagai Lokasi",
    category: "Budaya",
    attendees: 10000,
    color: "bg-purple-500",
  },
  {
    id: "8",
    title: "Lomba Maraton Naiera Run",
    description: "Event lari marathon 10K, 21K, dan 42K",
    date: new Date(2026, 1, 5),
    time: "05:00 - 12:00 WIB",
    location: "Start: Lapangan Merdeka",
    category: "Olahraga",
    attendees: 3000,
    color: "bg-green-500",
  },
];

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function AgendaKegiatanPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Filter events
  const filteredEvents = events.filter(
    (e) => selectedCategory === "Semua" || e.category === selectedCategory
  );

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    return filteredEvents.filter((e) => {
      const eventDate = new Date(e.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      );
    });
  };

  // Get upcoming events
  const upcomingEvents = filteredEvents
    .filter((e) => e.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

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
              <span className="text-white">Agenda Kegiatan</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <CalendarDays size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Agenda Kegiatan</h1>
                <p className="text-primary-lighter">
                  Jadwal kegiatan dan acara pemerintah daerah
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-slate-200 bg-white py-4">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {eventCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedCategory === cat.name
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat.name !== "Semua" && (
                      <span className={`h-2 w-2 rounded-full ${cat.color}`} />
                    )}
                    {cat.name}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("calendar")}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    viewMode === "calendar"
                      ? "bg-primary-lighter text-primary-hover"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Grid3X3 size={16} />
                  Kalender
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    viewMode === "list"
                      ? "bg-primary-lighter text-primary-hover"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <List size={16} />
                  Daftar
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Calendar / List View */}
              <div className="lg:col-span-2">
                {viewMode === "calendar" ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    {/* Calendar Header */}
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-slate-800">
                        {monthNames[currentMonth]} {currentYear}
                      </h2>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevMonth}
                          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() => setCurrentDate(new Date())}
                          className="text-primary hover:bg-primary-lighter rounded-lg px-3 py-1 text-sm font-medium transition-colors"
                        >
                          Hari Ini
                        </button>
                        <button
                          onClick={nextMonth}
                          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {/* Day Headers */}
                      {dayNames.map((day) => (
                        <div
                          key={day}
                          className="p-2 text-center text-sm font-semibold text-slate-600"
                        >
                          {day}
                        </div>
                      ))}

                      {/* Empty cells before first day */}
                      {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square p-1" />
                      ))}

                      {/* Days */}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const dayEvents = getEventsForDay(day);
                        const isToday =
                          day === new Date().getDate() &&
                          currentMonth === new Date().getMonth() &&
                          currentYear === new Date().getFullYear();

                        return (
                          <div
                            key={day}
                            className={`aspect-square rounded-lg p-1 transition-colors ${
                              isToday
                                ? "bg-primary-lighter"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <div
                              className={`mb-1 text-center text-sm font-medium ${
                                isToday ? "text-primary" : "text-slate-700"
                              }`}
                            >
                              {day}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              {dayEvents.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={`truncate rounded px-1 py-0.5 text-[10px] text-white ${event.color}`}
                                  title={event.title}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-center text-[10px] text-slate-500">
                                  +{dayEvents.length - 2} lagi
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-800">
                      Daftar Kegiatan ({filteredEvents.length})
                    </h2>
                    {filteredEvents.map((event) => (
                      <div
                        key={event.id}
                        className="hover:border-primary-light flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="bg-primary-lighter flex flex-col items-center justify-center rounded-xl px-4 py-3 text-center">
                          <span className="text-primary text-2xl font-bold">
                            {event.date.getDate()}
                          </span>
                          <span className="text-primary-light text-xs">
                            {monthNames[event.date.getMonth()].slice(0, 3)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${event.color}`}
                            />
                            <span className="text-xs font-medium text-slate-500">
                              {event.category}
                            </span>
                          </div>
                          <h3 className="mb-1 font-bold text-slate-800">
                            {event.title}
                          </h3>
                          <p className="mb-2 text-sm text-slate-600">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {event.location}
                            </span>
                            {event.attendees && (
                              <span className="flex items-center gap-1">
                                <Users size={12} />
                                {event.attendees.toLocaleString()} peserta
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Events */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-800">
                    <Calendar className="text-primary" size={18} />
                    Agenda Mendatang
                  </h3>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex gap-3">
                        <div className="bg-primary-lighter flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg text-center">
                          <span className="text-primary text-lg font-bold">
                            {event.date.getDate()}
                          </span>
                          <span className="text-primary-light text-[10px]">
                            {monthNames[event.date.getMonth()].slice(0, 3)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="line-clamp-1 text-sm font-medium text-slate-800">
                            {event.title}
                          </h4>
                          <p className="text-xs text-slate-500">{event.time}</p>
                          <div className="mt-1 flex items-center gap-1">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${event.color}`}
                            />
                            <span className="text-[10px] text-slate-400">
                              {event.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-bold text-slate-800">Kategori</h3>
                  <div className="space-y-2">
                    {eventCategories.slice(1).map((cat) => (
                      <div key={cat.name} className="flex items-center gap-3">
                        <span className={`h-3 w-3 rounded-full ${cat.color}`} />
                        <span className="text-sm text-slate-700">
                          {cat.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="from-primary to-primary-hover rounded-2xl bg-gradient-to-br p-6 text-white">
                  <h3 className="mb-4 font-bold">Statistik Bulan Ini</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold">
                        {filteredEvents.length}
                      </div>
                      <div className="text-primary-lighter text-sm">
                        Total Agenda
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {filteredEvents
                          .reduce((sum, e) => sum + (e.attendees || 0), 0)
                          .toLocaleString()}
                      </div>
                      <div className="text-primary-lighter text-sm">
                        Peserta
                      </div>
                    </div>
                  </div>
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
