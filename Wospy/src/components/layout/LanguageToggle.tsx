"use client";

import React from "react";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, changeLanguage } = useStore();

  return (
    <div className="flex items-center space-x-1 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900/60">
      <button
        onClick={() => changeLanguage("id")}
        className={`flex items-center space-x-1 rounded-md px-2 py-1 text-xs font-semibold transition-all ${
          language === "id"
            ? "bg-white text-blue-700 shadow-sm dark:bg-slate-800 dark:text-blue-400"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
        }`}
        title="Bahasa Indonesia"
      >
        <span>🇮🇩</span>
        <span className="hidden sm:inline">ID</span>
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`flex items-center space-x-1 rounded-md px-2 py-1 text-xs font-semibold transition-all ${
          language === "en"
            ? "bg-white text-blue-700 shadow-sm dark:bg-slate-800 dark:text-blue-400"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
        }`}
        title="English (US/UK)"
      >
        <span>🇬🇧</span>
        <span className="hidden sm:inline">EN</span>
      </button>
    </div>
  );
}
