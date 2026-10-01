import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/lib/store-context";

export const metadata: Metadata = {
  title: "Wospy — Platform SEO AI All-in-One untuk Eksportir & UMKM",
  description:
    "Website SEO Praktis, sekarang pakai AI. Riset kata kunci, generate artikel multi-bahasa, optimasi gambar, katalog produk ekspor, dan rank tracking dalam satu dashboard terpadu.",
  keywords: [
    "Wospy",
    "SEO AI",
    "Katalog Ekspor",
    "UMKM Indonesia",
    "Bilingual Product Catalog",
    "Rank Tracker",
    "AI Article Generator",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
