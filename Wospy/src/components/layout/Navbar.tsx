"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Menu, X, Rocket, BookOpen, Layers, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const { language } = useStore();
  const t = useI18n(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Wospy<span className="text-blue-600">.ai</span>
            </span>
            <span className="hidden sm:inline-block ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              SEO Engine
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link
            href="/catalog"
            className="flex items-center space-x-1.5 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            <Layers className="h-4 w-4" />
            <span>{t.catalog}</span>
          </Link>
          <Link
            href="/blog"
            className="flex items-center space-x-1.5 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            <BookOpen className="h-4 w-4" />
            <span>{t.blog}</span>
          </Link>
          <Link
            href="/#features"
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            {t.features}
          </Link>
          <Link
            href="/#case-study"
            className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-semibold"
          >
            <span>{t.caseStudy}</span>
            <span className="rounded bg-emerald-100 dark:bg-emerald-950 px-1 text-[10px] text-emerald-700 dark:text-emerald-300 font-mono">
              2k+ views
            </span>
          </Link>
          <Link
            href="/#pricing"
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            {t.pricing}
          </Link>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center space-x-3">
          <LanguageToggle />
          <ThemeToggle />

          <Link href="/dashboard" className="hidden sm:inline-flex">
            <Button variant="outline" size="sm" className="font-medium">
              {t.login}
            </Button>
          </Link>

          <Link href="/dashboard/wizard">
            <Button size="sm" variant="primary" className="hidden sm:inline-flex items-center space-x-1.5">
              <span>{t.btnStartWizard}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 dark:border-slate-800 dark:bg-slate-950">
          <Link
            href="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-800 dark:text-slate-200"
          >
            {t.catalog}
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-800 dark:text-slate-200"
          >
            {t.blog}
          </Link>
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-800 dark:text-slate-200"
          >
            {t.features}
          </Link>
          <Link
            href="/#case-study"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-emerald-600 dark:text-emerald-400"
          >
            {t.caseStudy} (2000+ views)
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-800 dark:text-slate-200"
          >
            {t.pricing}
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                {t.login}
              </Button>
            </Link>
            <Link href="/dashboard/wizard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                {t.btnStartWizard}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
