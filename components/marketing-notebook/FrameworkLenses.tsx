"use client";

import React from "react";
import { FrameworkLens } from "@/data/marketing-notebook";

interface FrameworkLensesProps {
  lenses: FrameworkLens[];
}

export default function FrameworkLenses({ lenses }: FrameworkLensesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
      {lenses.map((lens) => (
        <div
          key={lens.number}
          className="p-5 rounded-xl bg-dark-surface border border-dark-borderSubtle hover:border-dark-border transition-colors flex flex-col justify-between space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-accent-blue bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 tabular-nums">
              {String(lens.number).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-warm-muted">
              Checklist lens
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-semibold text-warm-white group-hover:text-accent-blue transition-colors">
              {lens.name}
            </h3>
            <p className="text-xs sm:text-sm text-warm-gray leading-relaxed font-normal">
              {lens.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
