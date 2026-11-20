"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiArrowLeft,
  FiArrowRight,
  FiMaximize2,
} from "react-icons/fi";
import { GalleryImage } from "@/data/zee-banglasonar";

interface ZeeGalleryLightboxProps {
  recapPanels: GalleryImage[];
  extendedPanels: GalleryImage[];
  independentAnalysisNote?: string;
  lightboxIndex: number | null;
  onCloseLightbox: () => void;
  onOpenLightbox: (index: number) => void;
}

export default function ZeeGalleryLightbox({
  recapPanels,
  extendedPanels,
  independentAnalysisNote,
  lightboxIndex,
  onCloseLightbox,
  onOpenLightbox,
}: ZeeGalleryLightboxProps) {
  // Collapsible state for extended gallery (03 to 07)
  const [isOpen, setIsOpen] = useState(true);

  // Combine all images for continuous lightbox navigation (01 to 07)
  const allImages = [...recapPanels, ...extendedPanels];

  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Navigate lightbox
  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    const prev = lightboxIndex > 0 ? lightboxIndex - 1 : allImages.length - 1;
    onOpenLightbox(prev);
  }, [lightboxIndex, allImages.length, onOpenLightbox]);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    const next = lightboxIndex < allImages.length - 1 ? lightboxIndex + 1 : 0;
    onOpenLightbox(next);
  }, [lightboxIndex, allImages.length, onOpenLightbox]);

  // Focus trap & keyboard listeners for lightbox
  useEffect(() => {
    if (lightboxIndex === null) {
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
        previouslyFocusedElement.current = null;
      }
      return;
    }

    // Save active element to restore focus on close
    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    // Focus close button initially
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      } else if (e.key === "Tab") {
        // Focus trap inside modal
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, onCloseLightbox, showPrev, showNext]);

  const activeImage = lightboxIndex !== null ? allImages[lightboxIndex] : null;

  return (
    <section
      id="insights-gallery"
      className="py-14 border-b border-dark-borderSubtle space-y-8"
      aria-labelledby="gallery-heading"
    >
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 font-mono text-xs">
          <span className="uppercase tracking-wider text-warm-muted">
            05 / Dashboard Evidence
          </span>
          <span className="text-warm-muted">·</span>
          <span className="text-accent-blue font-medium">
            Screenshots Gallery
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2
              id="gallery-heading"
              className="text-2xl sm:text-3xl font-semibold font-sans tracking-tight text-warm-white"
            >
              Instagram Insights Gallery
            </h2>
            <p className="text-xs sm:text-sm text-warm-gray mt-1">
              Complete visual documentation from the account dashboard (Panels 03 through 07).
            </p>
          </div>

          {/* Toggle Collapsible Gallery */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="extended-gallery-content"
            className="min-h-[38px] self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-dark-borderSubtle bg-dark-surface2 text-xs font-mono text-warm-gray hover:text-warm-white hover:border-dark-border transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue"
          >
            <span>{isOpen ? "Hide extended panels" : "Show all 5 extended panels"}</span>
            {isOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Collapsible Extended Gallery (Panels 03 through 07) */}
      {isOpen && (
        <div
          id="extended-gallery-content"
          className="space-y-6 pt-1"
        >
          <div className="flex items-center justify-between text-xs font-mono text-warm-muted">
            <span>
              Showing <span className="text-warm-white tabular-nums">{extendedPanels.length}</span> additional dashboard views
            </span>
            <span>Tap any screenshot to open high-resolution lightbox</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {extendedPanels.map((panel, idx) => {
              // Global index in allImages array is recapPanels.length + idx
              const globalIndex = recapPanels.length + idx;

              return (
                <figure
                  key={panel.id}
                  className={`group rounded-xl bg-dark-surface border overflow-hidden p-4 sm:p-5 flex flex-col justify-between hover:border-dark-border transition-colors ${
                    panel.id === "03"
                      ? "border-amber-500/30 bg-amber-500/[0.02]"
                      : "border-dark-borderSubtle"
                  }`}
                >
                  {/* Click-to-enlarge wrapper */}
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label={`Enlarge image: ${panel.caption}`}
                    onClick={() => onOpenLightbox(globalIndex)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onOpenLightbox(globalIndex);
                      }
                    }}
                    className="relative cursor-pointer overflow-hidden rounded-lg bg-dark-surface2 border border-dark-borderSubtle aspect-[4/3] flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue"
                  >
                    <picture className="w-full h-full flex items-center justify-center">
                      <source
                        type="image/webp"
                        srcSet={`/work/zee-banglasonar/${panel.small} 800w, /work/zee-banglasonar/${panel.file} 1200w`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      />
                      <img
                        src={`/work/zee-banglasonar/${panel.file}`}
                        alt={panel.alt}
                        width={panel.width}
                        height={panel.height}
                        loading="lazy"
                        className="w-full h-full object-contain p-2"
                      />
                    </picture>

                    <div className="absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="px-3 py-1.5 rounded-md bg-dark-surface text-warm-white font-mono text-xs border border-dark-border flex items-center gap-1.5">
                        <FiMaximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge</span>
                      </span>
                    </div>
                  </div>

                  {/* Caption & Metadata */}
                  <figcaption className="mt-3.5 space-y-2">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span
                        className={`uppercase tracking-wider font-medium px-2 py-0.5 rounded ${
                          panel.id === "03"
                            ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                            : "bg-dark-surface2 text-warm-white border border-dark-borderSubtle"
                        }`}
                      >
                        {panel.badge || `Panel ${panel.id}`}
                      </span>
                      <span className="text-warm-muted tabular-nums">
                        {panel.width} × {panel.height}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-warm-white">
                      {panel.caption}
                    </p>

                    {/* Specific required custom range notice for Panel 03 */}
                    {panel.customRangeNotice && (
                      <p className="text-[11px] font-mono text-amber-300/90 bg-amber-500/10 p-2 rounded-md border border-amber-500/20 leading-relaxed">
                        {panel.customRangeNotice}
                      </p>
                    )}

                    <p className="text-[11px] text-warm-muted line-clamp-2 font-normal">
                      {panel.alt}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      )}

      {/* Accessible Lightbox Modal */}
      {lightboxIndex !== null && activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image lightbox: ${activeImage.caption}`}
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-6"
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onCloseLightbox}
            aria-label="Close lightbox (Esc)"
            className="absolute top-4 right-4 z-50 min-h-[38px] min-w-[38px] rounded-md bg-dark-surface2 hover:bg-dark-surface text-warm-white flex items-center justify-center transition-colors border border-dark-borderSubtle"
          >
            <FiX className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Previous image button */}
          <button
            type="button"
            onClick={showPrev}
            aria-label="Previous image (Left arrow)"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 min-h-[40px] min-w-[40px] rounded-md bg-dark-surface2 hover:bg-dark-surface text-warm-white flex items-center justify-center transition-colors border border-dark-borderSubtle"
          >
            <FiArrowLeft className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Next image button */}
          <button
            type="button"
            onClick={showNext}
            aria-label="Next image (Right arrow)"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 min-h-[40px] min-w-[40px] rounded-md bg-dark-surface2 hover:bg-dark-surface text-warm-white flex items-center justify-center transition-colors border border-dark-borderSubtle"
          >
            <FiArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Modal Content */}
          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center space-y-3">
            <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden">
              <picture className="max-h-[70vh] flex items-center justify-center">
                <source
                  type="image/webp"
                  srcSet={`/work/zee-banglasonar/${activeImage.small} 800w, /work/zee-banglasonar/${activeImage.file} 1200w`}
                  sizes="(max-width: 768px) 100vw, 900px"
                />
                <img
                  src={`/work/zee-banglasonar/${activeImage.file}`}
                  alt={activeImage.alt}
                  width={activeImage.width}
                  height={activeImage.height}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-xl border border-dark-borderSubtle"
                />
              </picture>
            </div>

            {/* Lightbox Caption & Info */}
            <div className="text-center max-w-2xl space-y-1.5 px-4 font-mono text-xs">
              <div className="flex items-center justify-center gap-3">
                <span className="uppercase px-2 py-0.5 rounded bg-dark-surface2 text-warm-white border border-dark-borderSubtle">
                  Panel {activeImage.id} of {allImages.length}
                </span>
                <span className="text-warm-muted tabular-nums">
                  {activeImage.width} × {activeImage.height}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-semibold text-warm-white font-sans">
                {activeImage.caption}
              </h3>

              {activeImage.customRangeNotice && (
                <p className="text-xs text-amber-300 bg-amber-500/10 p-2 rounded-md border border-amber-500/20">
                  {activeImage.customRangeNotice}
                </p>
              )}

              <p className="text-xs text-warm-muted font-normal leading-relaxed font-sans">
                {activeImage.alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
