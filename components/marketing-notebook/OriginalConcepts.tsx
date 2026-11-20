"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiMaximize2,
  FiX,
  FiFilm,
  FiImage,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
import {
  ConceptAData,
  ConceptBData,
  ConceptCData,
} from "@/data/marketing-notebook";

interface OriginalConceptsProps {
  conceptA: ConceptAData;
  conceptB: ConceptBData;
  conceptC: ConceptCData;
}

export default function OriginalConcepts({
  conceptA,
  conceptB,
  conceptC,
}: OriginalConceptsProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Keyboard navigation & focus trap for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setLightboxOpen(false);
      } else if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="space-y-10">
      {/* ─── CONCEPT A: REEL STORYBOARD ─── */}
      <div className="rounded-2xl border border-dark-borderSubtle bg-dark-surface overflow-hidden">
        {/* Header Row */}
        <div className="p-6 sm:p-8 border-b border-dark-borderSubtle bg-dark-surface2/40 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-md bg-dark-surface2 text-warm-white border border-dark-border font-medium">
              Concept A
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-dark-surface2 text-warm-gray border border-dark-borderSubtle flex items-center gap-1.5">
              <FiFilm className="w-3.5 h-3.5 text-warm-muted" aria-hidden="true" />
              <span>{conceptA.format}</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold font-sans text-warm-white">
            {conceptA.title}
          </h3>

          <div className="pt-0.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-warm-muted block mb-1">
              Campaign objective
            </span>
            <p className="text-xs sm:text-sm text-warm-gray font-normal leading-relaxed">
              {conceptA.objective}
            </p>
          </div>
        </div>

        {/* Storyboard Content */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="font-mono text-xs uppercase tracking-wider text-warm-muted">
              Six-Step Narrative Storyboard
            </h4>
            <span className="text-xs font-mono text-warm-muted">Sequential Cuts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {conceptA.storyboard.map((item) => (
              <div
                key={item.step}
                className="p-4 sm:p-5 rounded-xl bg-dark-surface2 border border-dark-borderSubtle space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded bg-dark-surface border border-dark-borderSubtle text-warm-white font-mono text-[11px] font-medium flex items-center justify-center tabular-nums">
                    0{item.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-warm-muted">
                    {item.title}
                  </span>
                </div>
                <p className="text-xs text-warm-gray font-normal leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Details: CTA & Visual Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-3 border-t border-dark-borderSubtle text-xs">
            <div className="p-3.5 rounded-lg bg-dark-surface2 border border-dark-borderSubtle space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-warm-muted block">
                Primary Call to Action
              </span>
              <p className="font-sans font-medium text-warm-white">
                &ldquo;{conceptA.cta}&rdquo;
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-dark-surface2 border border-dark-borderSubtle space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-warm-muted block">
                Visual &amp; Lighting Direction
              </span>
              <p className="text-warm-gray font-normal">
                {conceptA.visualStyle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CONCEPT B: SPLIT POSTER WITH ACCESSIBLE LIGHTBOX ─── */}
      <div className="rounded-2xl border border-dark-borderSubtle bg-dark-surface overflow-hidden">
        {/* Header Row */}
        <div className="p-6 sm:p-8 border-b border-dark-borderSubtle bg-dark-surface2/40 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-md bg-dark-surface2 text-warm-white border border-dark-border font-medium">
              Concept B
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-dark-surface2 text-warm-gray border border-dark-borderSubtle flex items-center gap-1.5">
              <FiImage className="w-3.5 h-3.5 text-warm-muted" aria-hidden="true" />
              <span>{conceptB.format}</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold font-sans text-warm-white">
            {conceptB.title}
          </h3>

          <div className="pt-0.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-warm-muted block mb-1">
              Campaign objective
            </span>
            <p className="text-xs sm:text-sm text-warm-gray font-normal leading-relaxed">
              {conceptB.objective}
            </p>
          </div>
        </div>

        {/* Poster Visual + Copy Analysis */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Poster Image */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div
              tabIndex={0}
              role="button"
              aria-label={`Enlarge image: ${conceptB.image.caption}`}
              onClick={() => setLightboxOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLightboxOpen(true);
                }
              }}
              className="relative w-full aspect-[1131/1600] max-h-[500px] bg-dark-surface2 rounded-xl overflow-hidden border border-dark-borderSubtle cursor-pointer group focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue"
            >
              <picture className="w-full h-full flex items-center justify-center">
                <source
                  type="image/webp"
                  srcSet={`/work/marketing-notebook/${conceptB.image.small} 800w, /work/marketing-notebook/${conceptB.image.file} 1131w`}
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <img
                  src={`/work/marketing-notebook/${conceptB.image.file}`}
                  alt={conceptB.image.alt}
                  width={conceptB.image.width}
                  height={conceptB.image.height}
                  loading="lazy"
                  className="w-full h-full object-contain p-2"
                />
              </picture>

              <div className="absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="px-3 py-1.5 rounded-md bg-dark-surface text-warm-white font-mono text-xs border border-dark-border flex items-center gap-1.5">
                  <FiMaximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Enlarge</span>
                </span>
              </div>
            </div>

            <p className="mt-2 text-center text-[11px] font-mono text-warm-muted">
              {conceptB.image.caption}
            </p>
          </div>

          {/* Poster Breakdown Content */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-warm-muted block">
                Creative idea &amp; environment contrast
              </span>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed font-normal">
                {conceptB.idea}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-dark-surface2 border border-dark-borderSubtle space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent-blue font-medium block">
                Headline pairing
              </span>
              <h4 className="text-base sm:text-lg font-medium text-warm-white">
                &ldquo;{conceptB.headline}&rdquo;
              </h4>
              <p className="text-xs text-warm-muted font-normal italic">
                Alternate line: &ldquo;{conceptB.alternateLine}&rdquo;
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-warm-muted block">
                Strategic thinking
              </span>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed font-normal">
                {conceptB.thinking}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
              <div className="px-2.5 py-1 rounded-md bg-dark-surface2 border border-dark-borderSubtle">
                <span className="text-warm-muted">Soft CTA: </span>
                <span className="text-warm-white font-medium">{conceptB.cta}</span>
              </div>

              <Link
                href={conceptB.linkHref}
                className="inline-flex items-center gap-1 text-accent-blue hover:underline"
              >
                <span>{conceptB.linkText}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CONCEPT C: TOPICAL REEL TIMELINE ─── */}
      <div className="rounded-2xl border border-dark-borderSubtle bg-dark-surface overflow-hidden">
        {/* Header Row */}
        <div className="p-6 sm:p-8 border-b border-dark-borderSubtle bg-dark-surface2/40 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-md bg-dark-surface2 text-warm-white border border-dark-border font-medium">
              Concept C
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-dark-surface2 text-warm-gray border border-dark-borderSubtle flex items-center gap-1.5">
              <FiClock className="w-3.5 h-3.5 text-warm-muted" aria-hidden="true" />
              <span>{conceptC.format}</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold font-sans text-warm-white">
            {conceptC.title}
          </h3>

          <p className="text-xs sm:text-sm text-warm-gray font-normal leading-relaxed">
            {conceptC.subtitle}
          </p>

          <div className="pt-0.5 flex flex-wrap items-center gap-3 text-xs font-mono text-warm-muted">
            <span>Tone: <strong className="text-warm-white font-medium">{conceptC.tone}</strong></span>
            <span>·</span>
            <span className="italic">{conceptC.disclaimer}</span>
          </div>
        </div>

        {/* Timeline Flow */}
        <div className="p-6 sm:p-8 space-y-5">
          <h4 className="font-mono text-xs uppercase tracking-wider text-warm-muted">
            Second-by-Second Video Flow
          </h4>

          <div className="space-y-3">
            {conceptC.timeline.map((segment, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-xl border transition-colors flex flex-col md:flex-row md:items-start gap-4 ${
                  segment.isToBeDeveloped
                    ? "bg-dark-surface2/30 border-dashed border-dark-borderSubtle opacity-75"
                    : "bg-dark-surface2 border-dark-borderSubtle"
                }`}
              >
                <div className="min-w-[120px] shrink-0 font-mono space-y-0.5">
                  <span className="text-sm font-semibold text-warm-white block tabular-nums">
                    {segment.timeframe}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-accent-blue font-medium">
                    {segment.phase}
                  </span>
                </div>

                <div className="flex-1 space-y-2">
                  <p className="text-xs sm:text-sm text-warm-gray font-normal leading-relaxed">
                    {segment.description}
                  </p>

                  {segment.onScreenText && (
                    <div className="p-3 rounded-lg bg-dark-surface border border-dark-borderSubtle text-xs font-mono space-y-1">
                      <div className="text-warm-white font-medium">
                        On-screen: {segment.onScreenText}
                      </div>
                      {segment.subText && (
                        <div className="text-warm-muted">
                          Sub-text: {segment.subText}
                        </div>
                      )}
                    </div>
                  )}

                  {segment.isToBeDeveloped && (
                    <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-warm-muted bg-dark-surface px-2 py-0.5 rounded border border-dark-borderSubtle">
                      Segment to be developed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Lightbox Modal for Poster */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarge: ${conceptB.image.caption}`}
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-6"
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox (Esc)"
            className="absolute top-4 right-4 z-50 min-h-[38px] min-w-[38px] rounded-md bg-dark-surface2 hover:bg-dark-surface text-warm-white flex items-center justify-center transition-colors border border-dark-borderSubtle"
          >
            <FiX className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="max-w-3xl w-full max-h-[90vh] flex flex-col items-center justify-center space-y-3">
            <div className="relative w-full max-h-[75vh] flex items-center justify-center">
              <picture className="max-h-[75vh] flex items-center justify-center">
                <source
                  type="image/webp"
                  srcSet={`/work/marketing-notebook/${conceptB.image.small} 800w, /work/marketing-notebook/${conceptB.image.file} 1131w`}
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <img
                  src={`/work/marketing-notebook/${conceptB.image.file}`}
                  alt={conceptB.image.alt}
                  width={conceptB.image.width}
                  height={conceptB.image.height}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-xl border border-dark-borderSubtle"
                />
              </picture>
            </div>

            <p className="text-center text-xs font-mono text-warm-muted">
              {conceptB.image.caption} · {conceptB.image.width} × {conceptB.image.height}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
