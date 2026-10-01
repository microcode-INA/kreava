import React from "react";
import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  description?: string;
  accentColor?: "blue" | "emerald" | "amber" | "purple";
}

export function MetricCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  description,
  accentColor = "blue",
}: MetricCardProps) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400",
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </span>
          <div className={cn("p-2.5 rounded-xl", colorMap[accentColor])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            {value}
          </div>
          {change && (
            <div
              className={cn(
                "inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full",
                isPositive
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-0.5" />
              )}
              <span>{change}</span>
            </div>
          )}
        </div>

        {description && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
