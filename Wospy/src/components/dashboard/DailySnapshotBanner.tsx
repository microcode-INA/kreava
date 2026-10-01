"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, TrendingUp, ArrowUpRight, ArrowDownRight, MousePointerClick, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";

export function DailySnapshotBanner() {
  const { language } = useStore();
  const t = useI18n(language);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-6 text-white shadow-lg">
      {/* Background glowing decorations */}
      <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-blue-500/20 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-indigo-500/20 blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center rounded-full bg-blue-500/30 px-3 py-1 text-xs font-semibold backdrop-blur-sm border border-blue-400/30 text-blue-200">
              <Zap className="h-3.5 w-3.5 mr-1 text-amber-300 fill-amber-300" />
              {t.dailySnapshotTitle}
            </span>
            <span className="text-xs text-blue-200 font-mono">Diperbarui 07:15 WIB</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Hari ini: <span className="text-emerald-300">3 keyword naik ke Top 3 Google</span>, 1 turun minor, dan <span className="text-amber-300">+142 klik pembeli baru!</span>
          </h2>
          <p className="text-sm text-blue-100/90 leading-relaxed">
            Artikel <strong className="text-white underline decoration-emerald-400 underline-offset-2">visa-umrah-di-bandung</strong> mencapai ranking #1 Google (seperti studi kasus Haramain Service 2000+ views). Rekomendasi AI: Buat 1 artikel pendukung hari ini untuk memperkuat otoritas topikal!
          </p>
        </div>

        <div className="flex flex-row sm:flex-col gap-2 shrink-0">
          <Link href="/dashboard/analytics">
            <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold shadow-md">
              <TrendingUp className="h-4 w-4 mr-2 text-emerald-600" />
              <span>{t.btnViewDetails}</span>
            </Button>
          </Link>
          <Link href="/dashboard/articles/generate">
            <Button variant="outline" className="w-full border-blue-400/50 bg-blue-900/40 text-white hover:bg-blue-800/60 text-xs">
              <Sparkles className="h-3.5 w-3.5 mr-1 text-amber-300" />
              <span>Generate Konten Rekomendasi</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Snapshot quick badges */}
      <div className="relative z-10 mt-5 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
            <ArrowUpRight className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] text-blue-200">Naik Posisi</div>
            <div className="font-bold text-emerald-300">3 Keyword (+5 avg)</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/20 text-red-300">
            <ArrowDownRight className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] text-blue-200">Turun Minor</div>
            <div className="font-bold text-red-300">1 Keyword (-1 pos)</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300">
            <MousePointerClick className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] text-blue-200">Klik Organik Hari Ini</div>
            <div className="font-bold text-amber-300">+142 Klik (CTR 8.4%)</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] text-blue-200">Inquiry Baru</div>
            <div className="font-bold text-purple-200">4 WhatsApp Buyer</div>
          </div>
        </div>
      </div>
    </div>
  );
}
