"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMaximize2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
  FiZoomOut,
  FiCheckCircle,
  FiCalendar,
  FiMapPin,
  FiFileText,
  FiShield,
  FiLock,
  FiEye,
} from "react-icons/fi";

export interface ExperienceCertificate {
  id: string;
  company: string;
  role: string;
  dateRange: string;
  documentType: string;
  location: string;
  description?: string;
  thumbSrc: string;
  fullSrc: string;
  downloadSrc: string;
  width: number;
  height: number;
  alt: string;
}

export const EXPERIENCE_CERTIFICATES: ExperienceCertificate[] = [
  {
    id: "mind-and-matter-internship-certificate",
    company: "Mind & Matter Marketing Solutions Pvt Ltd",
    role: "Digital Marketing Intern",
    dateRange: "04 Feb 2026 – 18 Aug 2026",
    documentType: "Internship Completion Certificate",
    location: "Kolkata, IN",
    description: "Internship completion certificate verifying full-time contributions across client content strategies, social scheduling, and Meta ad campaign support.",
    thumbSrc: "/certs/mind-and-matter-internship-certificate-thumb.webp",
    fullSrc: "/certs/mind-and-matter-internship-certificate.webp",
    downloadSrc: "/certs/full/mind-and-matter-internship-certificate.jpg",
    width: 1098,
    height: 1580,
    alt: "Mind & Matter Marketing Solutions Internship Completion Certificate",
  },
  {
    id: "q3-infotech-experience-letter",
    company: "Q3 Infotech Pvt. Ltd.",
    role: "Jr. Software Engineer",
    dateRange: "02 Apr 2025 – 13 Oct 2025",
    documentType: "Experience Letter",
    location: "Gurgaon, IN",
    description: "Relieving and experience letter documenting software engineering tenure, client CRM project contributions, and technical conduct.",
    thumbSrc: "/certs/q3-infotech-experience-letter-thumb.webp",
    fullSrc: "/certs/q3-infotech-experience-letter.webp",
    downloadSrc: "/certs/full/q3-infotech-experience-letter.jpg",
    width: 1216,
    height: 1564,
    alt: "Q3 Infotech Experience Letter",
  },
  {
    id: "jrd-digital-marketing-certificate",
    company: "JRD (jrd.cz)",
    role: "Digital Marketing Intern",
    dateRange: "01 Dec 2024 – 31 Jan 2025",
    documentType: "Certificate of Completion",
    location: "Remote / Czech Republic",
    description: "Certificate of completion recognizing research in digital marketing fundamentals, keyword targeting, and competitive audits.",
    thumbSrc: "/certs/jrd-digital-marketing-certificate-thumb.webp",
    fullSrc: "/certs/jrd-digital-marketing-certificate.webp",
    downloadSrc: "/certs/full/jrd-digital-marketing-certificate.jpg",
    width: 1140,
    height: 1600,
    alt: "JRD Digital Marketing Certificate of Completion",
  },
  {
    id: "wipro-wase-testimonial",
    company: "Wipro Limited (Wipro Academy of Software Excellence)",
    role: "Student, Computer Applications",
    dateRange: "27 Sep 2021 – 08 Mar 2024",
    documentType: "Testimonial",
    location: "Bengaluru / Kolkata, IN",
    description: "Official testimonial letter confirming tenure in the WASE higher education work-integrated program and quality engineering roles.",
    thumbSrc: "/certs/wipro-wase-testimonial-thumb.webp",
    fullSrc: "/certs/wipro-wase-testimonial.webp",
    downloadSrc: "/certs/full/wipro-wase-testimonial.jpg",
    width: 1238,
    height: 1592,
    alt: "Wipro Limited WASE Testimonial Letter",
  },
];

