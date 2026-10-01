"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  PenTool,
  CheckCircle2,
  ListOrdered,
  Plus,
  Trash2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Languages,
  BookOpen,
  FileCheck,
  Bot,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { ArticleOutlineItem, Article } from "@/lib/types";

function ArticleGeneratorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, products, addArticle } = useStore();
  const t = useI18n(language);

  // Form states
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [targetProduct, setTargetProduct] = useState<string>(products[0]?.id || "");
  const [targetLanguage, setTargetLanguage] = useState<"id" | "en" | "both">("both");
  const [tone, setTone] = useState<"Professional" | "Friendly" | "Persuasive" | "Educational">("Professional");
  const [wordCount, setWordCount] = useState<number>(1500);

  // Wizard step: 1 = Config, 2 = Outline Review, 3 = Generating, 4 = Complete
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Outline items state
  const [outline, setOutline] = useState<ArticleOutlineItem[]>([
    {
      id: "out-1",
      type: "h2",
      title: "Mengapa Memilih Produk Ekspor Kualitas Standar Internasional?",
      points: ["Latar belakang pasar global", "Standar kualitas & sertifikasi"],
    },
    {
      id: "out-2",
      type: "h2",
      title: "Spesifikasi Utama & Keunggulan Produk",
      points: ["Kandungan kemurnian & mutu", "Perbandingan dengan kompetitor regional"],
    },
    {
      id: "out-3",
      type: "h2",
      title: "Panduan Pemesanan, MOQ & Pengiriman Internasional",
      points: ["Syarat minimum pemesanan", "Pengemasan standar ekspor & port keberangkatan"],
    },
    {
      id: "out-4",
      type: "faq",
      title: "Pertanyaan Umum (FAQ) Calon Buyer Internasional",
      points: ["Berapa lama lead time produksi?", "Apakah tersedia pengujian sampel lab?"],
    },
    {
      id: "out-5",
      type: "cta",
      title: "Hubungi Tim Ekspor Kami untuk Penawaran Harga Spesial (RFQ)",
    },
  ]);

  // Generation simulation progress
  const [genProgress, setGenProgress] = useState(0);
  const [currentGenTask, setCurrentGenTask] = useState("");
  const [generatedArticleId, setGeneratedArticleId] = useState<string | null>(null);

  // Set keyword from query param if provided
  useEffect(() => {
    const qKw = searchParams.get("keyword");
    if (qKw) {
      setKeyword(qKw);
    }
  }, [searchParams]);

  // Handle generating outline
  const handleGenerateOutline = () => {
    if (!keyword.trim()) return;

    // Custom outline depending on keyword
    const selectedProdObj = products.find((p) => p.id === targetProduct);
    const prodName = selectedProdObj ? selectedProdObj.name.id : "Produk Ekspor Unggulan";

    setOutline([
      {
        id: "out-1",
        type: "h2",
        title: `Panduan Lengkap Memilih ${keyword} Berkualitas Tinggi`,
        points: ["Kebutuhan pasar & tren terbaru", "Risiko memilih supplier yang salah"],
      },
      {
        id: "out-2",
        type: "h2",
        title: `Spesifikasi Standar Ekspor: Mengapa ${prodName} Menjadi Pilihan Terbaik`,
        points: ["Karakteristik fisik & uji laboratorium", "Sertifikasi resmi & standar internasional"],
      },
      {
        id: "out-3",
        type: "h2",
        title: "Perhitungan Biaya, Minimum Order (MOQ), dan Pengiriman",
        points: ["Estimasi harga per satuan / ton", "Incoterms FOB & dokumentasi ekspor"],
      },
      {
        id: "out-4",
        type: "faq",
        title: "FAQ: Pertanyaan yang Sering Diajukan Seputar Produk Ini",
        points: ["Berapa hari proses pengiriman dokumen?", "Apakah melayani private label / OEM?"],
      },
      {
        id: "out-5",
        type: "cta",
        title: `Konsultasi & Pemesanan ${prodName} Langsung dari Supplier Resmi`,
      },
    ]);

    setStep(2);
  };

  // Add outline item
  const handleAddOutlineSection = () => {
    const newSection: ArticleOutlineItem = {
      id: `out-${Date.now()}`,
      type: "h2",
      title: "Bagian Tambahan Baru (Klik untuk edit)",
      points: ["Poin bahasan 1", "Poin bahasan 2"],
    };
    setOutline([...outline, newSection]);
  };

  const handleRemoveOutlineSection = (id: string) => {
    setOutline(outline.filter((o) => o.id !== id));
  };

  const handleUpdateOutlineTitle = (id: string, newTitle: string) => {
    setOutline(outline.map((o) => (o.id === id ? { ...o, title: newTitle } : o)));
  };

  // Handle Full Generation Simulation
  const handleStartFullGeneration = () => {
    setStep(3);
    setGenProgress(10);
    setCurrentGenTask("Menganalisis Search Intent & Tren Google SERP...");

    const selectedProd = products.find((p) => p.id === targetProduct);
    const cleanSlug = keyword
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");

    setTimeout(() => {
      setGenProgress(35);
      setCurrentGenTask("Membuat Title Tag SEO, Meta Deskripsi & Struktur H2-H4...");
    }, 900);

    setTimeout(() => {
      setGenProgress(65);
      setCurrentGenTask("Mengintegrasikan Tautan Internal ke Katalog Produk Terkait...");
    }, 1800);

    setTimeout(() => {
      setGenProgress(85);
      setCurrentGenTask("Menyusun Schema FAQ & Optimasi Alt-Text Gambar...");
    }, 2600);

    setTimeout(() => {
      setGenProgress(100);
      setCurrentGenTask("Pemeriksaan Plagiarisme: 100% Unik & Orisinal!");

      // Create new article entity
      const newArticle: Article = {
        id: `art-${Date.now()}`,
        title: {
          id: `Panduan Lengkap & Rekomendasi ${keyword} Kualitas Terbaik 2026`,
          en: `Complete Guide & Sourcing Review: Best Quality ${keyword} 2026`,
        },
        slug: cleanSlug || "artikel-seo-baru",
        excerpt: {
          id: `Ulasan mendalam seputar ${keyword}, standar kualitas, estimasi harga pasaran, dan cara pesan langsung dari supplier tangan pertama di Indonesia.`,
          en: `Comprehensive export and sourcing guide about ${keyword}, quality benchmarks, pricing analysis, and verified Indonesian direct suppliers.`,
        },
        content: {
          id: `<h2>Mengapa Memilih ${keyword} dengan Standar Kualitas Internasional?</h2>
<p>Pasar modern kini menuntut kepatuhan ketat terhadap spesifikasi dan keaslian produk. Memahami karakteristik <strong>${keyword}</strong> sangat krusial bagi calon pembeli maupun importir agar mendapatkan nilai investasi terbaik.</p>
<p>Untuk produk teruji dengan dokumentasi lengkap, silakan kunjungi katalog resmi kami: <a href="/catalog/${selectedProd?.slug || 'katalog'}">${selectedProd?.name.id || 'Lihat Produk Terkait'}</a>.</p>

<h2>Spesifikasi Utama & Keunggulan yang Perlu Diperhatikan</h2>
<p>Saat mengevaluasi kualitas, ada beberapa parameter kritis yang tidak boleh dilewatkan:</p>
<ul>
  <li><strong>Konsistensi Mutu:</strong> Proses kontrol mutu bertingkat dari bahan mentah hingga pengemasan akhir.</li>
  <li><strong>Legalitas & Sertifikasi:</strong> Memenuhi standar instansi resmi seperti <a href="https://kemendag.go.id" target="_blank">Kementerian RI</a>.</li>
  <li><strong>Efisiensi Harga:</strong> Hubungan langsung dengan produsen tanpa perantara berlapis.</li>
</ul>

<h2>Cara Pemesanan & Alur Konsultasi Cepat</h2>
<p>Dapatkan penawaran harga terbaik dan sampel produk dengan menghubungi representatif kami melalui layanan resmi.</p>`,
          en: `<h2>Why Sourcing Premium ${keyword} from Indonesia Matters?</h2>
<p>International buyers require consistent specifications, transparent traceability, and compliance with global import standards. Sourcing certified <strong>${keyword}</strong> directly from vetted producers ensures competitive pricing and unmatched freshness.</p>
<p>Explore full technical specs on our verified catalog: <a href="/catalog/${selectedProd?.slug || 'catalog'}">${selectedProd?.name.en || 'Verified Export Product'}</a>.</p>`,
        },
        focusKeyword: keyword,
        secondaryKeywords: [`supplier ${keyword}`, `harga ${keyword} terbaru`, `cara pesan ${keyword}`],
        productId: selectedProd?.id,
        productName: selectedProd?.name.id,
        featuredImage: selectedProd?.images[0] || "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
        imageAlt: `Panduan Rekomendasi ${keyword} Kualitas Ekspor Terbaik`,
        metaDescription: {
          id: `Panduan lengkap ${keyword} kualitas terbaik 2026. Pelajari spesifikasi, standar ekspor, harga pasaran, dan cara konsultasi via WhatsApp resmi di sini.`,
          en: `Complete guide to ${keyword} 2026. Discover export standards, lab testing, direct factory pricing, and quick RFQ ordering assistance.`,
        },
        status: "published",
        publishDate: new Date().toISOString().split("T")[0],
        views: 1,
        organicClicks: 0,
        averagePosition: 8.5,
        seoScore: 94,
        faqSchema: [
          {
            question: `Apakah melayani pemesanan sampel untuk ${keyword}?`,
            answer: "Ya, kami menyediakan sampel untuk pengujian laboratorium calon pembeli.",
          },
          {
            question: "Berapa lama masa pengiriman (lead time)?",
            answer: "Waktu produksi standar berkisar 7-14 hari kerja tergantung kuantitas pemesanan.",
          },
        ],
        languageMode: targetLanguage,
        author: "AI Content Engine Wospy",
        updatedAt: new Date().toISOString().split("T")[0],
      };

      addArticle(newArticle);
      setGeneratedArticleId(newArticle.id);
      setStep(4);
    }, 3500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Title */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {t.navArticleGen}
          </h1>
          <Badge variant="purple" className="text-xs">
            Multi-Language AI (ID/EN)
          </Badge>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Hasilkan artikel SEO 800 - 2500 kata dalam 30 detik yang kontekstual dengan produk katalog Anda.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800 text-xs">
        <div className={`flex items-center space-x-2 ${step >= 1 ? "font-bold text-blue-600" : "text-slate-400"}`}>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            1
          </span>
          <span>Konfigurasi & Produk</span>
        </div>
        <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-800" />
        <div className={`flex items-center space-x-2 ${step >= 2 ? "font-bold text-blue-600" : "text-slate-400"}`}>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            2
          </span>
          <span>Review AI Outline</span>
        </div>
        <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-800" />
        <div className={`flex items-center space-x-2 ${step >= 3 ? "font-bold text-blue-600" : "text-slate-400"}`}>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            3
          </span>
          <span>Generate Artikel Penuh</span>
        </div>
      </div>

      {/* STEP 1: CONFIGURATION */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Langkah 1: Tentukan Kata Kunci & Target Produk
            </CardTitle>
            <CardDescription className="text-xs">
              AI akan "membaca" spesifikasi produk katalog Anda agar artikel yang dihasilkan relevan, meyakinkan buyer, dan memiliki tautan internal otomatis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Target Keyword */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Kata Kunci Utama (Focus Keyword) <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Contoh: 'visa umrah di bandung' atau 'indonesian vanilla beans supplier'..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="h-11 text-sm font-medium"
              />
              <p className="text-[11px] text-slate-500">
                Tip: Gunakan kata kunci long-tail yang spesifik untuk persaingan ranking lebih mudah.
              </p>
            </div>

            {/* Target Product (Context-aware) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Hubungkan dengan Produk Katalog (Context-Aware)
              </label>
              <select
                value={targetProduct}
                onChange={(e) => setTargetProduct(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name.id} ({p.category})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500">
                AI akan menyisipkan tautan langsung ke halaman pemesanan produk ini di dalam artikel.
              </p>
            </div>

            {/* Language & Tone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Bahasa Artikel
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant={targetLanguage === "id" ? "primary" : "secondary"}
                    size="sm"
                    className="text-xs"
                    onClick={() => setTargetLanguage("id")}
                  >
                    🇮🇩 ID Saja
                  </Button>
                  <Button
                    type="button"
                    variant={targetLanguage === "en" ? "primary" : "secondary"}
                    size="sm"
                    className="text-xs"
                    onClick={() => setTargetLanguage("en")}
                  >
                    🇬🇧 EN Saja
                  </Button>
                  <Button
                    type="button"
                    variant={targetLanguage === "both" ? "primary" : "secondary"}
                    size="sm"
                    className="text-xs"
                    onClick={() => setTargetLanguage("both")}
                  >
                    🌐 Keduanya (Dual)
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Gaya Bahasa (Tone of Voice)
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as any)}
                  className="h-9 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  <option value="Professional">Professional & Authoritative (Disarankan untuk Ekspor)</option>
                  <option value="Friendly">Friendly & Personal (Cocok untuk UMKM)</option>
                  <option value="Persuasive">Persuasive (Fokus Konversi Penjualan)</option>
                  <option value="Educational">Educational (Informatif & Tutorial)</option>
                </select>
              </div>
            </div>

            {/* Word Count Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Target Panjang Konten:</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  {wordCount} Kata (Standar Rekomendasi SEO)
                </span>
              </div>
              <input
                type="range"
                min={800}
                max={2500}
                step={100}
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>800 kata (Ringkas)</span>
                <span>1,500 kata (Ideal)</span>
                <span>2,500 kata (Pilar Konten Komprehensif)</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t border-slate-100 pt-4 dark:border-slate-800">
            <Button
              onClick={handleGenerateOutline}
              disabled={!keyword.trim()}
              variant="primary"
              className="px-6"
            >
              <span>Lanjut ke Review AI Outline</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 2: REVIEW & EDIT OUTLINE */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">
                  Langkah 2: Review & Edit Kerangka Artikel (AI Outline)
                </CardTitle>
                <CardDescription className="text-xs">
                  AI telah merancang struktur hierarki heading (H2, H3, FAQ). Anda dapat menambah, mengubah, atau menghapus bagian sebelum artikel penuh digenerate.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddOutlineSection}
                className="text-xs"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Tambah Heading
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {outline.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-900/50"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300 shrink-0">
                  {idx + 1}
                </span>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.type === "faq" ? "warning" : item.type === "cta" ? "success" : "default"} className="text-[10px]">
                      {item.type.toUpperCase()}
                    </Badge>
                    <Input
                      value={item.title}
                      onChange={(e) => handleUpdateOutlineTitle(item.id, e.target.value)}
                      className="h-8 text-xs font-semibold bg-white dark:bg-slate-900"
                    />
                  </div>

                  {item.points && (
                    <div className="pl-2 space-y-1 text-[11px] text-slate-500">
                      {item.points.map((p, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleRemoveOutlineSection(item.id)}
                  className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                  title="Hapus section"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            <Button variant="ghost" onClick={() => setStep(1)} className="text-xs">
              ← Kembali ke Pengaturan
            </Button>

            <Button
              onClick={handleStartFullGeneration}
              variant="primary"
              className="px-6 font-bold"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Generate Full Article (30 Detik)</span>
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 3: GENERATING STREAMING SIMULATION */}
      {step === 3 && (
        <Card className="text-center py-12 px-6">
          <CardContent className="space-y-6 max-w-md mx-auto">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl animate-bounce">
              <Bot className="h-10 w-10" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Wospy AI Sedang Menulis Artikel Anda...
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                {currentGenTask}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Progress Engine</span>
                <span>{genProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${genProgress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 text-xs text-slate-500 pt-4">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Zero Plagiarism Check</span>
              </span>
              <span className="flex items-center gap-1">
                <FileCheck className="h-4 w-4 text-blue-500" />
                <span>SEO Structure Verified</span>
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 4: GENERATION COMPLETE */}
      {step === 4 && (
        <Card className="border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/40 dark:bg-emerald-950/20 text-center py-10 px-6">
          <CardContent className="space-y-6 max-w-md mx-auto">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-300 shadow-sm">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Artikel SEO Berhasil Dibuat!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Artikel lengkap ~{wordCount} kata dengan live SEO score 94/100, FAQ schema, dan tautan produk katalog telah siap.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-white p-4 dark:border-emerald-900 dark:bg-slate-900 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Kata Kunci:</span>
                <span className="font-bold text-slate-900 dark:text-white">{keyword}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Skor SEO Live:</span>
                <span className="font-bold text-emerald-600">94/100 (Sangat Siap Rank)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bilingual:</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">Bahasa Indonesia & English Ready</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/dashboard/articles/${generatedArticleId}/edit`} className="flex-1">
                <Button variant="primary" className="w-full">
                  <span>Buka di SEO Editor & Checklist</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/dashboard/articles" className="flex-1">
                <Button variant="outline" className="w-full">
                  Lihat Daftar Artikel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function ArticleGeneratorPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-96 items-center justify-center text-xs text-slate-500">
          Memuat AI Generator...
        </div>
      }
    >
      <ArticleGeneratorContent />
    </React.Suspense>
  );
}
