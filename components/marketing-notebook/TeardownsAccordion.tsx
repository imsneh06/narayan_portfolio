"use client";

import React, { useState } from "react";
import { FiChevronDown, FiExternalLink, FiCheckCircle } from "react-icons/fi";
import { TeardownItem } from "@/data/marketing-notebook";

interface TeardownsAccordionProps {
  items: TeardownItem[];
  note: string;
}

export default function TeardownsAccordion({ items, note }: TeardownsAccordionProps) {
  // Open the first item by default, allow multiple or single toggles
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    [items[0]?.id || ""]: true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Small Section Note */}
      <p className="text-xs font-mono text-warm-muted leading-relaxed">
        {note}
      </p>

      {/* Accordion List */}
      <div className="space-y-4">
        {items.map((item, idx) => {
          const isOpen = !!openItems[item.id];

          return (
            <div
              key={item.id}
              className="rounded-xl border border-dark-borderSubtle bg-dark-surface overflow-hidden transition-colors"
            >
              {/* Accordion Header / Trigger Button */}
              <button
                type="button"
                id={`accordion-btn-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.id}`}
                onClick={() => toggleItem(item.id)}
                className="w-full min-h-[48px] p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-dark-surface2/50 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="text-accent-blue font-semibold tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-dark-surface2 text-warm-white border border-dark-borderSubtle font-medium">
                      {item.brand}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-dark-surface2 text-warm-muted border border-dark-borderSubtle">
                      {item.format}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold font-sans text-warm-white leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
                  <span className="text-xs font-mono text-warm-muted hidden md:inline">
                    {isOpen ? "Collapse" : "Expand"}
                  </span>
                  <div className="w-7 h-7 rounded-md bg-dark-surface2 border border-dark-borderSubtle flex items-center justify-center text-warm-gray">
                    <FiChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </button>

              {/* Accordion Content Panel */}
              <div
                id={`accordion-content-${item.id}`}
                role="region"
                aria-labelledby={`accordion-btn-${item.id}`}
                className={`p-4 sm:p-5 pt-0 border-t border-dark-borderSubtle space-y-4 bg-dark-surface2/30 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                {/* Source Link */}
                <div className="pt-3 flex items-center justify-between font-mono text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-warm-muted">
                    Original reference
                  </span>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent-blue hover:underline"
                  >
                    <span>{item.sourceLabel}</span>
                    <FiExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>

                {/* What Stood Out Bullets */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-warm-muted">
                    What stood out
                  </h4>
                  <ul className="space-y-1.5 font-sans">
                    {item.whatStoodOut.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-warm-gray leading-relaxed font-normal"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Takeaway Box */}
                <div className="p-3.5 sm:p-4 rounded-lg bg-dark-surface2 border border-dark-borderSubtle space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent-blue font-medium block">
                    Core takeaway
                  </span>
                  <p className="text-xs sm:text-sm text-warm-white italic leading-relaxed">
                    &ldquo;{item.takeaway}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
