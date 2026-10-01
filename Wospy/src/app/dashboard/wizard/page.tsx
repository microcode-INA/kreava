"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Wand2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Search,
  FileText,
  TrendingUp,
  Globe,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { SeoScoreGauge } from "@/components/dashboard/SeoScoreGauge";
import { Article } from "@/lib/types";

export default function WizardPage() {
  const router = useRouter();
  const { language, products, addArticle } = useStore();
  const t = useI18n(language);

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Wizard answers
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || "");
  const [selectedKeyword, setSelectedKeyword] = useState<string>("indonesian vanilla beans supplier");
  const [outlineApproved, setOutlineApproved] = useState(true);
  const [generatedSeoScore, setGeneratedSeoScore] = useState(95);
  const [createdArticleId, setCreatedArticleId] = useState<string | null>(null);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const handleNext = () => {
    if (currentStep === 4) {
      // Create article in store
      const cleanSlug = selectedKeyword.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const newArt: Article = {
        id: `wizard-art-${Date.now()}`,
        title: {
          id: `Panduan Memilih ${selectedProduct?.name.id || 'Produk Ekspor'} Standar Internasional`,
          en: `International Sourcing Guide: ${selectedProduct?.name.en || 'Export Product'}`,
        },
        slug: cleanSlug,
        excerpt: {
          id: `Panduan lengkap untuk pembeli internasional mencari supplier tangan pertama dari Indonesia.`,
          en: `Complete buyer guide for sourcing verified first-hand export commodities from Indonesia.`,
        },
        content: {
          id: `<h2>Mengapa Memilih ${selectedProduct?.name.id}?</h2>
<p>Pasar ekspor menuntut mutu terstandarisasi. Melalui produk <a href="/catalog/${selectedProduct?.slug}">${selectedProduct?.name.id}</a>, pembeli mendapatkan kepastian sertifikasi dan harga kompetitif.</p>
<h2>Spesifikasi & Uji Laboratorium</h2>
<p>Kualitas teruji dengan standar kementerian resmi <a href="https://kemendag.go.id" target="_blank">Kementerian RI</a>.</p>`,
          en: `<h2>Why Choose ${selectedProduct?.name.en}?</h2>
<p>Global trade requires strict compliance. Sourcing via our direct catalog <a href="/catalog/${selectedProduct?.slug}">${selectedProduct?.name.en}</a> guarantees authentic origin and competitive FOB terms.</p>`,
        },
        focusKeyword: selectedKeyword,
        secondaryKeywords: [`supplier ${selectedKeyword}`, `harga ${selectedKeyword}`],
        productId: selectedProduct?.id,
        productName: selectedProduct?.name.id,
        featuredImage: selectedProduct?.images[0] || "",
        imageAlt: `Panduan Kualitas Ekspor ${selectedProduct?.name.id}`,
        metaDescription: {
          id: `Panduan lengkap memilih ${selectedProduct?.name.id} kualitas ekspor standar internasional. Konsultasi langsung via WhatsApp.`,
          en: `Comprehensive guide on sourcing export quality ${selectedProduct?.name.en} from Indonesia. Direct WhatsApp inquiry.`,
        },
        status: "published",
        publishDate: new Date().toISOString().split("T")[0],
        views: 1,
        organicClicks: 0,
        averagePosition: 5.2,
        seoScore: 95,
        faqSchema: [
          {
            question: "Berapa minimum order quantity (MOQ)?",
            answer: `MOQ standar adalah ${selectedProduct?.minOrderQuantity}.`,
          },
        ],
        languageMode: "both",
        author: "Wospy Beginner Wizard",
        updatedAt: new Date().toISOString().split("T")[0],
      };

      addArticle(newArt);
      setCreatedArticleId(newArt.id);
    }

    setCurrentStep((prev) => Math.min(5, prev + 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Wizard Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 rounded-full bg-blue-100 dark:bg-blue-950/70 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
          <Wand2 className="h-3.5 w-3.5 text-blue-600" />
          <span>Wizard Panduan Pemula (5 Langkah Mudah)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Bangun Artikel SEO Pertama Anda
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Tidak perlu keahlian teknis SEO yang rumit. Ikuti langkah sederhana ini untuk menerbitkan artikel SEO berkualitas tinggi dalam &lt; 2 menit.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="grid grid-cols-5 gap-2 text-center text-xs">
        {[
          "1. Pilih Produk",
          "2. Kata Kunci",
          "3. Cek Outline",
          "4. AI Generator",
          "5. Siap Rank!",
        ].map((title, idx) => {
          const stepNum = idx + 1;
          const isDone = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;

          return (
            <div key={idx} className="space-y-1">
              <div
                className={`h-2 rounded-full transition-all ${
                  isDone
                    ? "bg-emerald-500"
                    : isCurrent
                    ? "bg-blue-600"
                    : "bg-slate-200 dark:bg-slate-800"
                }`}
              />
              <span
                className={`block text-[11px] font-medium truncate ${
                  isCurrent ? "font-bold text-blue-600 dark:text-blue-400" : "text-slate-400"
                }`}
              >
                {title}
              </span>
            </div>
          );
        })}
      </div>

      {/* STEP 1: PILIH PRODUK */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
              <span>Langkah 1: Pilih Produk Anda yang Ingin Dipromosikan</span>
            </CardTitle>
            <CardDescription className="text-xs">
              AI akan menghubungkan artikel dengan halaman produk ini agar pembaca bisa langsung memesan via WhatsApp.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {products.map((p) => (
              <label
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedProductId === p.id
                    ? "border-blue-600 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/40"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={p.images[0]}
                    alt={p.name.id}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {p.name.id}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {p.category} • HS: {p.hsCode}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="purple" className="text-[10px]">
                    {p.priceRange}
                  </Badge>
                  <input
                    type="radio"
                    name="product_radio"
                    checked={selectedProductId === p.id}
                    onChange={() => setSelectedProductId(p.id)}
                    className="h-4 w-4 text-blue-600"
                  />
                </div>
              </label>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end border-t border-slate-100 pt-4 dark:border-slate-800">
            <Button onClick={handleNext} variant="primary">
              <span>Lanjut ke Kata Kunci</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 2: PILIH KEYWORD AI */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              <span>Langkah 2: Pilih Kata Kunci yang Sering Dicari Buyer</span>
            </CardTitle>
            <CardDescription className="text-xs">
              AI telah memfilter kata kunci dengan persaingan rendah (mudah masuk halaman 1 Google).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                kw: "indonesian vanilla beans supplier",
                vol: "5,400/bln",
                diff: "35% (Mudah)",
                intent: "Transactional",
              },
              {
                kw: "visa umrah di bandung",
                vol: "3,600/bln",
                diff: "28% (Sangat Mudah)",
                intent: "Commercial",
              },
              {
                kw: "ekspor briket arang kelapa",
                vol: "4,200/bln",
                diff: "32% (Mudah)",
                intent: "Commercial",
              },
              {
                kw: "specialty aceh gayo green coffee beans",
                vol: "4,800/bln",
                diff: "42% (Sedang)",
                intent: "Transactional",
              },
            ].map((item, idx) => (
              <label
                key={idx}
                onClick={() => setSelectedKeyword(item.kw)}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedKeyword === item.kw
                    ? "border-blue-600 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/40"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-800"
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {item.kw}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>Pencarian: <strong>{item.vol}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-600 font-semibold">{item.diff}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="success" className="text-[10px]">
                    {item.intent}
                  </Badge>
                  <input
                    type="radio"
                    name="kw_radio"
                    checked={selectedKeyword === item.kw}
                    onChange={() => setSelectedKeyword(item.kw)}
                    className="h-4 w-4 text-blue-600"
                  />
                </div>
              </label>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            <Button variant="ghost" onClick={handlePrev} className="text-xs">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Kembali
            </Button>
            <Button onClick={handleNext} variant="primary">
              <span>Lanjut ke Review Kerangka</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 3: REVIEW OUTLINE */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>Langkah 3: Review Kerangka Artikel (AI Outline)</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Struktur judul bab (H2 & H3) yang disusun AI untuk menjawab niat pencarian calon buyer secara komprehensif.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5 text-xs">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">
                1. Mengapa Memilih {selectedProduct.name.id} Berkualitas Tinggi?
              </div>
              <div className="font-bold text-slate-900 dark:text-white">
                2. Spesifikasi Teknis & Standar Ekspor Internasional
              </div>
              <div className="font-bold text-slate-900 dark:text-white">
                3. Alur Minimum Order (MOQ) dan Pengiriman Port
              </div>
              <div className="font-bold text-slate-900 dark:text-white">
                4. Pertanyaan yang Sering Diajukan (FAQ Schema)
              </div>
              <div className="font-bold text-emerald-600">
                5. Call To Action: Hubungi Tim Penjualan via WhatsApp
              </div>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Struktur ini terbukti mereplikasi artikel viral 2000+ views Haramain Service.</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            <Button variant="ghost" onClick={handlePrev} className="text-xs">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Kembali
            </Button>
            <Button onClick={handleNext} variant="primary">
              <span>Mulai Generate AI Sekarang</span>
              <Sparkles className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 4: GENERASI & SKOR SEO */}
      {currentStep === 4 && (
        <Card className="text-center py-6 px-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">
              Langkah 4: Hasil Generasi AI & Evaluasi Skor SEO
            </CardTitle>
            <CardDescription className="text-xs">
              Artikel berhasil dibuat lengkap dalam Bahasa Indonesia dan English!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            <SeoScoreGauge score={generatedSeoScore} size="lg" />

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Kata Kunci:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedKeyword}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Produk Terkait:</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{selectedProduct.name.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimasi Panjang:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">1,450 Kata</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kepatuhan Algoritma Google:</span>
                <span className="text-emerald-600 font-bold">8 dari 8 Checklist Terpenuhi ✅</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            <Button variant="ghost" onClick={handlePrev} className="text-xs">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Kembali
            </Button>
            <Button onClick={handleNext} variant="primary" className="font-bold">
              <span>Publikasikan & Pantau di Rank Tracker</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 5: SELESAI & SUKSES */}
      {currentStep === 5 && (
        <Card className="border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/40 dark:bg-emerald-950/20 text-center py-10 px-6">
          <CardContent className="space-y-6 max-w-md mx-auto">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-xl">
              <Award className="h-10 w-10" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Selamat! Artikel Pertama Anda Telah Live!
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Artikel telah dipublikasikan ke katalog website Anda dengan dukungan multi-bahasa (ID/EN) dan langsung didaftarkan ke Rank Tracker Google Search Console.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <Link href={`/blog/${selectedKeyword.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} target="_blank">
                <Button variant="primary" className="w-full">
                  <span>Lihat Artikel Live di Web Publik</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/dashboard/analytics">
                <Button variant="outline" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-1.5 text-blue-600" />
                  Buka Rank Tracker
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full text-xs text-slate-500">
                  Kembali ke Dashboard Utama
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
