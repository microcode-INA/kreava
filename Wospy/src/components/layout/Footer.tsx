import React from "react";
import Link from "next/link";
import { Sparkles, Globe, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Wospy<span className="text-blue-600">.ai</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Platform SEO AI All-in-One untuk Eksportir, UMKM, dan Agensi Indonesia menembus pasar global dengan kata kunci ber-intent tinggi.
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-500">
              <span className="inline-flex items-center space-x-1">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Google Search Console Ready</span>
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Fitur Utama
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard/keywords" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Riset Kata Kunci AI (ID/EN)
                </Link>
              </li>
              <li>
                <Link href="/dashboard/articles/generate" className="hover:text-blue-600 dark:hover:text-blue-400">
                  AI Article Generator
                </Link>
              </li>
              <li>
                <Link href="/dashboard/products" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Katalog Ekspor (Exportree Style)
                </Link>
              </li>
              <li>
                <Link href="/dashboard/analytics" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Rank Tracker & Daily Snapshot
                </Link>
              </li>
              <li>
                <Link href="/dashboard/media" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Optimasi Gambar WebP + Alt-Text
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Ekosistem Ekspor
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Katalog Publik Produk
                </Link>
              </li>
              <li>
                <Link href="/blog/visa-umrah-di-bandung" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Studi Kasus Haramain Service (2000+ views)
                </Link>
              </li>
              <li>
                <Link href="/catalog/indonesian-planifolia-vanilla-beans-grade-a" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Contoh Produk Vanili Ekspor
                </Link>
              </li>
              <li>
                <Link href="/dashboard/wizard" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Wizard Pemula 5-Langkah
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Paket Langganan
            </h4>
            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-medium text-slate-500">Mulai dari</div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Rp 149.000 <span className="text-xs font-normal text-slate-500">/ bulan</span>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                1 Website, 10 Artikel AI/bulan, 50 Produk, SEO Dasar & Rank Tracker.
              </p>
              <Link href="/#pricing" className="mt-3 block text-center text-xs font-semibold text-blue-600 hover:underline">
                Bandingkan Semua Paket →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Wospy.ai — Website SEO Praktis, Sekarang Pakai AI.</p>
          <p className="flex items-center space-x-1">
            <span>Dibuat untuk eksportir dan UMKM Indonesia</span>
            <Heart className="h-3.5 w-3.5 text-red-500 inline fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
