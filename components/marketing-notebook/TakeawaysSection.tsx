"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { TakeawayItem, WorkLinkItem } from "@/data/marketing-notebook";

interface TakeawaysSectionProps {
  items: TakeawayItem[];
  closingLine: string;
  whereItShowsUp: WorkLinkItem[];
}

export default function TakeawaysSection({
  items,
  closingLine,
  whereItShowsUp,
}: TakeawaysSectionProps) {
  return (
    <div className="space-y-8">
      {/* Five Numbered Takeaways Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
        {items.map((item, idx) => (
          <div
            key={item.number}
            className={`p-5 rounded-xl bg-dark-surface border border-dark-borderSubtle hover:border-dark-border transition-colors flex flex-col justify-between space-y-3 ${
              idx === items.length - 1 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-accent-blue bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20 tabular-nums">
                0{item.number}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-warm-muted">
                Principle
              </span>
            </div>

            <p className="text-xs sm:text-sm text-warm-gray leading-relaxed font-normal">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Closing Line Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-dark-surface2 border border-dark-borderSubtle text-center">
        <p className="font-sans text-xs sm:text-sm font-medium text-warm-white italic">
          &ldquo;{closingLine}&rdquo;
        </p>
      </div>

      {/* Where this shows up in my work */}
      <div className="space-y-3 pt-4 border-t border-dark-borderSubtle">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="uppercase tracking-wider text-warm-muted">
            Where this shows up in my work
          </span>
          <span className="text-warm-muted">Applied Portfolio Case Studies</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
          {whereItShowsUp.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="p-5 rounded-xl bg-dark-surface border border-dark-borderSubtle hover:border-dark-border hover:bg-dark-surface2 transition-colors group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent-blue font-medium">
                    Portfolio application
                  </span>
                  <FiArrowRight
                    className="w-3.5 h-3.5 text-warm-muted group-hover:text-warm-white group-hover:translate-x-0.5 transition-all"
                    aria-hidden="true"
                  />
                </div>
                <h4 className="text-base font-semibold text-warm-white group-hover:text-accent-blue transition-colors">
                  {link.title}
                </h4>
                <p className="text-xs text-warm-gray font-normal leading-relaxed">
                  {link.annotation}
                </p>
              </div>

              <div className="pt-1 font-mono text-[11px] text-accent-blue flex items-center gap-1 group-hover:underline">
                <span>View Full Case Study</span>
                <FiArrowRight className="w-3 h-3" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
