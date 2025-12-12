import type { ReactNode } from "react";
import { locales } from "@/src/i18n/request";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children }: Props) {
  return children;
}
