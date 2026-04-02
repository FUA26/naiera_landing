"use client";

import * as React from "react";
import { ThemeProvider } from "./theme-provider";
import { N8nChatWidget } from "@/components/shared/n8n-chat";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <N8nChatWidget />
    </ThemeProvider>
  );
}
