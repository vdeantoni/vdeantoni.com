"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export const ColorSchemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="data-color-scheme" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
};