export default function ExperienceCertificates() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeCert = activeIndex !== null ? EXPERIENCE_CERTIFICATES[activeIndex] : null;

  const showPrev = useCallback(() => {
    setIsZoomed(false);
    setActiveIndex((prev) =>
      prev === null ? null : prev > 0 ? prev - 1 : EXPERIENCE_CERTIFICATES.length - 1
    );
  }, []);

  const showNext = useCallback(() => {
    setIsZoomed(false);
    setActiveIndex((prev) =>
      prev === null ? null : prev < EXPERIENCE_CERTIFICATES.length - 1 ? prev + 1 : 0
    );
  }, []);

  const closeModal = useCallback(() => {
    setIsZoomed(false);
    const lastIdx = activeIndex;
    setActiveIndex(null);
    if (lastIdx !== null && triggerButtonRefs.current[lastIdx]) {
      setTimeout(() => {
        triggerButtonRefs.current[lastIdx]?.focus();
      }, 50);
    }
  }, [activeIndex]);

  // Keyboard navigation & focus trap
  useEffect(() => {
    if (activeIndex === null) return;

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent inspection shortcuts inside modal
      if (
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) &&
          e.shiftKey &&
          ["I", "i", "J", "j", "C", "c"].includes(e.key)) ||
        ((e.ctrlKey || e.metaKey) && ["u", "U", "s", "S"].includes(e.key))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      } else if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIndex, closeModal, showPrev, showNext]);

  return (
    <section id="certificates" className="no-print print:hidden space-y-6 pt-6 border-t border-dark-borderSubtle scroll-mt-28">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
            <span className="uppercase tracking-wider text-warm-muted">
              05 / Experience Certificates
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FiCheckCircle size={10} />
              <span>Verified Documents</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-sans font-semibold text-warm-white tracking-tight">
            Work Experience Letters &amp; Credentials
          </h2>
          <p className="text-xs sm:text-sm text-warm-gray mt-1 max-w-2xl leading-relaxed font-normal">
            Primary verification documents issued by employers and organizations, documenting roles, tenures, and performance.
          </p>
        </div>

        <span className="font-mono text-xs text-warm-muted shrink-0 hidden sm:block tabular-nums">
          {EXPERIENCE_CERTIFICATES.length} Certificates · High-Res Lightbox
        </span>
      </div>

      {/* Responsive Cards Grid (1 col mobile, 2 col tablet+) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {EXPERIENCE_CERTIFICATES.map((cert, index) => (
          <article
            key={cert.id}
            className="group rounded-xl bg-dark-surface border border-dark-borderSubtle hover:border-dark-border transition-colors flex flex-col justify-between overflow-hidden"
          >
            <div>
              {/* Thumbnail Container */}
              <div
                onClick={() => {
                  setActiveIndex(index);
                  setIsZoomed(false);
                }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ WebkitUserSelect: "none", userSelect: "none" }}
                className="relative w-full aspect-[4/3] bg-dark-surface2 border-b border-dark-borderSubtle flex items-center justify-center p-4 cursor-pointer overflow-hidden group/thumb select-none"
              >
                <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                  <Image
                    src={cert.thumbSrc}
                    alt={cert.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-contain drop-shadow-sm pointer-events-none select-none transition-opacity duration-300"
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                {/* Protective Shield against Right-Click & Drag */}
                <div
                  className="absolute inset-0 z-10"
                  onContextMenu={(e) => e.preventDefault()}
                />

                {/* Subtle Hover Action Pill */}
                <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-dark-surface text-warm-white font-mono text-xs border border-dark-border shadow-md">
                    <FiMaximize2 size={12} />
                    <span>View Document</span>
                  </span>
                </div>

                {/* Document Type Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded bg-dark-surface/90 border border-dark-borderSubtle font-mono text-[10px] text-warm-white font-normal">
                    {cert.documentType}
                  </span>
                </div>

                {/* Order Index */}
                <div className="absolute top-3 right-3">
                  <span className="font-mono text-[10px] text-warm-muted tabular-nums">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Card Meta Body */}
              <div className="p-5 sm:p-6 space-y-2.5">
                <div className="space-y-0.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent-blue font-medium block">
                    {cert.role}
                  </span>
                  <h3 className="text-base font-sans font-semibold text-warm-white group-hover:text-accent-blue transition-colors leading-snug">
                    {cert.company}
                  </h3>
                </div>

                <div className="pt-0.5 flex flex-wrap items-center gap-y-1 gap-x-3 font-mono text-xs text-warm-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar size={12} className="shrink-0 text-warm-muted" />
                    <span>{cert.dateRange}</span>
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiMapPin size={12} className="shrink-0 text-warm-muted" />
                    <span>{cert.location}</span>
                  </span>
                </div>

                {cert.description && (
                  <p className="text-xs text-warm-gray font-normal leading-relaxed pt-0.5">
                    {cert.description}
                  </p>
                )}
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="p-5 sm:p-6 pt-0 flex items-center justify-between border-t border-dark-borderSubtle/60 mt-1 font-mono text-xs">
              <span className="text-warm-muted inline-flex items-center gap-1">
                <FiFileText size={11} />
                <span>Verified Copy</span>
              </span>

              <button
                ref={(el) => {
                  triggerButtonRefs.current[index] = el;
                }}
                onClick={() => {
                  setActiveIndex(index);
                  setIsZoomed(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-dark-borderSubtle bg-dark-surface2 hover:border-dark-border text-warm-white transition-colors"
              >
                <span>View Certificate</span>
                <FiMaximize2 size={12} className="text-warm-muted" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Accessible Full-Resolution Lightbox Modal */}
      <AnimatePresence>
        {activeCert && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeCert.company} - ${activeCert.documentType}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div
              ref={modalRef}
              className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#111112] border border-white/[0.12] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-[#161618]">
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/[0.08] text-warm-white font-semibold shrink-0">
                    {activeIndex + 1} / {EXPERIENCE_CERTIFICATES.length}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-sans font-bold text-warm-white truncate">
                      {activeCert.company}
                    </h3>
                    <p className="font-mono text-[11px] text-warm-muted truncate">
                      {activeCert.documentType} · {activeCert.dateRange}
                    </p>
                  </div>
                </div>

                {/* Top Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Zoom Toggle */}
                  <button
                    onClick={() => setIsZoomed((prev) => !prev)}
                    className="p-2 rounded-lg border border-white/[0.1] hover:border-white/30 text-warm-white hover:bg-white/[0.06] transition-colors"
                    title={isZoomed ? "Zoom out (fit to screen)" : "Zoom in (100% scale)"}
                    aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                  >
                    {isZoomed ? <FiZoomOut size={16} /> : <FiZoomIn size={16} />}
                  </button>

                  {/* Protected View Indicator */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono uppercase tracking-wider text-emerald-400 select-none">
                    <FiShield size={13} />
                    <span className="hidden sm:inline font-semibold">Protected View</span>
                  </div>

                  {/* Close Button */}
                  <button
                    ref={closeButtonRef}
                    onClick={closeModal}
                    className="p-2 rounded-lg border border-white/[0.1] hover:border-white/30 text-warm-white hover:bg-white/[0.06] transition-colors ml-1"
                    title="Close (Esc)"
                    aria-label="Close modal"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Viewport Area */}
              <div
                className={`relative flex-1 overflow-auto bg-[#0a0a0b] flex items-center justify-center p-4 sm:p-8 min-h-[380px] max-h-[calc(92vh-130px)] select-none ${
                  isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed((prev) => !prev)}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ WebkitUserSelect: "none", userSelect: "none" }}
              >
                <div
                  className={`relative transition-all duration-300 flex items-center justify-center select-none ${
                    isZoomed
                      ? "w-full max-w-none scale-125 my-8"
                      : "w-full h-full max-h-[72vh] max-w-3xl"
                  }`}
                  style={{
                    aspectRatio: `${activeCert.width} / ${activeCert.height}`,
                    WebkitUserSelect: "none",
                    userSelect: "none",
                  }}
                >
                  <Image
                    src={activeCert.fullSrc}
                    alt={activeCert.alt}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-contain drop-shadow-2xl rounded-sm pointer-events-none select-none"
                    priority
                    draggable={false}
                  />

                  {/* Invisible Protective Shield over Certificate Image */}
                  <div
                    className="absolute inset-0 z-10"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>

                {/* Prev Navigation Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/75 hover:bg-black border border-white/[0.15] text-warm-white transition-all hover:scale-105 shadow-xl backdrop-blur-md"
                  aria-label="Previous certificate"
                  title="Previous (Left Arrow)"
                >
                  <FiChevronLeft size={20} />
                </button>

                {/* Next Navigation Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/75 hover:bg-black border border-white/[0.15] text-warm-white transition-all hover:scale-105 shadow-xl backdrop-blur-md"
                  aria-label="Next certificate"
                  title="Next (Right Arrow)"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>

              {/* Modal Bottom Metadata Bar */}
              <div className="px-5 py-3 border-t border-white/[0.08] bg-[#161618] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs text-warm-muted select-none">
                <div className="flex items-center gap-3">
                  <span className="text-warm-white font-medium">
                    {activeCert.role} · {activeCert.location}
                  </span>
                  <span>·</span>
                  <span>Intrinsic: {activeCert.width} × {activeCert.height}px</span>
                </div>

                <div className="flex items-center gap-4 text-[11px]">
                  <span className="hidden md:inline text-warm-muted">
                    Tip: Use Left/Right arrows to navigate, Esc to close
                  </span>
                  <span className="text-warm-muted inline-flex items-center gap-1.5">
                    <FiLock size={12} className="text-emerald-400" />
                    <span>Protected Document · View Only</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
