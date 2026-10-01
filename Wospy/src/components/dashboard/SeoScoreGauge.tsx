import React from "react";
import { cn } from "@/lib/utils";

interface SeoScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function SeoScoreGauge({
  score,
  size = "md",
  showLabel = true,
}: SeoScoreGaugeProps) {
  // Normalize score
  const safeScore = Math.min(100, Math.max(0, Math.round(score)));

  // Determine color
  let color = "text-emerald-500 stroke-emerald-500";
  let bgColor = "text-emerald-100 dark:text-emerald-950/40";
  let label = "Sangat Baik (SEO Ready)";
  let badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";

  if (safeScore < 60) {
    color = "text-red-500 stroke-red-500";
    bgColor = "text-red-100 dark:text-red-950/40";
    label = "Perlu Perbaikan Segera";
    badgeClass = "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";
  } else if (safeScore < 80) {
    color = "text-amber-500 stroke-amber-500";
    bgColor = "text-amber-100 dark:text-amber-950/40";
    label = "Cukup Bagus (Bisa Dioptimalkan)";
    badgeClass = "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
  }

  const dimensions = {
    sm: { size: 60, strokeWidth: 5, textSize: "text-base" },
    md: { size: 90, strokeWidth: 7, textSize: "text-2xl" },
    lg: { size: 130, strokeWidth: 9, textSize: "text-4xl" },
  }[size];

  const radius = (dimensions.size - dimensions.strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safeScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={dimensions.size}
          height={dimensions.size}
          className="rotate-[-90deg] transition-all duration-700 ease-out"
        >
          {/* Background circle */}
          <circle
            cx={dimensions.size / 2}
            cy={dimensions.size / 2}
            r={radius}
            className="stroke-slate-100 dark:stroke-slate-800"
            strokeWidth={dimensions.strokeWidth}
            fill="none"
          />
          {/* Animated progress circle */}
          <circle
            cx={dimensions.size / 2}
            cy={dimensions.size / 2}
            r={radius}
            className={color}
            strokeWidth={dimensions.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span
            className={cn("font-black tracking-tight text-slate-900 dark:text-white", dimensions.textSize)}
          >
            {safeScore}
          </span>
          <span className="text-[10px] font-bold text-slate-400 -mt-1">/100</span>
        </div>
      </div>

      {showLabel && (
        <div className="mt-2 text-center">
          <span
            className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold", badgeClass)}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
