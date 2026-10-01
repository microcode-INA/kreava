"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Globe,
  Search,
  PenTool,
  ShoppingBag,
  Image as ImageIcon,
  Zap,
  BarChart3,
  Layers,
  ShieldCheck,
  Star,
  ExternalLink,
  ChevronRight,
  MessageCircle,
  Clock,
  Award,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";

export default function LandingPage() {
  const { language } = useStore();
  const t = useI18n(language);

  const [interactiveKeyword, setInteractiveKeyword] = useState("indonesian vanilla beans supplier");
  const [interactiveGenOutput, setInteractiveGenOutput] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulateClick = () => {
    setIsSimulating(true);
    setInteractiveGenOutput(null);
    setTimeout(() => {
      setIsSimulating(false);
      setInteractiveGenOutput(
        `Artikel 1,850 kata tergenerate! Judul: "Ultimate Sourcing Guide for ${interactiveKeyword} Grade A". Skor SEO: 96/100. FAQ Schema dan Alt-Text siap tayang.`
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-100 dark:border-slate-800">
          {/* Background glowing gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              <span>Platform SEO AI All-in-One untuk Eksportir & UMKM (ID/EN)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-none">
              Website SEO Praktis,{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Sekarang Pakai AI.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Otomatisasi seluruh pipeline SEO ekspor — dari riset kata kunci buyer internasional, generate artikel bilingual, optimasi gambar WebP, hingga katalog produk dan rank tracking Google Search Console.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/dashboard/wizard">
                <Button size="lg" variant="primary" className="h-12 px-8 text-base font-bold shadow-lg">
                  <Sparkles className="h-4 w-4 mr-2 text-amber-300" />
                  <span>{t.btnStartWizard}</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="h-12 px-6 text-sm font-semibold">
                  <span>Buka Dashboard Klien</span>
                </Button>
              </Link>

              <Link href="/catalog">
                <Button size="lg" variant="ghost" className="h-12 px-5 text-sm text-slate-600 dark:text-slate-300">
                  <Layers className="h-4 w-4 mr-2" />
                  <span>Lihat Demo Katalog</span>
                </Button>
              </Link>
            </div>

            {/* Live Interactive Hero Sandbox */}
            <div className="pt-10 max-w-3xl mx-auto text-left">
              <Card className="border-blue-200 dark:border-blue-900/60 shadow-xl overflow-hidden">
                <div className="bg-slate-900 text-slate-100 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs font-mono text-slate-400">
                      wospy-ai-generator.sh — One-Click SERP Ranker
                    </span>
                  </div>
                  <Badge variant="purple" className="text-[10px]">
                    Live Interactive Demo
                  </Badge>
                </div>

                <CardContent className="p-6 space-y-4 bg-slate-950 text-white font-mono text-xs">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <input
                        value={interactiveKeyword}
                        onChange={(e) => setInteractiveKeyword(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        placeholder="Ketik topik ekspor / produk Anda..."
                      />
                    </div>
                    <Button
                      onClick={handleSimulateClick}
                      disabled={isSimulating}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs px-5 h-10"
                    >
                      {isSimulating ? "AI Menulis..." : "Test Generate AI"}
                    </Button>
                  </div>

                  {/* Output Preview */}
                  {interactiveGenOutput ? (
                    <div className="rounded-lg bg-emerald-950/60 border border-emerald-800/80 p-3 text-emerald-300 space-y-2 animate-fadeIn">
                      <div className="flex items-center justify-between font-bold">
                        <span>✓ Selesai dalam 18 detik</span>
                        <span className="text-white font-sans text-[11px] bg-emerald-700 px-2 py-0.5 rounded">
                          Skor SEO 96/100
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                        {interactiveGenOutput}
                      </p>
                      <div className="pt-1">
                        <Link href="/dashboard/articles/generate">
                          <span className="text-blue-400 underline font-sans text-xs">
                            Buka di Generator Lengkap untuk Edit Kerangka & Tautan Produk →
                          </span>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-500 text-[11px] py-1 flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Coba ketik kata kunci apa saja lalu klik tombol biru di atas!</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* HARAMAIN SERVICE CASE STUDY SECTION (PRD Section 7 Spotlight) */}
        <section id="case-study" className="py-16 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge variant="success" className="text-xs">
                Studi Kasus Replikasi Sukses
              </Badge>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Bagaimana Artikel "Haramain Service" Menembus 2,000+ Views Organik
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Artikel referensi <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600 font-mono">visa-umrah-di-bandung</code> membuktikan traffic buyer yang siap membeli tanpa perlu biaya iklan berbayar (zero ads cost).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: Why it succeeded */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-200 bg-white dark:bg-slate-900 dark:border-emerald-900/60 p-6 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Faktor Kunci Sukses Traffic 2000+ Views:</span>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-500 font-bold">1.</span>
                      <span><strong>Keyword Spesifik + Long-Tail:</strong> "visa umrah di bandung" — persaingan rendah, mudah menduduki posisi #1 Google.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-500 font-bold">2.</span>
                      <span><strong>Niat Komersial Tinggi (Commercial Intent):</strong> Pencari bukan sekadar mencari info, melainkan calon jamaah yang siap mengurus dokumen.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-500 font-bold">3.</span>
                      <span><strong>Halaman Sekaligus Katalog Produk:</strong> Artikel menyatu dengan tombol pesan WhatsApp dan formulir konsultasi cepat.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-500 font-bold">4.</span>
                      <span><strong>Mobile-Friendly & Cepat:</strong> Gambar WebP terkompresi memastikan bounce rate sangat rendah.</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <Link href="/blog/visa-umrah-di-bandung" target="_blank">
                      <Button variant="primary" size="sm" className="text-xs">
                        <span>Lihat Implementasi Artikel Live Haramain Service</span>
                        <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right: Manual vs Wospy Automation Comparison Table */}
              <div className="rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  Perbandingan: Cara Manual vs Otomatisasi Wospy AI
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                      <tr>
                        <th className="pb-2 font-semibold">Aktivitas</th>
                        <th className="pb-2 font-semibold text-red-500">Manual (Lama)</th>
                        <th className="pb-2 font-semibold text-emerald-600">Otomatisasi Wospy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                        <td className="py-2.5 font-medium">Riset Kata Kunci</td>
                        <td className="py-2.5 text-slate-500">Berjam-jam riset manual</td>
                        <td className="py-2.5 font-bold text-emerald-600">AI Explorer &lt; 1 Menit</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium">Tulis Konten 1,500 kata</td>
                        <td className="py-2.5 text-slate-500">3 - 5 Jam menulis</td>
                        <td className="py-2.5 font-bold text-emerald-600">Generate dalam 30 Detik</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium">Cek Kepatuhan SEO</td>
                        <td className="py-2.5 text-slate-500">Tebak-tebakan tanpa skor</td>
                        <td className="py-2.5 font-bold text-emerald-600">Live SEO Gauge (0-100)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium">Optimasi Gambar</td>
                        <td className="py-2.5 text-slate-500">Resize satu per satu</td>
                        <td className="py-2.5 font-bold text-emerald-600">Auto WebP & Alt-Text AI</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium">Versi Bahasa Inggris</td>
                        <td className="py-2.5 text-slate-500">Sewa jasa penerjemah mahal</td>
                        <td className="py-2.5 font-bold text-emerald-600">Bilingual 1 Klik + Hreflang</td>
                      </tr>
                      <tr className="bg-blue-50/50 dark:bg-blue-950/30">
                        <td className="py-2.5 font-bold text-blue-900 dark:text-blue-300">Hasil Sebulan</td>
                        <td className="py-2.5 text-slate-500 font-semibold">Hanya 4-8 artikel</td>
                        <td className="py-2.5 font-bold text-emerald-600">30 - 100+ artikel SEO!</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE FEATURES GRID (PRD Section 3) */}
        <section id="features" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge variant="purple" className="text-xs">
                Fitur Inti Wospy v1.0
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                Seluruh Mesin SEO & Ekspor dalam Satu Dashboard
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Dirancang khusus untuk memecahkan hambatan UMKM dan eksportir yang ingin menembus halaman 1 Google tanpa repot setup teknis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center">
                    <Search className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    3.1 Riset Kata Kunci AI (Bilingual)
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Keyword Explorer menemukan volume pencarian buyer, persaingan KD%, deteksi niat beli (commercial/transactional), dan gap kompetitor.
                  </p>
                  <Link href="/dashboard/keywords" className="inline-flex items-center text-xs font-semibold text-blue-600 hover:underline pt-2">
                    Eksplorasi Kata Kunci →
                  </Link>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 flex items-center justify-center">
                    <PenTool className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    3.2 AI Article Generator & Outline
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Buat artikel 800 - 2,500 kata dalam 30 detik. Review kerangka bab sebelum generate penuh, integrasi link produk otomatis, dan bebas plagiasi.
                  </p>
                  <Link href="/dashboard/articles/generate" className="inline-flex items-center text-xs font-semibold text-blue-600 hover:underline pt-2">
                    Coba Generator AI →
                  </Link>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    3.4 Editor SEO + Live Checklist (0-100)
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Skor SEO real-time saat Anda menulis. Checklist otomatis memverifikasi kepadatan keyword, heading H2, internal link, dan meta tag.
                  </p>
                  <Link href="/dashboard/articles" className="inline-flex items-center text-xs font-semibold text-blue-600 hover:underline pt-2">
                    Buka Editor SEO →
                  </Link>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    3.6 Katalog Ekspor (Exportree Model)
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Kelola produk ekspor dengan HS Code, FOB port, MOQ, galeri multi-foto, dan tombol inquiry WhatsApp langsung ke buyer internasional.
                  </p>
                  <Link href="/dashboard/products" className="inline-flex items-center text-xs font-semibold text-blue-600 hover:underline pt-2">
                    Kelola Katalog →
                  </Link>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    3.5 Rank Tracker & GSC Analytics
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Pantau posisi keyword harian di Google, impresi pencarian, rasio klik (CTR), dan daily snapshot yang memberi tahu kata kunci mana yang naik.
                  </p>
                  <Link href="/dashboard/analytics" className="inline-flex items-center text-xs font-semibold text-blue-600 hover:underline pt-2">
                    Lihat Rank Tracker →
                  </Link>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400 flex items-center justify-center">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    3.3 Optimasi Gambar WebP + Alt-Text
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Kompresi otomatis hingga 90% bandwidth tanpa mengurangi kualitas, auto alt-text berbasis AI, dan disajikan melalui jaringan Edge CDN global.
                  </p>
                  <Link href="/dashboard/media" className="inline-flex items-center text-xs font-semibold text-blue-600 hover:underline pt-2">
                    Optimasi Media →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* COMPETITIVE MATRIX SECTION (PRD Section 9) */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge variant="purple" className="text-xs">
                Keunggulan Kompetitif
              </Badge>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Mengapa Memilih Wospy Dibanding Solusi Lain?
              </h2>
              <p className="text-sm text-slate-500">
                Wospy = Exportree + Jasper + Rank Tracker + Google Translate dalam 1 dashboard terpadu.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-4 px-5 font-semibold">Platform</th>
                    <th className="py-4 px-4 font-semibold">Kelemahan Solusi Lain</th>
                    <th className="py-4 px-5 font-semibold text-blue-600 dark:text-blue-400">Keunggulan Wospy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="py-3.5 px-5 font-bold">WordPress + Plugin SEO</td>
                    <td className="py-3.5 px-4 text-red-500">❌ Ribet setup plugin, hosting lambat, rawan crash</td>
                    <td className="py-3.5 px-5 font-bold text-emerald-600">✅ Instan tanpa setup teknis, cloud CDN super cepat</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 font-bold">Jasper / Writesonic</td>
                    <td className="py-3.5 px-4 text-red-500">❌ Hanya generate teks mentah tanpa website</td>
                    <td className="py-3.5 px-5 font-bold text-emerald-600">✅ Generate + Auto Publish + Rank Tracking live</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 font-bold">Shopify</td>
                    <td className="py-3.5 px-4 text-red-500">❌ Fokus toko ritel, biaya mahal, SEO manual</td>
                    <td className="py-3.5 px-5 font-bold text-emerald-600">✅ Katalog ekspor B2B + WhatsApp + AI SEO terintegrasi</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 font-bold">Exportree.id</td>
                    <td className="py-3.5 px-4 text-red-500">❌ Hanya katalog statis tanpa AI generator</td>
                    <td className="py-3.5 px-5 font-bold text-emerald-600">✅ Katalog + Otomasi Konten + Multi-Bahasa ID/EN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PRICING PLANS SECTION (PRD Section 6) */}
        <section id="pricing" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge variant="purple" className="text-xs">
                Investasi Terjangkau
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                Pilih Paket Sesuai Skala Bisnis Anda
              </h2>
              <p className="text-sm text-slate-500">
                Mulai dari paket Starter untuk UMKM hingga Enterprise untuk agensi dan eksportir skala besar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Plan 1: Starter */}
              <Card className="rounded-2xl flex flex-col justify-between hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">Starter</h3>
                    <p className="text-xs text-slate-500 mt-1">Cocok untuk UMKM pemula</p>
                    <div className="mt-4 text-3xl font-black text-slate-900 dark:text-white">
                      Rp 149K <span className="text-xs font-normal text-slate-500">/ bulan</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>1 Website Katalog</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>10 Artikel AI / bulan</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Hingga 50 Produk Ekspor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>SEO Dasar & Checklist</span>
                    </li>
                  </ul>
                </CardContent>

                <div className="p-6 pt-0">
                  <Link href="/dashboard/wizard">
                    <Button variant="outline" className="w-full text-xs">
                      Pilih Paket Starter
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Plan 2: Growth (Popular) */}
              <Card className="rounded-2xl border-2 border-blue-600 flex flex-col justify-between shadow-xl relative scale-105 z-10 bg-white dark:bg-slate-900">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Paling Banyak Dipilih
                </div>

                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">Growth</h3>
                    <p className="text-xs text-slate-500 mt-1">Untuk eksportir aktif & UKM scale-up</p>
                    <div className="mt-4 text-3xl font-black text-blue-600 dark:text-blue-400">
                      Rp 349K <span className="text-xs font-normal text-slate-500">/ bulan</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span><strong>3 Website Katalog</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span><strong>50 Artikel AI / bulan</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>500 Produk Ekspor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Rank Tracker Google Search Console</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Optimasi Gambar WebP Lossless</span>
                    </li>
                  </ul>
                </CardContent>

                <div className="p-6 pt-0">
                  <Link href="/dashboard/wizard">
                    <Button variant="primary" className="w-full text-xs font-bold shadow-md">
                      Mulai 14 Hari Uji Coba Gratis
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Plan 3: Pro */}
              <Card className="rounded-2xl flex flex-col justify-between hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">Pro</h3>
                    <p className="text-xs text-slate-500 mt-1">Untuk agensi SEO & eksportir multinasional</p>
                    <div className="mt-4 text-3xl font-black text-slate-900 dark:text-white">
                      Rp 699K <span className="text-xs font-normal text-slate-500">/ bulan</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>10 Website Katalog</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span><strong>Unlimited Artikel AI</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Unlimited Produk</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Full Multi-Bahasa (Hreflang otomatis)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Akses API Publik & White-Label</span>
                    </li>
                  </ul>
                </CardContent>

                <div className="p-6 pt-0">
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full text-xs">
                      Pilih Paket Pro
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* BOTTOM FINAL CALL TO ACTION */}
        <section className="py-16 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Bikin Website, Tulis Artikel, Naik ke Google — dalam Satu Klik.
            </h2>
            <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
              Bergabunglah bersama puluhan eksportir dan pemilik bisnis Indonesia yang menaikkan traffic organik pembeli internasional dengan Wospy AI.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/dashboard/wizard">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 shadow-xl">
                  <span>Mulai Wizard 5-Langkah Sekarang</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="/catalog">
                <Button size="lg" variant="outline" className="border-blue-300 text-white hover:bg-white/10">
                  Jelajahi Contoh Katalog
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
