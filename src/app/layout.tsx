import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import cn from "classnames";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ColorSchemeProvider } from "@/contexts/ColorSchemeContext";
import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import HighlightThemeLoader from "@/components/HighlightThemeLoader";

export const metadata: Metadata = {
  title: "vdeantoni.com",
  description: "Web site about the software engineer Vinicius De Antoni",
  icons: ["favicon.png"],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ColorSchemeProvider>
          <HighlightThemeLoader />
          <div
            className={cn(
              "flex",
              "flex-col",
              "max-w-6xl",
              "min-h-screen",
              "px-4",
              "mx-auto",
              "sm:px-6",
              "lg:px-8",
              "bg-muted",
            )}
          >
            <Header />
            <main className={cn("flex-1", "py-4", "md:py-8")}>{children}</main>
            <Footer />
          </div>
        </ColorSchemeProvider>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId="G-KRMQTNKF3C" />
      </body>
    </html>
  );
}
