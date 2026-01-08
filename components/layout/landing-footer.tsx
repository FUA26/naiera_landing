import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Smartphone,
  Building2,
  FileText,
  Info,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-12">
          {/* Brand Section - Spans 4 columns on large screens */}
          <div className="lg:col-span-4">
            <div className="mb-6 flex items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-white/10">
                <Image
                  src="/naiera.png"
                  alt="Naiera Logo"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {t("brandName")}
                </h3>
                <p className="text-sm text-slate-400">{t("brandSubtitle")}</p>
              </div>
            </div>
            <p className="mb-6 leading-relaxed text-slate-400">
              {t("brandDescription")}
            </p>

            {/* Social Media */}
            <div className="space-y-3">
              <p className="mb-3 text-sm font-semibold text-white">
                {t("followUs")}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#facebook"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition-all duration-300 hover:bg-emerald-600"
                  aria-label="Facebook"
                >
                  <Facebook
                    size={18}
                    className="transition-transform group-hover:scale-110"
                  />
                </a>
                <a
                  href="#twitter"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition-all duration-300 hover:bg-emerald-600"
                  aria-label="Twitter"
                >
                  <Twitter
                    size={18}
                    className="transition-transform group-hover:scale-110"
                  />
                </a>
                <a
                  href="#instagram"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition-all duration-300 hover:bg-emerald-600"
                  aria-label="Instagram"
                >
                  <Instagram
                    size={18}
                    className="transition-transform group-hover:scale-110"
                  />
                </a>
                <a
                  href="#youtube"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition-all duration-300 hover:bg-emerald-600"
                  aria-label="Youtube"
                >
                  <Youtube
                    size={18}
                    className="transition-transform group-hover:scale-110"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Layanan - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
              <Building2 size={20} className="text-emerald-400" />
              {t("services.title")}
            </h3>
            <ul className="space-y-3">
              {[
                "population",
                "health",
                "education",
                "economy",
                "manpower",
                "tourism",
                "infrastructure",
                "social",
              ].map((key) => (
                <li key={key}>
                  <a
                    href={`#layanan-${key}`}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-emerald-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                    {t(`services.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tentang - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
              <Info size={20} className="text-emerald-400" />
              {t("about.title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#tentang-kami"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  {t("about.aboutUs")}
                </a>
              </li>
              <li>
                <a
                  href="#visi-misi"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  {t("about.visionMission")}
                </a>
              </li>
              <li>
                <a
                  href="#struktur"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  {t("about.structure")}
                </a>
              </li>
              <li>
                <a
                  href="#berita"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  {t("about.news")}
                </a>
              </li>
              <li>
                <a
                  href="#acara"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  {t("about.events")}
                </a>
              </li>
              <li>
                <a
                  href="#karir"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  {t("about.careers")}
                </a>
              </li>
            </ul>
          </div>

          {/* Bantuan - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
              <FileText size={20} className="text-emerald-400" />
              {t("help.title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#faq"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  {t("help.faq")}
                </a>
              </li>
              <li>
                <a
                  href="#panduan"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  {t("help.guide")}
                </a>
              </li>
              <li>
                <a
                  href="#kontak"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  {t("help.contactUs")}
                </a>
              </li>
              <li>
                <a
                  href="#layanan-pengaduan"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  {t("help.complaints")}
                </a>
              </li>
              <li>
                <a
                  href="#download"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <Smartphone size={14} className="text-emerald-400" />
                  {t("help.downloadApp")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
              <Phone size={20} className="text-emerald-400" />
              {t("contact.title")}
            </h3>
            <ul className="space-y-4">
              <li className="group flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-emerald-400" />
                <div>
                  <p className="mb-1 text-sm font-medium text-white">
                    {t("contact.address")}
                  </p>
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {t("contact.addressContent")}
                  </div>
                </div>
              </li>
              <li className="group flex items-start gap-3">
                <Phone size={18} className="mt-1 shrink-0 text-emerald-400" />
                <div>
                  <p className="mb-1 text-sm font-medium text-white">
                    {t("contact.phone")}
                  </p>
                  <a
                    href="tel:+622112345678"
                    className="text-sm transition-colors hover:text-emerald-400"
                  >
                    (021) 1234-5678
                  </a>
                  <br />
                  <a
                    href="tel:+622198765432"
                    className="text-sm transition-colors hover:text-emerald-400"
                  >
                    (021) 9876-5432
                  </a>
                </div>
              </li>
              <li className="group flex items-start gap-3">
                <Mail size={18} className="mt-1 shrink-0 text-emerald-400" />
                <div>
                  <p className="mb-1 text-sm font-medium text-white">
                    {t("contact.email")}
                  </p>
                  <a
                    href="mailto:info@naiera.go.id"
                    className="text-sm transition-colors hover:text-emerald-400"
                  >
                    info@naiera.go.id
                  </a>
                  <br />
                  <a
                    href="mailto:layanan@naiera.go.id"
                    className="text-sm transition-colors hover:text-emerald-400"
                  >
                    layanan@naiera.go.id
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links / Important Links */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <h4 className="mb-4 font-semibold text-white">{t("relatedLinks")}</h4>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {[
              { name: "Kemendagri", url: "#" },
              { name: "KOMINFO", url: "#" },
              { name: "BPS", url: "#" },
              { name: "LKPP", url: "#" },
              { name: "OSS", url: "#" },
              { name: "PPID", url: "#" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-emerald-400"
              >
                <ExternalLink size={14} className="shrink-0" />
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright */}
            <p className="text-center text-sm text-slate-400 md:text-left">
              {t("copyright", { year: currentYear })}
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a
                href="#privasi"
                className="text-slate-400 transition-colors hover:text-emerald-400"
              >
                {t("legal.privacy")}
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="#syarat"
                className="text-slate-400 transition-colors hover:text-emerald-400"
              >
                {t("legal.terms")}
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="#disclaimer"
                className="text-slate-400 transition-colors hover:text-emerald-400"
              >
                {t("legal.disclaimer")}
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="#sitemap"
                className="text-slate-400 transition-colors hover:text-emerald-400"
              >
                {t("legal.sitemap")}
              </a>
            </div>
          </div>

          {/* Version & Build Info */}
          <div className="mt-4 border-t border-slate-900 pt-4 text-center">
            <p className="text-xs text-slate-600">
              {t("brandName")} v1.0.0 | Build: 2026.01.06 | {t("version")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
