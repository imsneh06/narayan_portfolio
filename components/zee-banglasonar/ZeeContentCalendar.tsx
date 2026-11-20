"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  FiCalendar,
  FiList,
  FiSearch,
  FiCopy,
  FiCheck,
  FiVideo,
  FiLayers,
  FiImage,
  FiFilter,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import {
  CalendarEntry,
  ContentPillar,
  ContentFormat,
  PillarMeta,
} from "@/data/zee-banglasonar";

interface ZeeContentCalendarProps {
  entries: CalendarEntry[];
  pillars: PillarMeta[];
}

// Days of week for grid starting Monday
const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// July 2026 starts on Wednesday: 0 = Mon, 1 = Tue, 2 = Wed -> offset is 2
const FIRST_DAY_OFFSET = 2;
const DAYS_IN_JULY = 31;

export default function ZeeContentCalendar({
  entries,
  pillars,
}: ZeeContentCalendarProps) {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selectedPillar, setSelectedPillar] = useState<ContentPillar | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedDate, setCopiedDate] = useState<string | null>(null);
  const [highlightedDate, setHighlightedDate] = useState<string | null>(null);
  const postRefs = useRef<Record<string, HTMLElement | null>>({});

  // Pillar styling lookup
  const pillarStyles = useMemo(() => {
    const map = new Map<ContentPillar, PillarMeta["colors"]>();
    pillars.forEach((p) => map.set(p.name, p.colors));
    return map;
  }, [pillars]);

  // Filter posts
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      if (selectedPillar && entry.pillar !== selectedPillar) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const searchable = [
          entry.title,
          entry.direction,
          entry.captionEn,
          entry.captionBn,
          entry.format,
          entry.pillar,
          entry.date,
        ]
          .join(" ")
          .toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [entries, selectedPillar, searchQuery]);

  // Copy caption: copies "captionEn (captionBn)"
  const handleCopyCaption = (entry: CalendarEntry) => {
    const copyText = `${entry.captionEn} (${entry.captionBn})`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(copyText).catch(() => {});
    }
    setCopiedDate(entry.date);
    setTimeout(() => {
      setCopiedDate(null);
    }, 2000);
  };

  // Jump from monthly grid to list view
  const handleSelectDay = (entryDate: string) => {
    setView("list");
    setSelectedPillar(null);
    setSearchQuery("");
    setHighlightedDate(entryDate);

    setTimeout(() => {
      const el = postRefs.current[entryDate];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus?.();
      }
    }, 120);

    setTimeout(() => {
      setHighlightedDate(null);
    }, 3000);
  };

  // Format icon helper
  const getFormatIcon = (format: ContentFormat) => {
    if (format === "Reel") {
      return <FiVideo className="w-3.5 h-3.5 shrink-0 text-pink-400" aria-hidden="true" />;
    }
    if (format.includes("carousel") || format === "Carousel") {
      return <FiLayers className="w-3.5 h-3.5 shrink-0 text-cyan-400" aria-hidden="true" />;
    }
    return <FiImage className="w-3.5 h-3.5 shrink-0 text-amber-400" aria-hidden="true" />;
  };

  // Custom badge styling per pillar
  const getPillarBadgeClasses = (pillar: ContentPillar) => {
    switch (pillar) {
      case "Promotional":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Entertainment":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Nostalgia & culture":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Community":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
  };

  const getPillarDotColor = (pillar: ContentPillar) => {
    switch (pillar) {
      case "Promotional":
        return "bg-blue-400";
      case "Entertainment":
        return "bg-purple-400";
      case "Nostalgia & culture":
        return "bg-amber-400";
      case "Community":
        return "bg-emerald-400";
    }
  };

  const getPillarBorderLeftColor = (pillar: ContentPillar) => {
    switch (pillar) {
      case "Promotional":
        return "border-l-blue-400";
      case "Entertainment":
        return "border-l-purple-400";
      case "Nostalgia & culture":
        return "border-l-amber-400";
      case "Community":
        return "border-l-emerald-400";
    }
  };

  return (
    <div
      id="content-calendar"
      className="rounded-2xl border border-dark-borderSubtle bg-dark-surface overflow-hidden transition-colors"
    >
      {/* Calendar Header Bar */}
      <div className="p-6 sm:p-8 bg-dark-surface text-warm-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-borderSubtle">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-mono text-warm-muted">
              Interactive July 2026 Grid
            </span>
            <span className="text-warm-muted">·</span>
            <span className="text-xs font-mono text-warm-muted tabular-nums">16 Concepts</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-warm-white">
            July 2026 Content Calendar
          </h3>
          <p className="text-xs sm:text-sm text-warm-gray max-w-xl font-normal">
            Bi-daily editorial framework combining serial drama, regional cinema nostalgia, audience polls, and tune-in schedules.
          </p>
        </div>

        {/* View Switcher: List vs Monthly Grid */}
        <div
          role="group"
          aria-label="Calendar view selector"
          className="inline-flex items-center self-start md:self-center bg-dark-surface2 p-1 rounded-lg border border-dark-borderSubtle shrink-0 font-mono text-xs"
        >
          <button
            type="button"
            id="view-list-toggle"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              view === "list"
                ? "bg-dark-surface text-warm-white border border-dark-border"
                : "text-warm-muted hover:text-warm-white"
            }`}
          >
            <FiList className="w-3.5 h-3.5" aria-hidden="true" />
            <span>List</span>
          </button>
          <button
            type="button"
            id="view-grid-toggle"
            aria-pressed={view === "calendar"}
            onClick={() => setView("calendar")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              view === "calendar"
                ? "bg-dark-surface text-warm-white border border-dark-border"
                : "text-warm-muted hover:text-warm-white"
            }`}
          >
            <FiCalendar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-6 border-b border-dark-borderSubtle bg-dark-bg/40 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <label htmlFor="calendar-search" className="sr-only">
              Search calendar concepts, captions, or Bengali text
            </label>
            <FiSearch
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-warm-muted"
              aria-hidden="true"
            />
            <input
              id="calendar-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, formats, or Bengali (e.g. কমেন্টে)..."
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-dark-borderSubtle bg-dark-surface text-xs font-mono text-warm-white placeholder-warm-muted focus:outline-none focus:border-dark-border transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-warm-muted hover:text-warm-white transition-colors"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick status count */}
          <div className="text-xs font-mono text-warm-muted shrink-0 self-center">
            Showing <span className="text-warm-white tabular-nums">{filteredEntries.length}</span> of {entries.length} concepts
          </div>
        </div>

        {/* Pillar Filter Chips */}
        <div
          role="group"
          aria-label="Pillar filters"
          className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs"
        >
          <span className="text-warm-muted mr-1 flex items-center gap-1.5">
            <FiFilter className="w-3 h-3" aria-hidden="true" />
            Pillars:
          </span>

          {/* All Filter */}
          <button
            type="button"
            id="filter-pillar-all"
            aria-pressed={selectedPillar === null}
            onClick={() => setSelectedPillar(null)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
              selectedPillar === null
                ? "bg-dark-surface2 text-warm-white border-dark-border font-medium"
                : "bg-dark-surface text-warm-muted border-dark-borderSubtle hover:text-warm-white"
            }`}
          >
            <span>All Pillars</span>
            <span className="text-[10px] text-warm-muted tabular-nums">
              {entries.length}
            </span>
          </button>

          {/* 4 Pillar Chips */}
          {pillars.map((p) => {
            const isSelected = selectedPillar === p.name;
            const count = entries.filter((e) => e.pillar === p.name).length;
            const dotClass = getPillarDotColor(p.name);

            return (
              <button
                key={p.name}
                type="button"
                id={`filter-pillar-${p.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                aria-pressed={isSelected}
                onClick={() => setSelectedPillar(isSelected ? null : p.name)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
                  isSelected
                    ? "bg-dark-surface2 text-warm-white border-dark-border font-medium"
                    : "bg-dark-surface text-warm-muted border-dark-borderSubtle hover:text-warm-white"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${dotClass} shrink-0`} aria-hidden="true" />
                <span>{p.name}</span>
                <span className="text-[10px] text-warm-muted tabular-nums">
                  {count}
                </span>
              </button>
            );
          })}

          {selectedPillar && (
            <button
              type="button"
              onClick={() => setSelectedPillar(null)}
              className="text-xs font-mono text-warm-white hover:underline ml-1"
            >
              Reset filter
            </button>
          )}
        </div>
      </div>

      {/* Calendar Body */}
      <div className="p-4 sm:p-6 md:p-8">
        {view === "list" ? (
          /* ================= LIST VIEW ================= */
          <div className="space-y-3.5" role="region" aria-label="Content calendar list view">
            {filteredEntries.length === 0 ? (
              <div className="py-14 text-center text-warm-muted space-y-2 font-mono">
                <p className="text-sm text-warm-white">
                  No concepts match your search or filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPillar(null);
                    setSearchQuery("");
                  }}
                  className="px-3 py-1.5 rounded-md bg-dark-surface2 text-warm-white text-xs border border-dark-borderSubtle hover:border-dark-border transition-colors"
                >
                  Clear search and filters
                </button>
              </div>
            ) : (
              filteredEntries.map((entry) => {
                const dayStr = entry.date.split("-")[2];
                const badgeClass = getPillarBadgeClasses(entry.pillar);
                const borderLeftClass = getPillarBorderLeftColor(entry.pillar);
                const isCopied = copiedDate === entry.date;
                const isHighlighted = highlightedDate === entry.date;

                return (
                  <article
                    key={entry.date}
                    id={`post-${entry.date}`}
                    ref={(el) => {
                      postRefs.current[entry.date] = el;
                    }}
                    tabIndex={-1}
                    className={`rounded-xl border transition-colors p-5 sm:p-6 bg-dark-surface border-l-2 ${borderLeftClass} ${
                      isHighlighted
                        ? "border-accent-blue bg-dark-surface2"
                        : "border-dark-borderSubtle hover:border-dark-border"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
                      {/* Date Badge */}
                      <div className="flex sm:flex-col items-center justify-center min-w-[64px] px-2.5 py-1.5 rounded-lg bg-dark-surface2 border border-dark-borderSubtle text-center self-start">
                        <span className="text-xl sm:text-2xl font-semibold text-warm-white font-mono leading-none tabular-nums">
                          {dayStr}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-warm-muted mt-1 font-mono">
                          Jul 2026
                        </span>
                      </div>

                      {/* Content Info */}
                      <div className="flex-1 min-w-0 space-y-2.5">
                        {/* Tags: Pillar + Format */}
                        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[11px] ${badgeClass}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${getPillarDotColor(
                                entry.pillar
                              )}`}
                              aria-hidden="true"
                            />
                            {entry.pillar}
                          </span>

                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-dark-surface2 text-warm-gray border border-dark-borderSubtle">
                            {getFormatIcon(entry.format)}
                            <span>{entry.format}</span>
                          </span>
                        </div>

                        {/* Title & Direction */}
                        <div className="space-y-1">
                          <h4 className="text-base sm:text-lg font-semibold font-sans text-warm-white leading-snug">
                            {entry.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-warm-gray leading-relaxed font-normal">
                            {entry.direction}
                          </p>
                        </div>

                        {/* Caption Concept Box */}
                        <div className="rounded-lg p-3.5 bg-dark-surface2 border border-dark-borderSubtle space-y-2">
                          <div className="flex items-center justify-between font-mono text-xs">
                            <span className="text-[11px] uppercase tracking-wider text-warm-muted">
                              Caption concept
                            </span>
                            {/* Copy button */}
                            <button
                              type="button"
                              onClick={() => handleCopyCaption(entry)}
                              aria-label={`Copy caption for ${entry.title}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border border-dark-borderSubtle bg-dark-surface text-warm-gray hover:text-warm-white hover:border-dark-border transition-colors"
                            >
                              {isCopied ? (
                                <>
                                  <FiCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                                  <span className="text-emerald-400 font-medium">Copied</span>
                                </>
                              ) : (
                                <>
                                  <FiCopy className="w-3.5 h-3.5 text-warm-muted" aria-hidden="true" />
                                  <span>Copy caption</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* English bold + Bengali in parentheses */}
                          <div className="space-y-1 pt-0.5">
                            <p className="text-sm font-medium text-warm-white leading-relaxed">
                              &ldquo;{entry.captionEn}&rdquo;
                            </p>
                            <p
                              lang="bn"
                              className="text-sm text-warm-gray leading-relaxed font-bengali"
                            >
                              ({entry.captionBn})
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        ) : (
          /* ================= MONTHLY GRID VIEW (JULY 2026) ================= */
          <div className="space-y-4" role="region" aria-label="Content calendar monthly grid view">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-warm-white">
                  July 2026 Editorial Grid
                </h4>
                <p className="text-xs text-warm-muted">
                  Select any scheduled date to inspect camera direction and copy in list view.
                </p>
              </div>
              <span className="text-xs font-mono text-warm-muted">
                16 Posts scheduled on alternate days
              </span>
            </div>

            {/* DOW Headers (Mon-Sun) */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center border-b border-dark-borderSubtle pb-2">
              {DOW.map((day) => (
                <div
                  key={day}
                  className="text-[11px] font-mono uppercase tracking-wider text-warm-muted py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* 7-column Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {/* Leading offset for July 2026 */}
              {Array.from({ length: FIRST_DAY_OFFSET }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  aria-hidden="true"
                  className="min-h-[44px] sm:min-h-[80px] rounded-lg opacity-0"
                />
              ))}

              {/* 31 Days of July 2026 */}
              {Array.from({ length: DAYS_IN_JULY }).map((_, idx) => {
                const dayNum = idx + 1;
                const dateIso = `2026-07-${dayNum < 10 ? `0${dayNum}` : dayNum}`;
                const entry = entries.find((e) => e.date === dateIso);
                const isFilteredMatch = entry
                  ? filteredEntries.some((e) => e.date === entry.date)
                  : false;

                if (entry) {
                  const borderLeftClass = getPillarBorderLeftColor(entry.pillar);
                  const dotColor = getPillarDotColor(entry.pillar);

                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => handleSelectDay(entry.date)}
                      aria-label={`July ${dayNum}: ${entry.pillar} - ${entry.title}. Click to view in list.`}
                      className={`min-h-[44px] sm:min-h-[80px] p-1.5 sm:p-2 rounded-lg text-left border-l-2 ${borderLeftClass} border border-dark-borderSubtle bg-dark-surface hover:bg-dark-surface2 transition-colors flex flex-col justify-between group ${
                        !isFilteredMatch ? "opacity-30 hover:opacity-100" : "opacity-100"
                      }`}
                    >
                      {/* Date number + pillar dot */}
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono text-xs font-medium text-warm-white tabular-nums">
                          {dayNum}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${dotColor} shrink-0`}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Desktop only: Title snippet & format */}
                      <p className="hidden sm:block text-[11px] text-warm-gray group-hover:text-warm-white line-clamp-2 leading-tight">
                        {entry.title}
                      </p>

                      <div className="hidden sm:flex items-center justify-between font-mono text-[9px] text-warm-muted">
                        <span className="truncate">{entry.pillar}</span>
                      </div>
                    </button>
                  );
                }

                // Unsched day
                return (
                  <div
                    key={dayNum}
                    aria-label={`July ${dayNum}, no post scheduled`}
                    className="min-h-[44px] sm:min-h-[80px] p-1.5 sm:p-2 rounded-lg border border-dark-borderSubtle/40 bg-dark-surface2/30 text-warm-muted/50 text-xs font-mono flex flex-col justify-start tabular-nums"
                  >
                    <span>{dayNum}</span>
                  </div>
                );
              })}
            </div>

            {/* Pillar Legend */}
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-dark-borderSubtle text-xs font-mono text-warm-muted">
              <span className="text-warm-white">Pillar Legend:</span>
              {pillars.map((p) => (
                <div key={p.name} className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${getPillarDotColor(
                      p.name
                    )}`}
                    aria-hidden="true"
                  />
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
