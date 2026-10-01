"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Plus,
  Bell,
  Search,
  PenSquare,
  ShoppingBag,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";

export function DashboardHeader() {
  const { language, tenant } = useStore();
  const t = useI18n(language);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 sm:px-6 lg:px-8">
      {/* Left side: Mobile burger & search bar */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="inline-flex lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </button>

        <div className="hidden sm:flex items-center space-x-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-400 dark:border-slate-800 dark:bg-slate-900 w-64 md:w-80">
          <Search className="h-3.5 w-3.5" />
          <span>Cari kata kunci, artikel, produk...</span>
          <kbd className="ml-auto rounded border border-slate-300 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:border-slate-700">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        <LanguageToggle />
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Notifikasi SEO Real-time
                </span>
                <span className="text-[10px] text-blue-600">3 Baru</span>
              </div>
              <div className="mt-3 space-y-2.5 text-xs">
                <div className="rounded-lg bg-emerald-50 p-2.5 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40">
                  <div className="font-semibold text-emerald-800 dark:text-emerald-300">
                    Keyword Naik Posisi #1!
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                    "visa umrah di bandung" naik ke ranking 1 Google dengan 340 klik bulan ini.
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-2.5 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40">
                  <div className="font-semibold text-blue-800 dark:text-blue-300">
                    Inquiry Buyer Ekspor Masuk
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                    Buyer asal Jerman mengirim pertanyaan untuk produk Vanili Planifolia Grade A.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Button: New Article */}
        <Link href="/dashboard/articles/generate">
          <Button size="sm" variant="primary" className="hidden sm:inline-flex items-center space-x-1.5 shadow-sm">
            <Plus className="h-4 w-4" />
            <span>{t.btnNewArticle}</span>
          </Button>
        </Link>

        {/* User Avatar */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            NA
          </div>
          <div className="hidden xl:block text-left text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-100">Agro Nusantara</div>
            <div className="text-[10px] text-slate-400">admin@nusantara.id</div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white p-5 shadow-2xl dark:bg-slate-950 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                    W
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">Wospy AI</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-1">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  {t.navOverview}
                </Link>
                <Link
                  href="/dashboard/wizard"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
                >
                  {t.navWizard}
                </Link>
                <Link
                  href="/dashboard/keywords"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  {t.navKeywords}
                </Link>
                <Link
                  href="/dashboard/articles/generate"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  {t.navArticleGen}
                </Link>
                <Link
                  href="/dashboard/articles"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  {t.navArticles}
                </Link>
                <Link
                  href="/dashboard/products"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  {t.navProducts}
                </Link>
                <Link
                  href="/dashboard/analytics"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  {t.navRankTracker}
                </Link>
                <Link
                  href="/dashboard/media"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  {t.navMedia}
                </Link>
                <Link
                  href="/dashboard/admin"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  {t.navAdmin}
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <Link href="/catalog" target="_blank">
                <Button variant="outline" className="w-full text-xs">
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  Buka Katalog Publik
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
