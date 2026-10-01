"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Users,
  CreditCard,
  Cpu,
  Server,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { formatNumber } from "@/lib/utils";

export default function SuperAdminPage() {
  const { language, tenant } = useStore();
  const t = useI18n(language);

  const mockTenants = [
    {
      id: "ten-1",
      name: "PT Nusantara Agro & Service Global",
      type: "Eksportir Rempah & Wisata",
      domain: "nusantara-export.wospy.id",
      plan: "Growth (Rp 349K/bln)",
      articlesUsed: 18,
      articlesLimit: 50,
      keywordsUsed: 14,
      keywordsLimit: 50,
      tokensUsed: 142500,
      status: "Active",
    },
    {
      id: "ten-2",
      name: "Haramain Service International Bandung",
      type: "Biro Jasa & Visa Umrah",
      domain: "haramainserviceintl.biz.id",
      plan: "Pro (Rp 699K/bln)",
      articlesUsed: 42,
      articlesLimit: 100,
      keywordsUsed: 38,
      keywordsLimit: 100,
      tokensUsed: 380400,
      status: "Active",
    },
    {
      id: "ten-3",
      name: "CV Java Rattan & Furniture Export",
      type: "Produsen Mebel Rotan Jepara",
      domain: "javarattan.wospy.id",
      plan: "Starter (Rp 149K/bln)",
      articlesUsed: 8,
      articlesLimit: 10,
      keywordsUsed: 5,
      keywordsLimit: 10,
      tokensUsed: 62000,
      status: "Active",
    },
    {
      id: "ten-4",
      name: "Digital Trade Agency Bali",
      type: "Agensi SEO Multi-Klien",
      domain: "agency-bali.wospy.io",
      plan: "Enterprise (White-Label)",
      articlesUsed: 184,
      articlesLimit: 500,
      keywordsUsed: 140,
      keywordsLimit: 500,
      tokensUsed: 1420000,
      status: "Active",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {t.navAdmin}
            </h1>
            <Badge variant="purple" className="text-xs">
              Super Admin Mode
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Kelola seluruh penyewa bisnis (multi-tenant), monitor kuota API AI token, dan pantau status langganan.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Button variant="outline" size="sm" className="text-xs">
            <Cpu className="h-4 w-4 mr-1 text-blue-600" />
            <span>AI Model Engine Status: Normal</span>
          </Button>
        </div>
      </div>

      {/* Platform Level Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase">
              <span>Total Tenant Aktif</span>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              42 Bisnis
            </div>
            <div className="mt-1 text-xs text-emerald-600 font-semibold">
              +6 tenant baru bulan ini
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase">
              <span>MRR Langganan</span>
              <CreditCard className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              Rp 18.450.000
            </div>
            <div className="mt-1 text-xs text-emerald-600 font-semibold">
              Pertumbuhan +22% MoM
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase">
              <span>Total Artikel AI Terbit</span>
              <Sparkles className="h-4 w-4 text-purple-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              1,280 Artikel
            </div>
            <div className="mt-1 text-xs text-blue-600 font-semibold">
              98.2% lolos audit SEO Google
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase">
              <span>AI Token Ingestion</span>
              <Cpu className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              14.2M Tokens
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Avg latency: 1.2s per generation
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tenant Management Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold">
            Daftar Penyewa Platform (Multi-Tenant Overview)
          </CardTitle>
          <CardDescription className="text-xs">
            Monitor penggunaan limit artikel AI dan rank tracking tiap klien.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-800 text-xs">
                <tr>
                  <th className="py-3 px-4 font-semibold">Nama Bisnis & Domain</th>
                  <th className="py-3 px-3 font-semibold">Tipe Usaha</th>
                  <th className="py-3 px-3 font-semibold">Paket Aktif</th>
                  <th className="py-3 px-3 font-semibold">Kuota Artikel AI</th>
                  <th className="py-3 px-3 font-semibold">Keyword Terlacak</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {mockTenants.map((ten) => (
                  <tr key={ten.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                      <div>{ten.name}</div>
                      <div className="text-xs font-mono text-blue-600 dark:text-blue-400 font-normal">
                        {ten.domain}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-xs text-slate-600 dark:text-slate-400">
                      {ten.type}
                    </td>

                    <td className="py-3.5 px-3">
                      <Badge variant="purple" className="text-[10px]">
                        {ten.plan}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="text-xs font-mono">
                        {ten.articlesUsed} / {ten.articlesLimit}
                      </div>
                      <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${(ten.articlesUsed / ten.articlesLimit) * 100}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-mono text-xs">
                      {ten.keywordsUsed} / {ten.keywordsLimit}
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Aktif
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Kelola
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
