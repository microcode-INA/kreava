"use client";

import React from "react";
import Link from "next/link";
import {
  MousePointerClick,
  TrendingUp,
  Search,
  MessageSquare,
  Sparkles,
  Plus,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileEdit,
  Wand2,
} from "lucide-react";
import { DailySnapshotBanner } from "@/components/dashboard/DailySnapshotBanner";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RankMovementChart } from "@/components/dashboard/RankMovementChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { formatNumber } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const { language, articles, products, rankings, keywords } = useStore();
  const t = useI18n(language);

  // Compute stats
  const totalClicks = articles.reduce((acc, a) => acc + a.organicClicks, 0);
  const totalViews = articles.reduce((acc, a) => acc + a.views, 0);
  const totalInquiries = products.reduce((acc, p) => acc + p.inquiryCount, 0);

  return (
    <div className="space-y-8">
      {/* 1. Daily Snapshot Banner (PRD Feature) */}
      <DailySnapshotBanner />

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={t.metricTotalClicks}
          value={formatNumber(totalClicks)}
          change="+34.8%"
          isPositive={true}
          icon={MousePointerClick}
          description="Klik pencarian organik bulan ini"
          accentColor="blue"
        />
        <MetricCard
          title={t.metricAvgPosition}
          value="#1.8"
          change="+3 pos"
          isPositive={true}
          icon={TrendingUp}
          description="Rata-rata 14 keyword terlacak"
          accentColor="emerald"
        />
        <MetricCard
          title={t.metricRankingKeywords}
          value={keywords.length}
          change="+4 baru"
          isPositive={true}
          icon={Search}
          description="Keyword di Halaman 1 & 2 Google"
          accentColor="purple"
        />
        <MetricCard
          title={t.metricTotalInquiries}
          value={totalInquiries}
          change="+28%"
          isPositive={true}
          icon={MessageSquare}
          description="Leads WhatsApp & form RFQ"
          accentColor="amber"
        />
      </div>

      {/* 3. Quick Action Launchpad */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-sm">
            <Wand2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Baru memulai? Ikuti Wizard Pemula 5-Langkah
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Pilih produk → AI riset keyword → generate artikel SEO → publish dalam hitungan menit.
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link href="/dashboard/wizard">
            <Button size="sm" variant="primary">
              <span>Buka Wizard Pemula</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
          <Link href="/dashboard/articles/generate">
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              <span>{t.btnNewArticle}</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4. Main Data Grid: Traffic Chart & Ranking Movements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Search Console Chart */}
        <div className="lg:col-span-2 space-y-8">
          <RankMovementChart />

          {/* Ranking Position Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-bold">
                  Pergerakan Ranking Keyword Utama
                </CardTitle>
                <CardDescription className="text-xs">
                  Posisi live di Google SERP Indonesia & Internasional
                </CardDescription>
              </div>
              <Link href="/dashboard/analytics">
                <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                  Lihat Semua ({rankings.length}) →
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
                    <tr>
                      <th className="pb-3 font-semibold">Kata Kunci</th>
                      <th className="pb-3 font-semibold">Bahasa</th>
                      <th className="pb-3 font-semibold text-center">Posisi</th>
                      <th className="pb-3 font-semibold text-center">Perubahan</th>
                      <th className="pb-3 font-semibold text-right">Volume</th>
                      <th className="pb-3 font-semibold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {rankings.slice(0, 4).map((item) => {
                      const diff = item.previousRank - item.currentRank;
                      return (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                          <td className="py-3 font-medium text-slate-900 dark:text-slate-100">
                            {item.keyword}
                          </td>
                          <td className="py-3">
                            <Badge variant={item.language === "id" ? "default" : "purple"} className="text-[10px]">
                              {item.language === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
                            </Badge>
                          </td>
                          <td className="py-3 text-center">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold dark:bg-blue-950 dark:text-blue-300">
                              #{item.currentRank}
                            </span>
                          </td>
                          <td className="py-3 text-center">
                            {diff > 0 ? (
                              <span className="text-emerald-600 font-bold">+{diff} naik</span>
                            ) : diff < 0 ? (
                              <span className="text-red-500 font-bold">{diff} turun</span>
                            ) : (
                              <span className="text-slate-400">Tetap</span>
                            )}
                          </td>
                          <td className="py-3 text-right font-mono text-slate-600 dark:text-slate-300">
                            {formatNumber(item.searchVolume)}/bln
                          </td>
                          <td className="py-3 text-right">
                            <Link href={`/blog/${item.targetUrl.split("/").pop()}`} target="_blank">
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: Top Performing Articles & Case Study Box */}
        <div className="space-y-6">
          {/* Haramain Service Case Study Spotlight (From PRD Section 7) */}
          <Card className="border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="success" className="text-[10px]">
                  Studi Kasus Sukses PRD
                </Badge>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  2,450+ Views
                </span>
              </div>
              <CardTitle className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                Replikasi Formula Haramain Service
              </CardTitle>
              <CardDescription className="text-xs">
                Keyword long-tail spesifik <code className="bg-emerald-100 dark:bg-emerald-900 px-1 rounded text-emerald-800 dark:text-emerald-200 font-mono">visa-umrah-di-bandung</code> membuktikan traffic organik buyer yang siap beli tanpa iklan!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-1">
              <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-slate-900 text-xs space-y-1.5 border border-emerald-100 dark:border-emerald-900/50">
                <div className="flex justify-between text-slate-500">
                  <span>Posisi Google:</span>
                  <span className="font-bold text-emerald-600">#1 (Halaman 1)</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Intent Pencarian:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Komersial & Transaksional</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Skor SEO:</span>
                  <span className="font-bold text-emerald-600">96/100</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href="/blog/visa-umrah-di-bandung" target="_blank" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    Lihat Artikel
                  </Button>
                </Link>
                <Link href="/dashboard/articles/art-1/edit" className="flex-1">
                  <Button size="sm" variant="primary" className="w-full text-xs">
                    <FileEdit className="h-3.5 w-3.5 mr-1" />
                    Buka Editor
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Published Articles List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-bold">
                Artikel Terbaru
              </CardTitle>
              <Link href="/dashboard/articles">
                <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                  Semua ({articles.length}) →
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="rounded-lg border border-slate-100 p-3 hover:border-blue-200 transition-colors dark:border-slate-800 dark:hover:border-blue-900/50"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant={art.seoScore >= 90 ? "success" : "warning"} className="text-[10px]">
                      SEO {art.seoScore}/100
                    </Badge>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {art.views} views • {art.organicClicks} clicks
                    </span>
                  </div>
                  <h4 className="mt-1.5 text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                    {language === "en" ? art.title.en : art.title.id}
                  </h4>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono text-blue-600 dark:text-blue-400">
                      /{art.slug}
                    </span>
                    <Link href={`/dashboard/articles/${art.id}/edit`}>
                      <span className="font-semibold text-blue-600 hover:underline">
                        Edit & Checklist →
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
