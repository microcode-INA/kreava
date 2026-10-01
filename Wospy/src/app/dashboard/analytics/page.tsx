"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  MousePointerClick,
  Eye,
  Percent,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Mail,
  Download,
  Calendar,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RankMovementChart } from "@/components/dashboard/RankMovementChart";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { formatNumber } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

export default function AnalyticsRankTrackerPage() {
  const { language, rankings, articles } = useStore();
  const { toast } = useToast();
  const t = useI18n(language);

  const [filterLang, setFilterLang] = useState<string>("all");
  const [reportSent, setReportSent] = useState(false);
  const [emailFrequency, setEmailFrequency] = useState("weekly");
  const [recipientEmail, setRecipientEmail] = useState("admin@nusantara.id");

  const filteredRankings = rankings.filter(
    (r) => filterLang === "all" || r.language === filterLang
  );

  const handleSendEmailReport = () => {
    setReportSent(true);
    toast(
      "Laporan Email Terkirim!",
      `Ringkasan performa SEO mingguan telah dikirim ke ${recipientEmail}.`,
      "success"
    );
    setTimeout(() => setReportSent(false), 3000);
  };

  const handleExportCsv = () => {
    toast(
      "Ekspor CSV Siap",
      "File wospy_gsc_rankings.csv sedang diunduh.",
      "info"
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {t.navRankTracker}
            </h1>
            <Badge variant="success" className="text-xs">
              Google Search Console Connected
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pantau posisi kata kunci Anda di Google secara harian, metrik klik organik, CTR, dan bandingkan posisi terhadap kompetitor.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSendEmailReport}
            className="text-xs"
          >
            <Mail className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
            <span>{reportSent ? "✓ Laporan Terkirim!" : "Kirim Laporan Email"}</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => alert("Mengunduh data ranking Google (.csv)...")}
            className="text-xs"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            <span>Ekspor CSV</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase">
              <span>Total Klik Organik</span>
              <MousePointerClick className="h-4 w-4 text-blue-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              647
            </div>
            <div className="mt-1 flex items-center text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
              <span>+34.2% vs 7 hari lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase">
              <span>Total Impresi SERP</span>
              <Eye className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              6,510
            </div>
            <div className="mt-1 flex items-center text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
              <span>+48.1% vs 7 hari lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase">
              <span>Rata-rata CTR</span>
              <Percent className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              9.9%
            </div>
            <div className="mt-1 flex items-center text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
              <span>Diatas rata-rata industri (2.5%)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase">
              <span>Rata-rata Posisi SERP</span>
              <TrendingUp className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-2 text-2xl font-black text-blue-600 dark:text-blue-400">
              #1.8
            </div>
            <div className="mt-1 flex items-center text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
              <span>Top 3 Dominan di Google</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Graph Visualization */}
      <RankMovementChart />

      {/* Tabs Navigation for Rank Tracker, Competitor Watch, and Email Reports */}
      <Tabs defaultValue="rank-tracker">
        <TabsList className="mb-4">
          <TabsTrigger value="rank-tracker" className="text-xs">
            Pelacakan Posisi ({rankings.length})
          </TabsTrigger>
          <TabsTrigger value="competitor-watch" className="text-xs">
            Pantau Kompetitor (Competitor Watch)
          </TabsTrigger>
          <TabsTrigger value="email-report" className="text-xs">
            Otomasi Laporan Email
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Detailed Keyword Rankings Table */}
        <TabsContent value="rank-tracker">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold">
                  Pelacakan Posisi Kata Kunci (Rank Tracker)
                </CardTitle>
                <CardDescription className="text-xs">
                  Diupdate otomatis setiap hari pukul 06:00 WIB via Google Search Console API.
                </CardDescription>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400">Filter Bahasa:</span>
                <select
                  value={filterLang}
                  onChange={(e) => setFilterLang(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs dark:border-slate-800 dark:bg-slate-900"
                >
                  <option value="all">Semua Bahasa</option>
                  <option value="id">🇮🇩 Bahasa Indonesia</option>
                  <option value="en">🇬🇧 English</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-800 text-xs">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Kata Kunci Terlacak</th>
                      <th className="py-3 px-3 font-semibold">Target URL</th>
                      <th className="py-3 px-3 font-semibold text-center">Posisi Saat Ini</th>
                      <th className="py-3 px-3 font-semibold text-center">Posisi Kemarin</th>
                      <th className="py-3 px-3 font-semibold text-center">Perubahan</th>
                      <th className="py-3 px-3 font-semibold text-center">Best Rank</th>
                      <th className="py-3 px-3 font-semibold text-right">Volume</th>
                      <th className="py-3 px-4 font-semibold text-right">Terakhir Dicek</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredRankings.map((r) => {
                      const change = r.previousRank - r.currentRank;

                      return (
                        <tr key={r.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                            <div className="flex items-center space-x-2">
                              <span>{r.keyword}</span>
                              <Badge variant={r.language === "id" ? "default" : "purple"} className="text-[10px]">
                                {r.language.toUpperCase()}
                              </Badge>
                            </div>
                          </td>

                          <td className="py-3.5 px-3 font-mono text-xs text-blue-600 dark:text-blue-400 max-w-[200px] truncate">
                            <Link href={r.targetUrl} target="_blank" className="hover:underline flex items-center gap-1">
                              <span className="truncate">{r.targetUrl.replace("https://wospy.id", "")}</span>
                              <ExternalLink className="h-3 w-3 shrink-0" />
                            </Link>
                          </td>

                          <td className="py-3.5 px-3 text-center">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-800 font-black text-sm dark:bg-blue-950 dark:text-blue-300">
                              #{r.currentRank}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-center font-mono text-xs text-slate-500">
                            #{r.previousRank}
                          </td>

                          <td className="py-3.5 px-3 text-center">
                            {change > 0 ? (
                              <span className="inline-flex items-center text-xs font-bold text-emerald-600">
                                <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
                                +{change}
                              </span>
                            ) : change < 0 ? (
                              <span className="inline-flex items-center text-xs font-bold text-red-500">
                                <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" />
                                {change}
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400 font-mono">-</span>
                            )}
                          </td>

                          <td className="py-3.5 px-3 text-center font-mono text-xs font-semibold text-emerald-600">
                            #{r.bestRank}
                          </td>

                          <td className="py-3.5 px-3 text-right font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                            {formatNumber(r.searchVolume)}/bln
                          </td>

                          <td className="py-3.5 px-4 text-right text-xs text-slate-400">
                            {r.lastUpdated}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Competitor Watch (PRD Feature) */}
        <TabsContent value="competitor-watch">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold">
                  Pantau Ranking Kompetitor (Competitor Watch)
                </CardTitle>
                <CardDescription className="text-xs">
                  Perbandingan posisi ranking Anda vs domain kompetitor utama di kata kunci target.
                </CardDescription>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => toast("Tambah Domain Kompetitor", "Fitur pelacakan domain kompetitor aktif.", "info")}
                className="text-xs"
              >
                + Tambah Domain Kompetitor
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  kw: "visa umrah di bandung",
                  wospyRank: 1,
                  competitorDomain: "bandung-visaservice.com",
                  competitorRank: 5,
                  advantage: "+4 Posisi Unggul",
                  status: "Dominating Google #1",
                },
                {
                  kw: "indonesian vanilla beans supplier",
                  wospyRank: 2,
                  competitorDomain: "global-vanilla-export.com",
                  competitorRank: 8,
                  advantage: "+6 Posisi Unggul",
                  status: "Leading Competitor",
                },
                {
                  kw: "ekspor briket arang kelapa",
                  wospyRank: 3,
                  competitorDomain: "asia-briquettes.com",
                  competitorRank: 7,
                  advantage: "+4 Posisi Unggul",
                  status: "Top 3 Podium",
                },
                {
                  kw: "aceh gayo arabica coffee wholesale",
                  wospyRank: 4,
                  competitorDomain: "sumatra-roaster-supply.com",
                  competitorRank: 9,
                  advantage: "+5 Posisi Unggul",
                  status: "Overtaking Soon",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.kw}
                    </div>
                    <div className="text-xs text-slate-500">
                      Kompetitor: <span className="font-mono text-slate-700 dark:text-slate-300">{item.competitorDomain}</span> (Posisi #{item.competitorRank})
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-xs">
                    <div className="text-center">
                      <div className="text-slate-400">Posisi Anda:</div>
                      <div className="font-black text-emerald-600 text-lg">#{item.wospyRank}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-slate-400">Kompetitor:</div>
                      <div className="font-bold text-slate-500 text-lg">#{item.competitorRank}</div>
                    </div>
                    <Badge variant="success" className="text-xs">
                      {item.advantage}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Automated Email Reports (PRD Feature) */}
        <TabsContent value="email-report">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">
                Otomasi Laporan Performa Mingguan via Email
              </CardTitle>
              <CardDescription className="text-xs">
                Sistem mengirimkan ringkasan: keyword naik/turun, klik baru, dan rekomendasi optimasi langsung ke inbox Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Frekuensi Pengiriman:
                  </label>
                  <select
                    value={emailFrequency}
                    onChange={(e) => setEmailFrequency(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs dark:border-slate-700 dark:bg-slate-900"
                  >
                    <option value="daily">Harian (Setiap Pagi 07:00 WIB)</option>
                    <option value="weekly">Mingguan (Setiap Hari Senin)</option>
                    <option value="monthly">Bulanan (Tanggal 1)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Alamat Email Penerima:
                  </label>
                  <Input
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="mt-1 h-10 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Sample Email Preview Box */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 dark:border-blue-900/60 dark:bg-blue-950/20 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-blue-200 dark:border-blue-900 pb-2">
                  <span className="font-bold text-blue-900 dark:text-blue-300">
                    Pratinjau Subjek Email: [Wospy Weekly Report] 3 Keyword Naik ke Halaman 1 Google & +142 Klik Baru!
                  </span>
                  <Badge variant="purple" className="text-[10px]">
                    Preview Format
                  </Badge>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Halo Tim Nusantara Agro, berikut ringkasan performa organik minggu ini:
                  <br />• <strong>+647 Klik Organik Google</strong> (+34% dibanding minggu lalu).
                  <br />• <strong>Keyword "visa umrah di bandung"</strong> naik ke ranking #1 Google (studi kasus Haramain).
                  <br />• <strong>Inquiry Masuk:</strong> 4 calon buyer WhatsApp dari Jerman dan Australia.
                </p>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleSendEmailReport}
                  className="text-xs font-bold"
                >
                  <Mail className="h-3.5 w-3.5 mr-1.5" />
                  <span>Kirim Contoh Laporan ke Email Sekarang</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
