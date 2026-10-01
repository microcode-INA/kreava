"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  PenTool,
  FileText,
  ShoppingBag,
  TrendingUp,
  Image as ImageIcon,
  Wand2,
  ShieldAlert,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { language, tenant } = useStore();
  const t = useI18n(language);

  const navItems = [
    {
      title: t.navOverview,
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: t.navWizard,
      href: "/dashboard/wizard",
      icon: Wand2,
      badge: "Fast-Track",
      highlight: true,
    },
    {
      title: t.navKeywords,
      href: "/dashboard/keywords",
      icon: Search,
    },
    {
      title: t.navArticleGen,
      href: "/dashboard/articles/generate",
      icon: PenTool,
      badge: "AI 2.0",
    },
    {
      title: t.navArticles,
      href: "/dashboard/articles",
      icon: FileText,
    },
    {
      title: t.navProducts,
      href: "/dashboard/products",
      icon: ShoppingBag,
    },
    {
      title: t.navRankTracker,
      href: "/dashboard/analytics",
      icon: TrendingUp,
      badge: "GSC Live",
    },
    {
      title: t.navMedia,
      href: "/dashboard/media",
      icon: ImageIcon,
    },
    {
      title: t.navAdmin,
      href: "/dashboard/admin",
      icon: ShieldAlert,
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:flex">
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
              Wospy<span className="text-blue-600">.ai</span>
            </span>
            <div className="text-[10px] text-slate-400 font-mono -mt-1">Workspace v1.0</div>
          </div>
        </Link>
      </div>

      {/* Tenant / Store Switcher Box */}
      <div className="p-3 border-b border-slate-100 dark:border-slate-900">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <span className="flex items-center gap-1">
              <Store className="h-3 w-3" />
              <span>Tenant Aktif</span>
            </span>
            <Badge variant="purple" className="text-[10px] px-1 py-0 h-4">
              {tenant.plan}
            </Badge>
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
            {tenant.companyName}
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
            <span>Quota AI:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {tenant.articlesGeneratedThisMonth}/{tenant.articlesLimit} artikel
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Main Dashboard
        </div>
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200",
                item.highlight && !isActive && "text-blue-600 dark:text-blue-400"
              )}
            >
              <div className="flex items-center space-x-3">
                <item.icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                  )}
                />
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[10px] font-bold tracking-tight",
                    item.badge === "Fast-Track"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Showcase link */}
      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        <Link
          href="/catalog"
          target="_blank"
          className="flex items-center justify-between rounded-lg border border-dashed border-slate-300 p-2.5 text-xs font-medium text-slate-600 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <ExternalLink className="h-4 w-4" />
            <span>Lihat Website Publik</span>
          </div>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
