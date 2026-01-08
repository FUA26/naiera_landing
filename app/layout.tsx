import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import "./globals.css";
import { Providers } from "@/components/providers";
import { AccessibilityWidget } from "@/components/shared/accessibility-widget";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Super App Naiera - Layanan Digital Kabupaten Naiera",
  description:
    "Akses ratusan layanan pemerintahan dengan mudah, cepat, dan aman dalam satu platform digital. Kabupaten Naiera menuju digitalisasi pelayanan publik.",
  keywords: [
    "super app",
    "naiera",
    "kabupaten naiera",
    "layanan digital",
    "pemerintahan",
    "e-government",
  ],
  icons: {
    icon: "/naiera.png",
    apple: "/naiera.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <NuqsAdapter>{children}</NuqsAdapter>
            <AccessibilityWidget />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
