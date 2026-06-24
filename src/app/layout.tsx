import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ColorSchemeProvider } from "@/components/ColorSchemeProvider";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import HighlightThemeLoader from "@/components/HighlightThemeLoader";

export const metadata: Metadata = {
  title: "Vinicius De Antoni — Software Engineer",
  description:
    "Portfolio of Vinicius De Antoni, a software engineer building distributed systems, user experiences, and creative side projects.",
  icons: ["favicon.png"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Fonts loaded via <link> rather than next/font/google, which is
            incompatible with the Turbopack build in Next.js 16. The
            no-page-custom-font rule targets the pages router and does not
            apply to an app-router root layout. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ColorSchemeProvider>
          <HighlightThemeLoader />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ColorSchemeProvider>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId="G-KRMQTNKF3C" />
      </body>
    </html>
  );
}
