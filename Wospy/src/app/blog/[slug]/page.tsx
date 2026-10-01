"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  BookOpen,
  Sparkles,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { Article } from "@/lib/types";

export default function ArticleDetailPage() {
  const params = useParams();
  const { language, articles, products } = useStore();
  const t = useI18n(language);

  const slug = params?.slug as string;
  const article = articles.find((a) => a.slug === slug) || articles[0];

  // Find linked product
  const linkedProduct = products.find((p) => p.id === article.productId) || products[0];

  const title = language === "en" ? article.title.en : article.title.id;
  const content = language === "en" ? article.content.en : article.content.id;
  const excerpt = language === "en" ? article.excerpt.en : article.excerpt.id;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Tautan artikel telah disalin ke clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            <span>Kembali ke Semua Artikel</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="purple" className="text-xs">
              Keyword: {article.focusKeyword}
            </Badge>
            <Badge variant="success" className="text-xs">
              SEO Score: {article.seoScore}/100
            </Badge>
            <span className="text-xs text-slate-400 font-mono">
              Google Rank #{article.averagePosition}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {excerpt}
          </p>

          <div className="flex items-center justify-between border-y border-slate-200 dark:border-slate-800 py-3 text-xs text-slate-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-blue-600" />
                <span>{article.author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{article.publishDate}</span>
              </span>
              <span className="flex items-center gap-1.5 hidden sm:flex">
                <Clock className="h-3.5 w-3.5" />
                <span>4 menit baca</span>
              </span>
            </div>

            <Button variant="ghost" size="sm" onClick={handleShare} className="h-8 text-xs">
              <Share2 className="h-3.5 w-3.5 mr-1" />
              <span>Bagikan</span>
            </Button>
          </div>
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-lg bg-slate-100">
            <img
              src={article.featuredImage}
              alt={article.imageAlt || title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Content Body */}
        <article className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {/* Article typography */}
          <div
            className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4 [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-black [&>h2]:text-slate-900 dark:[&>h2]:text-white [&>h2]:mt-8 [&>h2]:mb-3 [&>p]:text-slate-700 dark:[&>p]:text-slate-300 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>a]:text-blue-600 [&>a]:font-semibold [&>a]:underline [&>strong]:text-slate-900 dark:[&>strong]:text-white"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Linked Product Conversion Spotlight Card (From PRD 7: Replikasi Kasus Sukses Haramain Service) */}
          {linkedProduct && (
            <div className="my-8 rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-white dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 p-6 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="success" className="text-[10px] font-bold uppercase tracking-wider">
                  Produk / Layanan Terkait di Artikel Ini
                </Badge>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  Tersedia untuk Pemesanan
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <img
                  src={linkedProduct.images[0]}
                  alt={linkedProduct.name.id}
                  className="h-24 w-24 rounded-xl object-cover shadow-sm shrink-0"
                />
                <div className="space-y-1.5 flex-1 text-center sm:text-left">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {language === "en" ? linkedProduct.name.en : linkedProduct.name.id}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {language === "en" ? linkedProduct.description.en : linkedProduct.description.id}
                  </p>
                  <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Harga: {linkedProduct.priceRange} • MOQ: {linkedProduct.minOrderQuantity}
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Link href={`/catalog/${linkedProduct.slug}`}>
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Detail Produk →
                    </Button>
                  </Link>
                  <a
                    href={`https://wa.me/${linkedProduct.whatsappNumber}?text=${encodeURIComponent(
                      `Halo, saya membaca artikel "${title}" dan tertarik untuk memesan ${linkedProduct.name.id}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="success" size="sm" className="w-full text-xs font-bold">
                      <MessageCircle className="h-4 w-4 mr-1.5" />
                      <span>Chat WhatsApp</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Section (Auto Schema PRD Feature) */}
          {article.faqSchema && article.faqSchema.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                <span>Pertanyaan yang Sering Diajukan (FAQ)</span>
              </h3>

              <div className="space-y-3">
                {article.faqSchema.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50 space-y-1.5"
                  >
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      Q: {faq.question}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-3 border-l-2 border-blue-500">
                      A: {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
