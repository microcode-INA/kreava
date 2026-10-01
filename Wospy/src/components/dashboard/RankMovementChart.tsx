"use client";

import React, { useState } from "react";
import { TrendingUp, MousePointerClick, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RankMovementChart() {
  const [range, setRange] = useState<"7d" | "30d">("7d");

  const data7d = [
    { label: "Sen", clicks: 42, impressions: 420, avgPos: 4.8 },
    { label: "Sel", clicks: 58, impressions: 580, avgPos: 4.2 },
    { label: "Rab", clicks: 75, impressions: 720, avgPos: 3.5 },
    { label: "Kam", clicks: 92, impressions: 890, avgPos: 2.8 },
    { label: "Jum", clicks: 110, impressions: 1120, avgPos: 2.1 },
    { label: "Sab", clicks: 128, impressions: 1300, avgPos: 1.8 },
    { label: "Min", clicks: 142, impressions: 1480, avgPos: 1.4 },
  ];

  const maxClicks = Math.max(...data7d.map((d) => d.clicks));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Performa Traffic Google Search Console</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Data klik organik & impresi pencarian kata kunci target
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={range === "7d" ? "primary" : "secondary"}
            className="h-8 text-xs"
            onClick={() => setRange("7d")}
          >
            7 Hari Terakhir
          </Button>
          <Button
            size="sm"
            variant={range === "30d" ? "primary" : "secondary"}
            className="h-8 text-xs"
            onClick={() => setRange("30d")}
          >
            30 Hari Terakhir
          </Button>
        </div>
      </div>

      {/* Top mini summary stats */}
      <div className="grid grid-cols-3 gap-4 my-6 py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <div>
          <div className="text-xs text-slate-500">Total Klik (7d)</div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
            647 <span className="text-xs font-semibold text-emerald-600">+34%</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Total Impresi</div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
            6,510 <span className="text-xs font-semibold text-emerald-600">+48%</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Posisi Rata-rata</div>
          <div className="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
            #1.4 <span className="text-xs font-semibold text-emerald-600">Top 3</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="mt-4 h-48 flex items-end justify-between gap-3 pt-6">
        {data7d.map((item, index) => {
          const heightPercent = Math.round((item.clicks / maxClicks) * 100);
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2 group relative">
              {/* Tooltip on hover */}
              <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] rounded px-2 py-1 pointer-events-none whitespace-nowrap shadow-lg z-20 font-mono">
                {item.clicks} klik ({item.impressions} imp) • Pos #{item.avgPos}
              </div>

              {/* Bar */}
              <div className="w-full max-w-[42px] bg-slate-100 dark:bg-slate-800 rounded-t-lg h-36 flex items-end overflow-hidden">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg transition-all duration-500 group-hover:from-blue-500 group-hover:to-indigo-400"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* Label */}
              <span className="text-xs font-medium text-slate-500 group-hover:text-blue-600">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
