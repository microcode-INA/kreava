"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  Upload,
  Sparkles,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Trash2,
  FileCheck,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { MediaItem } from "@/lib/types";

export default function MediaOptimizationPage() {
  const { language, media } = useStore();
  const t = useI18n(language);

  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [aiPromptOpen, setAiPromptOpen] = useState(false);
  const [promptText, setPromptText] = useState("Professional cinematic export packaging of organic Indonesian vanilla beans on dark textured stone background");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleGenerateAiImage = () => {
    setIsGeneratingImage(true);
    setTimeout(() => {
      setIsGeneratingImage(false);
      setAiPromptOpen(false);
      alert("Gambar AI berhasil dibuat & dikonversi ke WebP di CDN!");
    }, 2000);
  };

  // Calculate bandwidth savings
  const totalOriginalKb = media.reduce((acc, m) => acc + m.originalSizeKb, 0);
  const totalWebpKb = media.reduce((acc, m) => acc + m.webpSizeKb, 0);
  const savedPercent = Math.round(((totalOriginalKb - totalWebpKb) / totalOriginalKb) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {t.navMedia}
            </h1>
            <Badge variant="purple" className="text-xs">
              Cloudflare CDN Active
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Optimasi gambar otomatis: kompresi WebP loss-free, pembuatan alt-text SEO AI bilingual, dan penyajian kilat melalui CDN.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAiPromptOpen(true)}
            className="text-xs"
          >
            <Sparkles className="h-4 w-4 mr-1.5 text-amber-500" />
            <span>AI Image Generator</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => alert("Simulasi upload gambar: File otomatis di-resize, dikonversi WebP, dan di-alt-text.")}
            className="text-xs font-semibold"
          >
            <Upload className="h-4 w-4 mr-1.5" />
            <span>Unggah Gambar Baru</span>
          </Button>
        </div>
      </div>

      {/* Bandwidth Savings Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <CardContent className="p-5">
            <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase">
              Penghematan Bandwidth WebP
            </div>
            <div className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {savedPercent}% Lebih Ringan
            </div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Dari {(totalOriginalKb / 1024).toFixed(1)} MB menjadi {(totalWebpKb / 1024).toFixed(1)} MB (Loading 4x lebih cepat)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-semibold text-slate-500 uppercase">
              Auto Alt-Text Coverage
            </div>
            <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
              100% Terisi
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Seluruh gambar memiliki deskripsi kata kunci untuk Google Images
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-semibold text-slate-500 uppercase">
              Status Edge CDN
            </div>
            <div className="mt-2 text-3xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Zap className="h-7 w-7 text-amber-500 fill-amber-500" />
              <span>32ms Latency</span>
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Disajikan dari 285+ server global Cloudflare & BunnyCDN
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item) => {
          const savings = Math.round(
            ((item.originalSizeKb - item.webpSizeKb) / item.originalSizeKb) * 100
          );

          return (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.altTextId}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="success" className="text-[10px] shadow">
                    WebP -{savings}%
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono">
                  {item.dimensions}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="font-bold text-xs text-slate-900 dark:text-white truncate font-mono">
                  {item.name}
                </div>

                {/* Alt text bilingual */}
                <div className="space-y-1 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60 text-xs">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    Alt-Text Otomatis AI (SEO):
                  </div>
                  <div className="text-slate-800 dark:text-slate-200 line-clamp-2 italic">
                    "{language === "en" ? item.altTextEn : item.altTextId}"
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2">
                  <span>Ukuran Asli: {item.originalSizeKb} KB</span>
                  <span className="font-bold text-emerald-600">WebP: {item.webpSizeKb} KB</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(item.url)}
                    className="w-full text-xs"
                  >
                    {copiedUrl === item.url ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                        <span>Tersalin ke Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        <span>Salin Link CDN</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* AI Image Generation Modal */}
      <Dialog open={aiPromptOpen} onOpenChange={setAiPromptOpen}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <span>AI Featured Image Generator</span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            Generate gambar resolusi tinggi bertema ekspor / produk dengan prompt AI, otomatis terkompresi ke WebP.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Prompt Deskripsi Visual:
            </label>
            <Input
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="mt-1 text-xs h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-500">Rasio Aspek:</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-xs dark:border-slate-800 dark:bg-slate-900">
                <option>16:9 (Landscape Artikel Blog)</option>
                <option>1:1 (Square Katalog Produk)</option>
                <option>4:3 (Dokumentasi Ekspor)</option>
              </select>
            </div>
            <div>
              <label className="text-slate-500">Gaya Gambar:</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-xs dark:border-slate-800 dark:bg-slate-900">
                <option>Photorealistic / Commercial</option>
                <option>Minimalist Studio Lighting</option>
                <option>Industrial Export Warehouse</option>
              </select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setAiPromptOpen(false)} className="text-xs">
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={handleGenerateAiImage}
            disabled={isGeneratingImage}
            className="text-xs"
          >
            {isGeneratingImage ? "Memproses Generasi..." : "Generate & Simpan ke Media"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
