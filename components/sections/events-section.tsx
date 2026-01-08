"use client";

import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Cloud,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";

interface Event {
  id: string;
  title: string;
  dateStr: string; // Keep ISO string for parsing
  time: string;
  location: string;
  category: string;
  attendees?: string;
  status: "upcoming" | "ongoing" | "completed";
  type: "online" | "offline" | "hybrid";
  image?: string;
  description?: string;
}

export function EventsSection() {
  const t = useTranslations("Events");
  const locale = useLocale();
  const dateLocale = locale === "id" ? "id-ID" : "en-US";

  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0)); // January 2026

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat(dateLocale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString(dateLocale, {
    month: "long",
    year: "numeric",
  });

  const eventDays = [7, 8, 9, 10, 12, 15, 17]; // Days with events

  // Generate localized weekday names
  const weekDays = useMemo(() => {
    const days = [];
    const d = new Date(2024, 0, 7); // Jan 7 2024 is a Sunday
    for (let i = 0; i < 7; i++) {
      days.push(
        new Intl.DateTimeFormat(dateLocale, { weekday: "short" }).format(d)
      );
      d.setDate(d.getDate() + 1);
    }
    return days;
  }, [dateLocale]);

  const events: Event[] = [
    {
      id: "1",
      title: t("items.event1.title"),
      dateStr: "2025-12-17",
      time: "10:00 - 11:00",
      location: "Gedung Serbaguna Kabupaten",
      category: t("items.event1.category"),
      attendees: "500",
      status: "upcoming",
      type: "offline",
      image: "/images/event-1.jpg",
      description: t("items.event1.desc"),
    },
    {
      id: "2",
      title: t("items.event2.title"),
      dateStr: "2025-12-24",
      time: "09:00 - 22:00",
      location: "Agenda Offline | Umum",
      category: t("items.event2.category"),
      status: "upcoming",
      type: "offline",
      image: "/images/event-2.jpg",
    },
    {
      id: "3",
      title: t("items.event3.title"),
      dateStr: "2025-12-20",
      time: "19:00 - 21:00",
      location: "Agenda Offline | Umum",
      category: t("items.event3.category"),
      status: "upcoming",
      type: "offline",
      image: "/images/event-3.jpg",
    },
    {
      id: "4",
      title: t("items.event4.title"),
      dateStr: "2026-01-12",
      time: "13:00 - 16:00",
      location: "Balai Pelatihan Kerja",
      category: t("items.event4.category"),
      attendees: "150",
      status: "upcoming",
      type: "hybrid",
    },
    {
      id: "5",
      title: t("items.event5.title"),
      dateStr: "2026-01-15",
      time: "08:00 - 17:00",
      location: "Stadion Utama Naiera",
      category: t("items.event5.category"),
      attendees: "2000+",
      status: "upcoming",
      type: "offline",
    },
  ];

  return (
    <section className="bg-slate-50 py-16 md:py-20" id="acara">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            {t("label")}
          </span>
          <h2 className="mb-3 text-3xl font-bold text-slate-800 md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 md:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Featured Event & Event List */}
          <div className="space-y-6 lg:col-span-2">
            {/* Featured Event */}
            {events[0] && (
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg">
                {/* Featured Event Image */}
                <div className="relative h-64 bg-gradient-to-br from-emerald-100 to-blue-100 md:h-80">
                  {/* Placeholder - replace with actual image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-600 opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar size={64} className="text-white/60" />
                  </div>

                  {/* Event Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                      {events[0].category}
                    </span>
                  </div>
                </div>

                {/* Featured Event Content */}
                <div className="p-6">
                  <h3 className="mb-4 text-2xl leading-tight font-bold text-slate-800">
                    {events[0].title}
                  </h3>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar size={18} className="text-emerald-600" />
                      <span className="font-medium">
                        {formatDate(events[0].dateStr)}
                      </span>
                      <span className="text-slate-400">|</span>
                      <span>{events[0].time}</span>
                    </div>

                    {events[0].description && (
                      <p className="leading-relaxed text-slate-600">
                        {events[0].description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <a
                      href={`/agenda/${events[0].id}`}
                      className="group inline-flex items-center gap-2 font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      {t("viewMore")}
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </a>
                    <button className="rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white transition-colors hover:bg-emerald-700">
                      {t("representative")}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Event List */}
            <div className="space-y-4">
              <h4 className="mb-4 text-lg font-bold text-slate-800">
                {t("finished")}
              </h4>

              {events.slice(1, 4).map((event) => (
                <a
                  key={event.id}
                  href={`/agenda/${event.id}`}
                  className="group flex gap-4 rounded-xl border border-slate-100 bg-white p-4 transition-all duration-300 hover:border-emerald-200 hover:shadow-lg"
                >
                  {/* Event Thumbnail */}
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/40 to-blue-500/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Calendar size={32} className="text-slate-400" />
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="min-w-0 flex-1">
                    <h5 className="mb-2 line-clamp-2 font-bold text-slate-800 transition-colors group-hover:text-emerald-600">
                      {event.title}
                    </h5>
                    <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={14} />
                      <span>{formatDate(event.dateStr)}</span>
                      <span>•</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={14} />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center">
                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium whitespace-nowrap text-slate-600">
                      {t("completed")}
                    </span>
                  </div>
                </a>
              ))}

              {/* View All Link */}
              <div className="pt-4 text-center">
                <a
                  href="#semua-agenda"
                  className="group inline-flex items-center gap-2 font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                >
                  {t("viewOthers")}
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Calendar Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h4 className="mb-6 text-lg font-bold text-slate-800">
                {t("title")}
              </h4>

              {/* Month Navigation */}
              <div className="mb-6 flex items-center justify-between">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1
                      )
                    )
                  }
                  className="rounded-lg p-2 transition-colors hover:bg-slate-100"
                >
                  <ChevronLeft size={20} className="text-slate-600" />
                </button>
                <div className="font-semibold text-slate-800">{monthName}</div>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1
                      )
                    )
                  }
                  className="rounded-lg p-2 transition-colors hover:bg-slate-100"
                >
                  <ChevronRight size={20} className="text-slate-600" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="mb-6">
                {/* Day Headers */}
                <div className="mb-2 grid grid-cols-7 gap-1">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="py-2 text-center text-xs font-medium text-slate-500"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}

                  {/* Days of the month */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const hasEvent = eventDays.includes(day);
                    const isToday = day === 6; // Example: 6th is today

                    return (
                      <button
                        key={day}
                        className={`flex aspect-square items-center justify-center rounded-lg text-sm transition-all duration-200 ${
                          isToday
                            ? "bg-emerald-600 font-bold text-white"
                            : hasEvent
                              ? "bg-emerald-50 font-semibold text-emerald-600 hover:bg-emerald-100"
                              : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calendar Legend */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-4 w-4 rounded bg-emerald-600" />
                  <span className="text-slate-600">{t("calToday")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-4 w-4 rounded border border-emerald-200 bg-emerald-50" />
                  <span className="text-slate-600">{t("calHasEvent")}</span>
                </div>
              </div>

              {/* No Event State */}
              <div className="mt-6 rounded-xl bg-slate-50 p-4 text-center">
                <Calendar size={40} className="mx-auto mb-2 text-slate-300" />
                <p className="text-sm text-slate-500">{t("calNoEvent")}</p>
                <p className="text-xs text-slate-400">{t("calNoEventDesc")}</p>
              </div>

              {/* View Full Calendar */}
              <a
                href="#kalender-lengkap"
                className="mt-4 block text-center text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                {t("viewOthers")} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
