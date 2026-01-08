"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/shared/language-switcher";

export function Header() {
  const t = useTranslations("Navigation");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t("home"), href: "#beranda", active: true },
    { label: t("services"), href: "#layanan", active: false },
    { label: t("about"), href: "#tentang", active: false },
    { label: t("news"), href: "#berita", active: false },
    { label: t("contact"), href: "#kontak", active: false },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 h-20 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
              <Image
                src="/naiera.png"
                alt="Naiera Logo"
                fill
                className="object-contain p-1.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-800">
                {t("brandName")}
              </span>
              <span className="hidden text-xs text-slate-500 sm:block">
                {t("brandSubtitle")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative font-medium transition-all duration-300 ${
                  item.active
                    ? "text-emerald-600"
                    : "text-slate-600 hover:text-emerald-600"
                }`}
              >
                {item.label}
                {item.active && (
                  <span className="absolute right-0 -bottom-5 left-0 h-0.5 bg-emerald-600" />
                )}
              </a>
            ))}
          </nav>

          {/* Action Section */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/login"
              className="hidden items-center justify-center rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:bg-emerald-700 sm:inline-flex"
            >
              {t("login")}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 transition-colors hover:text-emerald-600 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl">
            <div className="flex h-full flex-col">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <span className="text-lg font-bold text-slate-800">
                  {t("menu")}
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-600 transition-colors hover:text-emerald-600"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 overflow-y-auto">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block border-b border-slate-100 px-6 py-4 font-medium transition-colors ${
                      item.active
                        ? "bg-emerald-50 text-emerald-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Drawer Footer */}
              <div className="border-t border-slate-200 p-6">
                <Link
                  href="/login"
                  className="block w-full rounded-lg bg-emerald-600 px-6 py-3 text-center font-medium text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-700"
                >
                  {t("login")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
