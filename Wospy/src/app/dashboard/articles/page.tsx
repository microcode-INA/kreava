"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  ExternalLink,
  FileEdit,
  Trash2,
  Eye,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { formatNumber } from "@/lib/utils";

export default function ArticlesListPage() {
  const { language, articles, deleteArticle } = useStore();
  const t = useI18n(language);

  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredArticles = articles.filter((art) => {
    const titleMatch =
      art.title.id.toLowerCase().includes(query.toLowerCase()) ||
      art.title.en.toLowerCase().includes(query.toLowerCase()) ||
      art.focusKeyword.toLowerCase().includes(query.toLowerCase());
    const statusMatch = filterStatus === "all" || art.status === filterStatus;
    return titleMatch && statusMatch;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {t.navArticles}
            </h1>
            <Badge variant="secondary" className="text-xs">
              {articles.length} Artikel
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Kelola seluruh artikel SEO, cek skor kepatuhan real-time, jadwalkan publikasi, dan evaluasi traffic organik.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link href="/dashboard/articles/generate">
            <Button variant="primary" className="text-xs font-semibold">
              <Sparkles className="h-4 w-4 mr-1.5" />
              <span>{t.btnNewArticle}</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Cari judul, kata kunci, atau slug..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto text-xs">
            <span className="text-slate-500 text-xs">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            >
              <option value="all">Semua Status</option>
              <option value="published">Terpublikasi</option>
              <option value="draft">Draf</option>
              <option value="scheduled">Terjadwal</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Articles Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-800 text-xs">
                <tr>
                  <th className="py-3 px-4 font-semibold">Artikel & Kata Kunci</th>
                  <th className="py-3 px-3 font-semibold text-center">Skor SEO</th>
                  <th className="py-3 px-3 font-semibold">Bahasa</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                  <th className="py-3 px-3 font-semibold text-right">Views</th>
                  <th className="py-3 px-3 font-semibold text-right">Klik GSC</th>
                  <th className="py-3 px-3 font-semibold text-center">Posisi</th>
                  <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredArticles.map((art) => {
                  const title = language === "en" ? art.title.en : art.title.id;

                  return (
                    <tr
                      key={art.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-colors"
                    >
                      <td className="py-3.5 px-4 max-w-xs">
                        <Link
                          href={`/dashboard/articles/${art.id}/edit`}
                          className="font-bold text-slate-900 dark:text-white hover:text-blue-600 line-clamp-1 block text-sm"
                        >
                          {title}
                        </Link>
                        <div className="mt-1 flex items-center space-x-2 text-xs text-slate-400">
                          <span>Keyword:</span>
                          <span className="font-semibold text-slate-600 dark:text-slate-300">
                            {art.focusKeyword}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <Badge
                          variant={art.seoScore >= 90 ? "success" : art.seoScore >= 75 ? "warning" : "destructive"}
                          className="font-bold text-xs"
                        >
                          {art.seoScore}/100
                        </Badge>
                      </td>

                      <td className="py-3.5 px-3">
                        <Badge variant="purple" className="text-[10px]">
                          {art.languageMode === "both" ? "🌐 Dual (ID/EN)" : art.languageMode.toUpperCase()}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          Publish
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {formatNumber(art.views)}
                      </td>

                      <td className="py-3.5 px-3 text-right font-mono font-semibold text-blue-600 dark:text-blue-400">
                        {formatNumber(art.organicClicks)}
                      </td>

                      <td className="py-3.5 px-3 text-center font-bold font-mono text-slate-800 dark:text-slate-200">
                        #{art.averagePosition}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <Link href={`/blog/${art.slug}`} target="_blank">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Buka tampilan publik">
                              <Eye className="h-3.5 w-3.5 text-slate-600" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/articles/${art.id}/edit`}>
                            <Button variant="outline" size="sm" className="h-8 text-xs">
                              <FileEdit className="h-3.5 w-3.5 mr-1" />
                              <span>Edit</span>
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            onClick={() => deleteArticle(art.id)}
                            title="Hapus artikel"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
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
  );
}
