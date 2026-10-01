"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  TrendingUp,
  Filter,
  ArrowUpRight,
  Zap,
  Globe,
  Plus,
  PenTool,
  Copy,
  Check,
  HelpCircle,
  BarChart2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { formatNumber } from "@/lib/utils";
import { SearchIntent, KeywordItem } from "@/lib/types";

export default function KeywordExplorerPage() {
  const { language, keywords, saveKeywords } = useStore();
  const t = useI18n(language);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIntent, setSelectedIntent] = useState<string>("all");
  const [selectedLang, setSelectedLang] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAiSearching, setIsAiSearching] = useState(false);

  // Filter keywords
  const filteredKeywords = keywords.filter((kw) => {
    const matchesQuery =
      kw.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kw.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIntent = selectedIntent === "all" || kw.intent === selectedIntent;
    const matchesLang = selectedLang === "all" || kw.language === selectedLang;
    return matchesQuery && matchesIntent && matchesLang;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSimulateAiDiscovery = () => {
    setIsAiSearching(true);
    setTimeout(() => {
      const newKw: KeywordItem = {
        id: `kw-${Date.now()}`,
        keyword: searchQuery.trim() || "indonesia organic coconut charcoal briquette supplier",
        language: "en",
        searchVolume: 4100,
        difficulty: 24,
        intent: "Commercial",
        cpc: 1.65,
        trend: [2200, 2600, 3100, 3500, 3800, 4100],
        category: "Riset AI Baru",
        competitorGap: {
          competitorDomain: "asianbriquettes.com",
          competitorRank: 8,
          opportunityScore: 94,
        },
      };
      saveKeywords([newKw, ...keywords]);
      setIsAiSearching(false);
      setSearchQuery("");
    }, 1200);
  };

  const getIntentBadge = (intent: SearchIntent) => {
    switch (intent) {
      case "Informational":
        return <Badge variant="secondary">Informational</Badge>;
      case "Commercial":
        return <Badge variant="warning">Commercial</Badge>;
      case "Transactional":
        return <Badge variant="success">Transactional</Badge>;
      case "Navigational":
        return <Badge variant="purple">Navigational</Badge>;
    }
  };

  const getDifficultyBadge = (kd: number) => {
    if (kd <= 25) {
      return (
        <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5" />
          {kd}% (Sangat Mudah)
        </span>
      );
    }
    if (kd <= 40) {
      return (
        <span className="inline-flex items-center text-xs font-bold text-blue-600 dark:text-blue-400">
          <span className="h-2 w-2 rounded-full bg-blue-500 mr-1.5" />
          {kd}% (Menengah)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-xs font-bold text-amber-600 dark:text-amber-400">
        <span className="h-2 w-2 rounded-full bg-amber-500 mr-1.5" />
        {kd}% (Kompetitif)
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {t.navKeywords}
            </h1>
            <Badge variant="purple" className="text-xs">
              Bilingual (ID/EN)
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Temukan kata kunci dengan volume tinggi, tingkat kesulitan rendah, dan niat beli (commercial/transactional) kuat untuk pasar ekspor.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link href="/dashboard/articles/generate">
            <Button variant="primary" className="text-xs">
              <PenTool className="h-4 w-4 mr-1.5" />
              <span>Generate Artikel dari Keyword</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Search & AI Explorer Bar */}
      <Card className="border-blue-200 dark:border-blue-900/60 shadow-md">
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Masukkan niche produk, kata kunci, atau URL kompetitor (mis: 'vanilla beans export' atau 'visa umrah')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSimulateAiDiscovery()}
                className="pl-10 h-11 text-sm bg-slate-50/50 dark:bg-slate-900"
              />
            </div>

            <Button
              onClick={handleSimulateAiDiscovery}
              disabled={isAiSearching}
              variant="primary"
              className="h-11 px-6 w-full md:w-auto"
            >
              {isAiSearching ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  <span>AI Menganalisis SERP...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span>Riset Keyword AI</span>
                </>
              )}
            </Button>
          </div>

          {/* Quick preset niches */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Contoh Cepat:</span>
            <button
              onClick={() => setSearchQuery("visa umrah di bandung")}
              className="rounded-full bg-slate-100 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-blue-950 px-2.5 py-1 text-slate-700 dark:text-slate-300 transition-colors"
            >
              visa umrah di bandung
            </button>
            <button
              onClick={() => setSearchQuery("indonesian vanilla beans")}
              className="rounded-full bg-slate-100 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-blue-950 px-2.5 py-1 text-slate-700 dark:text-slate-300 transition-colors"
            >
              indonesian vanilla beans
            </button>
            <button
              onClick={() => setSearchQuery("ekspor briket arang")}
              className="rounded-full bg-slate-100 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-blue-950 px-2.5 py-1 text-slate-700 dark:text-slate-300 transition-colors"
            >
              ekspor briket arang
            </button>
            <button
              onClick={() => setSearchQuery("aceh gayo coffee")}
              className="rounded-full bg-slate-100 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-blue-950 px-2.5 py-1 text-slate-700 dark:text-slate-300 transition-colors"
            >
              aceh gayo coffee
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs & Keyword Results Table */}
      <Tabs defaultValue="all-keywords">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all-keywords">
              Semua Keyword ({filteredKeywords.length})
            </TabsTrigger>
            <TabsTrigger value="ai-suggestions">
              AI Long-Tail Goldmine
            </TabsTrigger>
            <TabsTrigger value="gap-analysis">
              Celah Kompetitor (Gap Analysis)
            </TabsTrigger>
          </TabsList>

          {/* Filters */}
          <div className="flex items-center space-x-2 text-xs">
            <select
              value={selectedIntent}
              onChange={(e) => setSelectedIntent(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 dark:border-slate-800 dark:bg-slate-900"
            >
              <option value="all">Semua Intent</option>
              <option value="Commercial">Commercial (Niat Beli)</option>
              <option value="Transactional">Transactional (Siap Order)</option>
              <option value="Informational">Informational (Edukasi)</option>
            </select>

            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 dark:border-slate-800 dark:bg-slate-900"
            >
              <option value="all">Semua Bahasa</option>
              <option value="id">🇮🇩 Bahasa Indonesia</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>
        </div>

        {/* Tab 1: All Keywords Table */}
        <TabsContent value="all-keywords" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-800 text-xs">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Kata Kunci Target</th>
                      <th className="py-3 px-3 font-semibold">Bahasa</th>
                      <th className="py-3 px-3 font-semibold">Niat Pencarian (Intent)</th>
                      <th className="py-3 px-3 font-semibold text-right">Volume / Bulan</th>
                      <th className="py-3 px-3 font-semibold">Kesulitan (KD%)</th>
                      <th className="py-3 px-3 font-semibold text-right">Est. CPC</th>
                      <th className="py-3 px-4 font-semibold text-right">Aksi One-Click</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredKeywords.map((kw) => (
                      <tr key={kw.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {kw.keyword}
                            </span>
                            <button
                              onClick={() => handleCopy(kw.keyword, kw.id)}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                              title="Salin keyword"
                            >
                              {copiedId === kw.id ? (
                                <Check className="h-3.5 w-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            Kategori: {kw.category}
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <Badge variant={kw.language === "id" ? "default" : "purple"} className="text-[10px]">
                            {kw.language === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
                          </Badge>
                        </td>

                        <td className="py-3.5 px-3">
                          {getIntentBadge(kw.intent)}
                        </td>

                        <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-800 dark:text-slate-200">
                          {formatNumber(kw.searchVolume)}
                        </td>

                        <td className="py-3.5 px-3">
                          {getDifficultyBadge(kw.difficulty)}
                        </td>

                        <td className="py-3.5 px-3 text-right font-mono text-slate-600 dark:text-slate-400 text-xs">
                          ${kw.cpc.toFixed(2)}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <Link href={`/dashboard/articles/generate?keyword=${encodeURIComponent(kw.keyword)}&lang=${kw.language}`}>
                            <Button size="sm" variant="primary" className="h-8 text-xs font-medium">
                              <PenTool className="h-3.5 w-3.5 mr-1" />
                              <span>Generate Artikel</span>
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: AI Suggestions */}
        <TabsContent value="ai-suggestions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span>Rekomendasi Long-Tail Keywords Mudah Diranking (Low KD)</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Keyword spesifik dengan volume tertarget dan persaingan rendah, formula yang terbukti melahirkan 2000+ views pada studi kasus Haramain Service.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keywords.filter(k => k.difficulty <= 35).map((kw) => (
                <div
                  key={kw.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {kw.keyword}
                    </span>
                    <Badge variant="success" className="text-[10px]">
                      Peluang Tinggi
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 text-xs gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400 block">Volume:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{formatNumber(kw.searchVolume)}/bln</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Kesulitan:</span>
                      <strong className="text-emerald-600">{kw.difficulty}% KD</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Niat:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{kw.intent}</strong>
                    </div>
                  </div>
                  <Link href={`/dashboard/articles/generate?keyword=${encodeURIComponent(kw.keyword)}&lang=${kw.language}`} className="block">
                    <Button variant="outline" size="sm" className="w-full text-xs hover:border-blue-600 hover:text-blue-600">
                      <Zap className="h-3.5 w-3.5 mr-1 text-amber-500 fill-amber-500" />
                      Generate Outline & Artikel Sekarang
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Competitor Gap Analysis */}
        <TabsContent value="gap-analysis" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-blue-600" />
                <span>Analisis Celah Keyword Kompetitor</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Keyword yang digunakan kompetitor namun belum dioptimasi dengan baik. Kesempatan bagi Anda untuk merebut posisi #1 Google!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {keywords.filter(k => k.competitorGap).map((kw) => (
                <div
                  key={kw.id}
                  className="rounded-xl border border-slate-200 p-4 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {kw.keyword}
                      </span>
                      <Badge variant="warning" className="text-[10px]">
                        Opportunity {kw.competitorGap?.opportunityScore}%
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      Kompetitor: <span className="font-mono text-slate-700 dark:text-slate-300">{kw.competitorGap?.competitorDomain}</span> berada di posisi #{kw.competitorGap?.competitorRank} Google dengan konten singkat.
                    </p>
                  </div>

                  <Link href={`/dashboard/articles/generate?keyword=${encodeURIComponent(kw.keyword)}&lang=${kw.language}`}>
                    <Button size="sm" variant="primary" className="text-xs whitespace-nowrap">
                      <span>Buat Artikel Unggulan (Overtake)</span>
                      <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
