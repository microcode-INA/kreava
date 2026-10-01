"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  Ship,
  FileCheck,
  Share2,
  ChevronRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { Product } from "@/lib/types";

export default function ProductDetailPage() {
  const params = useParams();
  const { language, products, articles } = useStore();
  const t = useI18n(language);

  const slug = params?.slug as string;
  const product = products.find((p) => p.slug === slug) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Find related articles that link to this product
  const relatedArticles = articles.filter(
    (a) => a.productId === product.id || a.slug.includes(product.slug.slice(0, 10))
  );

  const name = language === "en" ? product.name.en : product.name.id;
  const desc = language === "en" ? product.description.en : product.description.id;

  const handleInquireWhatsApp = () => {
    const message = encodeURIComponent(
      `Halo ${product.name.id}, saya tertarik untuk memesan produk ini dengan MOQ ${product.minOrderQuantity}. Mohon info penawaran harga FOB dan COA terbaru.`
    );
    window.open(`https://wa.me/${product.whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/catalog" className="hover:text-blue-600">
            {t.catalog}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-400">{product.category}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-slate-900 dark:text-white truncate max-w-xs">
            {name}
          </span>
        </div>

        {/* Product Showcase Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="purple" className="text-xs font-mono shadow-md backdrop-blur-sm bg-slate-900/80 text-white">
                  HS: {product.hsCode}
                </Badge>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-blue-600 scale-95"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="thumb" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {product.category}
                </span>
                <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  {name}
                </h1>
              </div>

              {/* Price & MOQ Box */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">Harga Estimasi (FOB):</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {product.priceRange}
                  </span>
                </div>
                <div className="flex justify-between text-xs border-t border-slate-200 dark:border-slate-700 pt-2 text-slate-600 dark:text-slate-400">
                  <span>Minimum Order Quantity:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{product.minOrderQuantity}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>Port of Loading:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{product.fobPort}</span>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
                <p>{desc}</p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Verified Indonesian Supplier</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Ship className="h-4 w-4 text-blue-500" />
                  <span>Export Packing Standard</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="success"
                size="lg"
                onClick={handleInquireWhatsApp}
                className="w-full font-bold shadow-md text-base"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                <span>Inquiry WhatsApp / Request Quotation</span>
              </Button>

              <div className="text-center text-[11px] text-slate-400">
                Respon langsung dari perwakilan ekspor dalam waktu &lt; 15 menit.
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Spesifikasi Teknis Produk (Export Specification Sheet)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {product.specifications.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900"
                >
                  <span className="text-slate-500 font-medium">{spec.key}</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">{spec.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
                <span className="text-slate-500 font-medium">HS Code</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">{product.hsCode}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
                <span className="text-slate-500 font-medium">Incoterms Ready</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">FOB / CIF / CFR</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related SEO Articles Section (PRD Highlight) */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <span>Artikel SEO Pendukung Produk Ini</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Bagaimana artikel blog mendatangkan calon buyer organik langsung ke halaman produk ini.
                </p>
              </div>
              <Badge variant="success" className="text-xs">
                Contoh Strategi SEO Wospy
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedArticles.map((art) => (
                <Card key={art.id} className="hover:border-blue-500 transition-colors">
                  <CardContent className="p-5 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Badge variant="purple" className="text-[10px]">
                          Rank #{art.averagePosition} Google
                        </Badge>
                        <span className="text-xs text-slate-400 font-mono">
                          {art.views} views • {art.organicClicks} clicks
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600">
                        <Link href={`/blog/${art.slug}`}>
                          {language === "en" ? art.title.en : art.title.id}
                        </Link>
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {language === "en" ? art.excerpt.en : art.excerpt.id}
                      </p>
                    </div>

                    <Link href={`/blog/${art.slug}`}>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        <BookOpen className="h-3.5 w-3.5 mr-1 text-blue-600" />
                        <span>Baca Artikel Lengkap →</span>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
