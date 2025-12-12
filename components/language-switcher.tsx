"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === "en" ? "id" : "en";

    // Remove current locale from pathname if it exists
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");

    // Navigate to the same page with new locale
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  return (
    <Button variant="ghost" size="icon" onClick={switchLocale}>
      <Globe className="h-5 w-5" />
      <span className="sr-only">
        {locale === "en" ? "Switch to Indonesian" : "Ganti ke Bahasa Inggris"}
      </span>
      <span className="ml-2 hidden text-sm sm:inline-block">
        {locale === "en" ? "ID" : "EN"}
      </span>
    </Button>
  );
}
