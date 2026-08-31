import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kreava — Studio Konten AI",
  description: "Buat gambar iklan, sales page, dan copy yang konsisten dengan brand-mu.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Kreava — Studio Konten AI",
    description: "Buat iklan yang siap menjual untuk brand Indonesia.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Kreava — Buat iklan yang siap menjual" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kreava — Studio Konten AI",
    description: "Buat iklan yang siap menjual untuk brand Indonesia.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body className={manrope.variable}>{children}</body></html>;
}
