"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  Eye,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowLeft,
  Calendar,
  Globe,
  Link2,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Bold,
  Italic,
  List,
  Quote,
  Smartphone,
  Monitor,
  History,
  Send,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { SeoScoreGauge } from "@/components/dashboard/SeoScoreGauge";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { analyzeSeoContent } from "@/lib/seo-engine";
import { Article } from "@/lib/types";

export default function ArticleEditorPage() {
  const params = useParams();
  const router = useRouter();
  const { language, articles, updateArticle, products } = useStore();
  const t = useI18n(language);

  const articleId = params?.id as string;
  const currentArticle = articles.find((a) => a.id === articleId) || articles[0];

  // Editor form state
  const [activeLangTab, setActiveLangTab] = useState<"id" | "en">("id");
  const [title, setTitle] = useState(currentArticle?.title[activeLangTab] || "");
  const [slug, setSlug] = useState(currentArticle?.slug || "");
  const [focusKeyword, setFocusKeyword] = useState(currentArticle?.focusKeyword || "");
  const [metaDescription, setMetaDescription] = useState(currentArticle?.metaDescription[activeLangTab] || "");
  const [content, setContent] = useState(currentArticle?.content[activeLangTab] || "");
  const [featuredImage, setFeaturedImage] = useState(currentArticle?.featuredImage || "");
  const [imageAlt, setImageAlt] = useState(currentArticle?.imageAlt || "");

  // Modal states
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("2026-10-15T09:00");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Sync state when active language changes
  useEffect(() => {
    if (currentArticle) {
      setTitle(currentArticle.title[activeLangTab] || "");
      setMetaDescription(currentArticle.metaDescription[activeLangTab] || "");
      setContent(currentArticle.content[activeLangTab] || "");
    }
  }, [activeLangTab, currentArticle]);

  // Live SEO Analysis recalculates dynamically
  const seoResult = useMemo(() => {
    return analyzeSeoContent({
      title,
      metaDescription,
      content,
      focusKeyword,
      slug,
      featuredImage,
      imageAlt,
    });
  }, [title, metaDescription, content, focusKeyword, slug, featuredImage, imageAlt]);

  // Word count calculation
  const wordCount = useMemo(() => {
    return content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  }, [content]);

  // Save handler
  const handleSave = () => {
    if (!currentArticle) return;

    const updated: Article = {
      ...currentArticle,
      title: {
        ...currentArticle.title,
        [activeLangTab]: title,
      },
      slug,
      focusKeyword,
      metaDescription: {
        ...currentArticle.metaDescription,
        [activeLangTab]: metaDescription,
      },
      content: {
        ...currentArticle.content,
        [activeLangTab]: content,
      },
      featuredImage,
      imageAlt,
      seoScore: seoResult.overallScore,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    updateArticle(updated);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 2500);
  };

  // Helper toolbar actions
  const insertText = (before: string, after: string = "") => {
    setContent((prev) => prev + `\n${before}${after}`);
  };

  if (!currentArticle) {
    return (
      <div className="p-8 text-center">
        <p>Artikel tidak ditemukan.</p>
        <Link href="/dashboard/articles">
          <Button variant="outline" className="mt-4">
            Kembali ke Daftar Artikel
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard/articles">
            <Button variant="ghost" size="sm" className="h-9 px-2 text-slate-500">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Daftar Artikel</span>
            </Button>
          </Link>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="text-xs">
              Live SEO Editor
            </Badge>
            {saveSuccessMsg && (
              <span className="text-xs font-semibold text-emerald-600 animate-pulse">
                ✓ Tersimpan!
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* Language Tab Switcher */}
          <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-800 dark:bg-slate-900">
            <button
              onClick={() => setActiveLangTab("id")}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                activeLangTab === "id"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              🇮🇩 Versi ID
            </button>
            <button
              onClick={() => setActiveLangTab("en")}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                activeLangTab === "en"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              🇬🇧 Versi EN
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewOpen(true)}
            className="text-xs"
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            <span>Preview</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setScheduleModalOpen(true)}
            className="text-xs"
          >
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>Jadwalkan</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            className="text-xs font-bold"
          >
            <Save className="h-3.5 w-3.5 mr-1" />
            <span>Simpan Perubahan</span>
          </Button>
        </div>
      </div>

      {/* Main Dual-Pane: Editor on Left, Live SEO Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Editor Fields */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title & Slug */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Judul Artikel ({activeLangTab.toUpperCase()})</span>
                  <span className={`text-[11px] ${title.length > 60 ? "text-amber-500" : "text-slate-400"}`}>
                    {title.length} karakter (Ideal: 50-60)
                  </span>
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 font-bold text-base h-11"
                  placeholder="Masukkan judul artikel yang memikat..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Kata Kunci Utama (Focus Keyword)
                  </label>
                  <Input
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                    className="mt-1 h-9 text-xs font-medium"
                    placeholder="misal: visa umrah di bandung"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    URL Slug
                  </label>
                  <div className="mt-1 flex rounded-lg border border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900 text-xs">
                    <span className="px-2.5 py-2 text-slate-400">/blog/</span>
                    <input
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full bg-transparent pr-2 focus:outline-none text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Meta Deskripsi Google SERP</span>
                  <span
                    className={`text-[11px] font-mono ${
                      metaDescription.length >= 140 && metaDescription.length <= 165
                        ? "text-emerald-600 font-bold"
                        : "text-amber-500"
                    }`}
                  >
                    {metaDescription.length}/160 karakter
                  </span>
                </label>
                <Textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="mt-1 text-xs min-h-[60px]"
                  placeholder="Deskripsi singkat yang muncul di halaman hasil pencarian Google..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Rich Content Editor */}
          <Card>
            {/* Formatting Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50/80 p-2 dark:border-slate-800 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => insertText("<h2>", "</h2>")}
                className="rounded p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold"
                title="Heading 2"
              >
                <Heading1 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => insertText("<h3>", "</h3>")}
                className="rounded p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold"
                title="Heading 3"
              >
                <Heading2 className="h-4 w-4" />
              </button>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
              <button
                type="button"
                onClick={() => insertText("<strong>", "</strong>")}
                className="rounded p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold"
                title="Tebal (Bold)"
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => insertText("<em>", "</em>")}
                className="rounded p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs"
                title="Miring (Italic)"
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => insertText("<ul>\n  <li>", "</li>\n</ul>")}
                className="rounded p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs"
                title="Daftar (List)"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => insertText("<blockquote>", "</blockquote>")}
                className="rounded p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs"
                title="Kutipan (Quote)"
              >
                <Quote className="h-4 w-4" />
              </button>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
              <button
                type="button"
                onClick={() => insertText(`<a href="/catalog/${products[0]?.slug || 'produk'}">`, "</a>")}
                className="rounded px-2 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-950 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold flex items-center gap-1"
                title="Sisipkan link produk katalog"
              >
                <Link2 className="h-3.5 w-3.5" />
                <span>+ Internal Link Produk</span>
              </button>
              <button
                type="button"
                onClick={() => insertText(`<a href="https://kemendag.go.id" target="_blank">`, "</a>")}
                className="rounded px-2 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 text-xs flex items-center gap-1"
                title="Sisipkan link otoritas eksternal"
              >
                <span>+ External Authority Link</span>
              </button>

              <div className="ml-auto text-xs font-mono text-slate-400">
                {wordCount} Kata
              </div>
            </div>

            <CardContent className="p-4">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={18}
                className="font-mono text-sm leading-relaxed border-0 shadow-none focus-visible:ring-0 p-2"
                placeholder="Tulis atau edit konten artikel di sini (HTML / Markdown)..."
              />
            </CardContent>
          </Card>

          {/* Media & Alt Text Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-blue-600" />
                <span>Gambar Utama (Featured Image) & Auto Alt-Text</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500">URL Gambar</label>
                  <Input
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="mt-1 h-9 text-xs"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Alt-Text SEO</label>
                  <Input
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    className="mt-1 h-9 text-xs"
                    placeholder="Deskripsi gambar mengandung kata kunci..."
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Gambar otomatis dikonversi ke WebP dan disajikan melalui CDN Cloudflare untuk performa loading secepat kilat.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: Live Interactive SEO Checklist & Gauge */}
        <div className="space-y-6">
          {/* SEO Score Gauge Card */}
          <Card className="border-blue-200 dark:border-blue-900/60 shadow-md">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-base font-bold">
                {t.seoChecklistTitle}
              </CardTitle>
              <CardDescription className="text-xs">
                Skor kalkulasi real-time saat Anda mengedit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SeoScoreGauge score={seoResult.overallScore} size="lg" />

              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Kata:</span>
                  <span className={`font-mono font-bold ${wordCount >= 700 ? "text-emerald-600" : "text-amber-500"}`}>
                    {wordCount} kata (Min. 700)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Keyword:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                    {focusKeyword || "Belum diisi"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Checklist Items (PRD Section 3.4) */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">
                Checklist Kepatuhan Algoritma Google
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs">
              {/* 1. Title */}
              <div className="flex items-start space-x-2">
                {seoResult.titleHasKeyword ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={seoResult.titleHasKeyword ? "font-semibold text-slate-800 dark:text-slate-200" : "text-slate-500"}>
                    Title mengandung kata kunci
                  </div>
                  {!seoResult.titleHasKeyword && (
                    <div className="text-[10px] text-red-500">Masukkan kata kunci ke judul</div>
                  )}
                </div>
              </div>

              {/* 2. Meta Description */}
              <div className="flex items-start space-x-2">
                {seoResult.metaDescLength ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={seoResult.metaDescLength ? "font-semibold text-slate-800 dark:text-slate-200" : "text-slate-500"}>
                    Meta deskripsi 140 - 165 karakter
                  </div>
                  {!seoResult.metaDescLength && (
                    <div className="text-[10px] text-amber-500">
                      Saat ini {metaDescription.length} karakter
                    </div>
                  )}
                </div>
              </div>

              {/* 3. First H2 */}
              <div className="flex items-start space-x-2">
                {seoResult.firstH2HasKeyword ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={seoResult.firstH2HasKeyword ? "font-semibold text-slate-800 dark:text-slate-200" : "text-slate-500"}>
                    Keyword di Heading 2 pertama
                  </div>
                  {!seoResult.firstH2HasKeyword && (
                    <div className="text-[10px] text-red-500">Sisipkan kata kunci pada tag &lt;h2&gt; pertama</div>
                  )}
                </div>
              </div>

              {/* 4. Internal Link */}
              <div className="flex items-start space-x-2">
                {seoResult.hasInternalLinks ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={seoResult.hasInternalLinks ? "font-semibold text-slate-800 dark:text-slate-200" : "text-slate-500"}>
                    Internal link ke halaman katalog produk
                  </div>
                  {!seoResult.hasInternalLinks && (
                    <div className="text-[10px] text-amber-500">Klik tombol '+ Internal Link Produk' di toolbar</div>
                  )}
                </div>
              </div>

              {/* 5. External Link */}
              <div className="flex items-start space-x-2">
                {seoResult.hasExternalLinks ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={seoResult.hasExternalLinks ? "font-semibold text-slate-800 dark:text-slate-200" : "text-slate-500"}>
                    External authority link (Kemenag/Kemendag/dsb)
                  </div>
                </div>
              </div>

              {/* 6. Alt Text */}
              <div className="flex items-start space-x-2">
                {seoResult.hasImageAltText ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={seoResult.hasImageAltText ? "font-semibold text-slate-800 dark:text-slate-200" : "text-slate-500"}>
                    Alt-text gambar terisi
                  </div>
                </div>
              </div>

              {/* 7. Optimal Slug */}
              <div className="flex items-start space-x-2">
                {seoResult.optimalSlug ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={seoResult.optimalSlug ? "font-semibold text-slate-800 dark:text-slate-200" : "text-slate-500"}>
                    URL slug ramah SEO (singkat & bersih)
                  </div>
                </div>
              </div>

              {/* 8. Word Count */}
              <div className="flex items-start space-x-2">
                {seoResult.wordCountMin ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={seoResult.wordCountMin ? "font-semibold text-slate-800 dark:text-slate-200" : "text-slate-500"}>
                    Jumlah kata &gt; 700 kata ({wordCount} kata)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Dialog (Mobile & Desktop) */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Pratinjau Halaman Artikel</DialogTitle>
            <div className="flex items-center space-x-1 rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-800 dark:bg-slate-900 mr-8">
              <button
                onClick={() => setPreviewDevice("desktop")}
                className={`p-1.5 rounded ${previewDevice === "desktop" ? "bg-white shadow-sm dark:bg-slate-800 text-blue-600" : "text-slate-500"}`}
                title="Desktop"
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={`p-1.5 rounded ${previewDevice === "mobile" ? "bg-white shadow-sm dark:bg-slate-800 text-blue-600" : "text-slate-500"}`}
                title="Mobile"
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
          </div>
          <DialogDescription className="text-xs">
            Lihat bagaimana artikel tampil di layar pembeli sebelum dipublikasikan.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-center bg-slate-100 dark:bg-slate-950 p-4 rounded-xl">
          <div
            className={`bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md transition-all ${
              previewDevice === "mobile" ? "w-[360px]" : "w-full max-w-2xl"
            }`}
          >
            <Badge variant="purple" className="text-[10px] mb-2">
              {activeLangTab === "id" ? "Bahasa Indonesia" : "English Version"}
            </Badge>
            <h1 className="text-xl font-black text-slate-900 dark:text-white leading-snug">
              {title || "Judul Artikel"}
            </h1>
            <div className="mt-2 flex items-center space-x-2 text-xs text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span>Oleh {currentArticle.author}</span>
              <span>•</span>
              <span>{currentArticle.publishDate}</span>
            </div>

            {featuredImage && (
              <img
                src={featuredImage}
                alt={imageAlt || title}
                className="my-4 h-48 w-full object-cover rounded-lg"
              />
            )}

            <div
              className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed space-y-3 mt-4"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setPreviewOpen(false)} className="text-xs">
            Tutup Pratinjau
          </Button>
          <Button variant="primary" onClick={handleSave} className="text-xs">
            Simpan & Publikasikan
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Schedule Modal */}
      <Dialog open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <DialogHeader>
          <DialogTitle>Jadwalkan Publikasi Artikel</DialogTitle>
          <DialogDescription className="text-xs">
            Pilih tanggal dan jam agar artikel tayang otomatis ke website Anda.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Waktu Tayang (WIB):
          </label>
          <Input
            type="datetime-local"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            className="h-10 text-xs"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setScheduleModalOpen(false)} className="text-xs">
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setScheduleModalOpen(false);
              handleSave();
            }}
            className="text-xs"
          >
            Konfirmasi Jadwal
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
