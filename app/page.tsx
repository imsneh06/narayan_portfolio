"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiDownload,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
  FiLayers,
  FiFileText,
  FiExternalLink,
} from "react-icons/fi";
import { SiCanva } from "react-icons/si";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RobotMascot } from "@/components/RobotMascot";

interface HomeSlide {
  image: string;
  title: string;
  description: string;
}

interface SelectedWorkItem {
  num: string;
  client: string;
  project: string;
  contribution: string;
  type: string;
  image: string;
  aspect: string;
  stat: string;
  href: string;
  isCaseStudy: boolean;
  canvaUrl?: string;
  pdfUrl?: string;
  strategicRationale?: string;
  slides?: HomeSlide[];
}

const selectedWorks: SelectedWorkItem[] = [
  {
    num: "01",
    client: "Nivaas Living (Spec)",
    project: "“I’m Choosing a Life” Carousel Campaign",
    contribution: "Strategic Copywriting · Lifestyle Reframe · 4-Part Carousel",
    type: "REAL ESTATE CAMPAIGN",
    image: "/portfolio/nivaas-living-slide-1.jpg",
    aspect: "aspect-[16/10]",
    stat: "4-Slide Narrative Carousel · New Town, Kolkata",
    href: "/creative",
    isCaseStudy: false,
    canvaUrl: "https://canva.link/ohfs7p2x5f9dd7r",
    pdfUrl: "/portfolio/nivaas-living-campaign.pdf",
    strategicRationale:
      "Buyers aren’t buying square footage, they’re buying a way of living. The carousel shifts the question from “what does the flat have?” to “what will my days feel like?” — moving from a reframe (slide 1), to proof in everyday routines (slide 2), to emotional payoff (slide 3), to a call to action (slide 4).",
    slides: [
      {
        image: "/portfolio/nivaas-living-slide-1.jpg",
        title: "Slide 01 — The Reframe Hook",
        description:
          "WHEN YOU SAY: “I’m buying a house.” WE HEAR: “I’m choosing a life.” Establishing the emotional pivot over an evocative dusk shot of New Town, Kolkata.",
      },
      {
        image: "/portfolio/nivaas-living-slide-2.jpg",
        title: "Slide 02 — Proof in Everyday Routines",
        description:
          "WHAT THE BROCHURE LEAVES OUT — “Brochures sell you the flat. Not the mornings.” Grounding in everyday life: the 8:40 office cab, school bus at the gate, and Eco Park sunset walks.",
      },
      {
        image: "/portfolio/nivaas-living-slide-3.jpg",
        title: "Slide 03 — Emotional Lifestyle Payoff",
        description:
          "WHAT YOU’RE REALLY BUYING — “Not walls. Evenings.” Adda on the terrace with close friends, mudha seating, and neighbours who genuinely wave back.",
      },
      {
        image: "/portfolio/nivaas-living-slide-4.jpg",
        title: "Slide 04 — Direct Call to Action",
        description:
          "“Your next chapter deserves a place of its own.” Inviting buyers to picture their future life inside before scheduling a visit.",
      },
    ],
  },
  {
    num: "02",
    client: "The Sofa (Spec)",
    project: "“One Sofa, Three Moods” Editorial Campaign",
    contribution: "Editorial Art Direction · Atmospheric Micro-Copy · 3-Part Carousel",
    type: "LIFESTYLE CAMPAIGN",
    image: "/portfolio/one-sofa-slide-1.jpg",
    aspect: "aspect-[16/10]",
    stat: "3-Part Mood Sequence · Calm, Social, Nocturne",
    href: "/creative",
    isCaseStudy: false,
    canvaUrl: "https://canva.link/o4zwwyqm984rjbz",
    pdfUrl: "/portfolio/one-sofa-three-moods.pdf",
    strategicRationale:
      "Inspired by Sofology’s “Nothing Feels Like” campaign, which is built around the feeling of being on a sofa you love. It’s a good example of selling the feeling rather than the furniture, which is what this concept aimed for across three distinct moments of the day.",
    slides: [
      {
        image: "/portfolio/one-sofa-slide-1.jpg",
        title: "01 / 03 — CALM",
        description:
          "“Slow mornings. Soft light. Open windows. Nowhere to be.” Minimalist natural daylight creating an unhurried morning sanctuary.",
      },
      {
        image: "/portfolio/one-sofa-slide-2.jpg",
        title: "02 / 03 — SOCIAL",
        description:
          "“Golden hour. Warm glass. Easy laughter. One more round.” Radiating terracotta amber glow capturing after-work drinks and lively conversation.",
      },
      {
        image: "/portfolio/one-sofa-slide-3.jpg",
        title: "03 / 03 — NOCTURNE",
        description:
          "“After midnight. Low light. Deep thoughts. The whole night to yourself.” Moody indigo illumination and celestial moonlight celebrating quiet introspection.",
      },
    ],
  },
  {
    num: "03",
    client: "Shimontini (Spec)",
    project: "43-Reel Festive Reels Strategy",
    contribution: "43-Reel Content Strategy · Visual Hooks · Scriptwriting",
    type: "SPEC / CONTENT STRATEGY",
    image: "/portfolio/shimontini-cover.jpg",
    aspect: "aspect-[16/9]",
    stat: "43 Reel Scripts · Oct–Nov 2026",
    href: "/work/shimontini",
    isCaseStudy: true,
  },
  {
    num: "04",
    client: "Bisleri (Spec)",
    project: "31-Day Winter Hydration Plan",
    contribution: "31-Day Content Strategy · Visual Scripts · Copywriting",
    type: "SPEC / PERSONAL PROJECT",
    image: "/portfolio/bisleri-cover-og-1200x630.png",
    aspect: "aspect-[16/9]",
    stat: "31 Editorial Plots & Scripts",
    href: "/work/bisleri",
    isCaseStudy: true,
  },
  {
    num: "05",
    client: "Zee Bangla Sonar",
    project: "Social Media Execution Support",
    contribution: "Content Planning Support · Campaign Coordination Flow",
    type: "SUPPORT ROLE",
    image: "/Brand_Logo/z_bangla.png.png",
    aspect: "aspect-[16/10]",
    stat: "16-Post Framework · Media Flow",
    href: "/work/zee-banglasonar",
    isCaseStudy: true,
  },
  {
    num: "06",
    client: "Marketing Notebook",
    project: "Ad Teardowns & Original Concepts",
    contribution:
      "Ad teardowns and original concepts from digital marketing training, and what each exercise taught me about planning content.",
    type: "PERSONAL PROJECT",
    image: "/work/marketing-notebook/poster-bisleri-party-or-recovery.webp",
    aspect: "aspect-[16/9]",
    stat: "4 Ads Analysed · 3 Concepts",
    href: "/work/marketing-notebook",
    isCaseStudy: true,
  },
  {
    num: "07",
    client: "Walplast",
    project: "FIFA 2026 Knockout Campaign",
    contribution: "Campaign Planning · Content Strategy · Community Support",
    type: "COMMUNITY ENGAGEMENT CAMPAIGN",
    image: "/Brand_Logo/Walplast_Fifa_Campaign.png",
    aspect: "aspect-[16/9]",
    stat: "1.1M+ Views · 30K+ Engagements",
    href: "/work/fifa",
    isCaseStudy: true,
  },
  {
    num: "08",
    client: "MSP Steel",
    project: "B2B Social Media Support",
    contribution: "Social Media Handling · Scheduling · Consistency",
    type: "B2B BRAND EXECUTION",
    image: "/Brand_Logo/msp.png.png",
    aspect: "aspect-[16/10]",
    stat: "Multi-Platform Presence",
    href: "/work",
    isCaseStudy: false,
  },
  {
    num: "09",
    client: "Core Fit",
    project: "High-Impact Social Creative",
    contribution: "Visual Concept · Copywriting · Creative Direction",
    type: "VISUAL & COPYWRITING",
    image: "/portfolio/fitness-brand-be-fit.jpg",
    aspect: "aspect-square",
    stat: "Featured Creative Asset",
    href: "/creative",
    isCaseStudy: false,
  },
];

const certificationsSummary = [
  { name: "Social Media Marketing II", org: "HubSpot Academy" },
  { name: "Inbound Marketing Certified", org: "HubSpot Academy" },
  { name: "Digital Marketing Certified", org: "HubSpot Academy" },
  { name: "Digital Marketing Graduate", org: "KDMI" },
];

export default function Home() {
  const [activeSlideModal, setActiveSlideModal] = useState<{
    work: SelectedWorkItem;
    slideIndex: number;
  } | null>(null);

  const prevModalSlide = useCallback(() => {
    if (!activeSlideModal?.work.slides) return;
    const len = activeSlideModal.work.slides.length;
    setActiveSlideModal((prev) =>
      prev ? { ...prev, slideIndex: (prev.slideIndex - 1 + len) % len } : null
    );
  }, [activeSlideModal]);

  const nextModalSlide = useCallback(() => {
    if (!activeSlideModal?.work.slides) return;
    const len = activeSlideModal.work.slides.length;
    setActiveSlideModal((prev) =>
      prev ? { ...prev, slideIndex: (prev.slideIndex + 1) % len } : null
    );
  }, [activeSlideModal]);

  useEffect(() => {
    if (!activeSlideModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveSlideModal(null);
      } else if (e.key === "ArrowLeft") {
        prevModalSlide();
      } else if (e.key === "ArrowRight") {
        nextModalSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlideModal, prevModalSlide, nextModalSlide]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 text-warm-white">
        {/* ─── 01 / HERO SECTION ─── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-6 pb-20 md:py-24 border-b border-dark-borderSubtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Main Headline & Intro */}
            <div className="lg:col-span-8 space-y-8">
              {/* Meta Label */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-warm-muted">
                  00 / SELECTED PORTFOLIO
                </span>
              </div>

              {/* Title & Roles */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-warm-white uppercase leading-[1.05]">
                  Digital Marketing &amp; Social Media Associate
                </h1>
                <p className="font-mono text-sm sm:text-base text-warm-gray tracking-wide">
                  Former Software Engineer transitioning into digital marketing · Open to entry-level roles &amp; willing to learn
                </p>
              </div>

              {/* Hook Bio */}
              <div className="max-w-2xl space-y-4 text-warm-gray text-base sm:text-lg leading-relaxed font-light">
                <p>
                  Former Software Engineer transitioning into digital marketing, with hands-on experience supporting
                  social media, content planning, SEO research, and campaign execution.
                </p>
                <p className="text-sm font-mono text-warm-muted">
                  Curious, methodical, and willing to learn — looking for an entry-level role where I can support real campaigns, test ideas, and grow with a forward-thinking team.
                </p>
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <Link
                  href="/creative"
                  className="px-6 py-3.5 rounded-full btn-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2 group shadow-sm"
                >
                  <span>Explore Creative Gallery</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/work"
                  className="px-6 py-3.5 rounded-full border border-dark-borderSubtle text-warm-white font-mono text-xs uppercase tracking-[0.2em] hover:bg-dark-surface2 transition-all flex items-center gap-2 group shadow-sm"
                >
                  <span>Browse Work Archive</span>
                  <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-warm-gray hover:text-warm-white font-mono text-xs uppercase tracking-[0.18em] transition-colors"
                >
                  <FiDownload />
                  <span>Resume</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-warm-gray hover:text-warm-white font-mono text-xs uppercase tracking-[0.18em] transition-colors"
                >
                  <span>Contact</span>
                  <FiArrowUpRight />
                </Link>
              </motion.div>
            </div>

            {/* Aside / Status & Subtle Mascot */}
            <div className="lg:col-span-4 lg:pl-8 flex flex-col justify-between h-full space-y-8 pt-4 lg:pt-0">
              <div className="p-6 rounded-2xl bg-dark-surface border border-dark-borderSubtle space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-warm-muted">
                    STATUS
                  </span>
                  <RobotMascot variant="hero" size={40} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-warm-white font-semibold">
                      Open to Opportunities
                    </p>
                  </div>
                  <p className="text-xs text-warm-gray leading-relaxed">
                    Entry-level digital marketing, content coordinator, and social media specialist roles. Eager and willing to learn.
                  </p>
                </div>
                <div className="pt-2 border-t border-dark-borderSubtle flex items-center justify-between text-[11px] font-mono text-warm-muted">
                  <span>LOCATION</span>
                  <span className="text-warm-gray">Kolkata, India</span>
                </div>
              </div>

              {/* Headshot Thumbnail */}
              <div className="relative group overflow-hidden rounded-2xl border border-dark-borderSubtle bg-dark-surface max-w-[260px] shadow-sm">
                <Image
                  src="/og-image.png"
                  alt="Shenehashis Dutta"
                  width={260}
                  height={260}
                  priority
                  className="w-full aspect-square object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-warm-gray">
                  <span>Shenehashis Dutta</span>
                  <span className="text-warm-muted">Ex-SDE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 02 / SELECTED WORK PREVIEWS ─── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-28 border-b border-dark-borderSubtle">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-warm-muted block mb-2">
                01 / CURATED ARCHIVE
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-warm-white uppercase">
                Selected Work
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-warm-gray hover:text-warm-white transition-colors group"
            >
              <span>Explore All Projects (8)</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-16">
            {selectedWorks.map((work, idx) => (
              <motion.article
                key={work.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group relative border-t border-dark-borderSubtle pt-10"
              >
                {work.slides && work.slides.length > 0 ? (
                  /* ─── MULTI-SLIDE CAMPAIGN: SPREAD EVENLY ACROSS FULL WIDTH ─── */
                  <div className="space-y-6">
                    {/* Campaign Header Row */}
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className="space-y-3 max-w-3xl">
                        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-warm-muted uppercase">
                          <span>{work.num}</span>
                          <span>/</span>
                          <span className="text-warm-gray">{work.client}</span>
                          <span className="px-2 py-0.5 rounded text-[9px] bg-accent-blue/10 text-accent-blue font-bold border border-accent-blue/20">
                            {work.type}
                          </span>
                          <span className="font-mono text-[10px] text-accent-blue hidden sm:inline">
                            · {work.slides.length}-PART SPREAD
                          </span>
                        </div>

                        <Link href={work.href} className="block group/title">
                          <h3 className="text-2xl sm:text-4xl font-sans font-bold text-warm-white group-hover/title:text-accent-blue transition-colors">
                            {work.project}
                          </h3>
                        </Link>

                        {work.strategicRationale && (
                          <p className="text-xs sm:text-sm text-warm-gray font-sans leading-relaxed border-l-2 border-accent-blue/40 pl-3">
                            <span className="font-mono text-[10px] text-accent-blue uppercase tracking-wider block mb-0.5 font-bold">
                              Strategic Idea:
                            </span>
                            {work.strategicRationale}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs font-mono text-warm-muted pt-1">
                          <span>
                            <span className="text-warm-gray font-semibold">Contribution:</span> {work.contribution}
                          </span>
                          <span>
                            <span className="text-warm-gray font-semibold">Highlight:</span> {work.stat}
                          </span>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-3 flex-wrap lg:shrink-0 pt-2 lg:pt-0">
                        {work.canvaUrl && (
                          <a
                            href={work.canvaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-dark-surface hover:bg-dark-surface2 text-warm-white border border-dark-borderSubtle font-mono text-xs font-semibold transition-all shadow-sm"
                            title="Open Canva original template"
                          >
                            <SiCanva size={12} className="text-[#00C4CC]" aria-label="Canva" title="Canva" />
                            <span>Canva</span>
                            <FiArrowUpRight size={12} className="text-warm-muted" aria-hidden="true" />
                          </a>
                        )}
                        {work.pdfUrl && (
                          <a
                            href={work.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-dark-surface hover:bg-dark-surface2 text-warm-white border border-dark-borderSubtle font-mono text-xs font-semibold transition-all shadow-sm"
                            title="Open PDF"
                          >
                            <FiFileText size={12} className="text-accent-blue" aria-hidden="true" />
                            <span>PDF</span>
                            <FiArrowUpRight size={12} className="text-warm-muted" aria-hidden="true" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => setActiveSlideModal({ work, slideIndex: 0 })}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-primary font-mono text-xs uppercase tracking-wider font-semibold shadow-sm transition-all"
                        >
                          <FiLayers size={13} />
                          <span>Inspect One by One</span>
                        </button>
                      </div>
                    </div>

                    {/* SPREAD EVENLY CONTAINER */}
                    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-dark-surface border border-dark-borderSubtle shadow-sm space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-warm-muted uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                          <FiLayers className="text-accent-blue" />
                          Full Carousel Spread — Click any slide to view one by one
                        </span>
                        <span className="font-mono text-[11px] text-accent-blue">
                          {work.slides.length} Slides Evenly Distributed
                        </span>
                      </div>

                      <div
                        className={`grid gap-3 sm:gap-4 w-full ${
                          work.slides.length === 4
                            ? "grid-cols-2 md:grid-cols-4"
                            : "grid-cols-1 sm:grid-cols-3"
                        }`}
                      >
                        {work.slides.map((s, sIdx) => (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => setActiveSlideModal({ work, slideIndex: sIdx })}
                            className="group/slide text-left flex flex-col rounded-xl sm:rounded-2xl overflow-hidden border border-dark-borderSubtle hover:border-accent-blue bg-[var(--card-media-bg)] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 w-full"
                            title={`Click to view Slide ${sIdx + 1} one by one`}
                          >
                            <div className="relative w-full aspect-[4/5] overflow-hidden">
                              <Image
                                src={s.image}
                                alt={s.title}
                                fill
                                className="object-contain p-2 sm:p-2.5 transition-transform duration-500 group-hover/slide:scale-105"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              />
                              <div className="absolute top-2.5 left-2.5 z-10">
                                <span className="px-2 py-0.5 rounded-md bg-dark-surface/90 backdrop-blur-md border border-dark-borderSubtle font-mono text-[10px] uppercase tracking-wider text-warm-white font-bold shadow-sm">
                                  0{sIdx + 1}
                                </span>
                              </div>
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/slide:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <span className="px-3 py-1 rounded-full btn-primary font-mono text-[10px] uppercase tracking-wider font-semibold shadow flex items-center gap-1.5">
                                  <FiZoomIn size={12} /> View
                                </span>
                              </div>
                            </div>
                            <div className="p-2.5 sm:p-3 bg-dark-surface2/70 border-t border-dark-borderSubtle">
                              <p className="font-mono text-[11px] font-bold text-warm-white truncate">
                                {s.title}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ─── STANDARD WORK: 2-COLUMN PRESENTATION ─── */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Number & Metadata */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-warm-muted uppercase">
                        <span>{work.num}</span>
                        <span>/</span>
                        <span className="text-warm-gray">{work.client}</span>
                        {work.type.includes("CAMPAIGN") || work.type.includes("SPEC") ? (
                          <span className="px-2 py-0.5 rounded text-[9px] bg-dark-surface2 text-accent-blue font-bold border border-dark-borderSubtle">
                            {work.type.includes("REAL ESTATE") ? "FEATURED CAMPAIGN" : "SPEC"}
                          </span>
                        ) : null}
                      </div>

                      <Link href={work.href} className="block group/title">
                        <h3 className="text-2xl sm:text-4xl font-sans font-bold text-warm-white group-hover/title:text-accent-blue transition-colors">
                          {work.project}
                        </h3>
                      </Link>

                      <div className="space-y-2 pt-2 text-xs font-mono text-warm-gray">
                        <p>
                          <span className="text-warm-muted uppercase tracking-wider block mb-0.5">
                            Contribution:
                          </span>
                          {work.contribution}
                        </p>
                        <p>
                          <span className="text-warm-muted uppercase tracking-wider block mb-0.5">
                            Highlight:
                          </span>
                          {work.stat}
                        </p>
                      </div>

                      <div className="pt-4 flex items-center gap-4 flex-wrap">
                        <Link
                          href={work.href}
                          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-warm-white group-hover:underline underline-offset-8"
                        >
                          <span>{work.isCaseStudy ? "View Case Study" : "View Work"}</span>
                          <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Visual */}
                    <div className="lg:col-span-7">
                      <Link
                        href={work.href}
                        className="block group/img overflow-hidden rounded-2xl border border-dark-borderSubtle bg-dark-surface relative shadow-sm"
                      >
                        <div className={`relative w-full ${work.aspect} overflow-hidden flex items-center justify-center`}>
                          {work.image.includes("/Brand_Logo/z_bangla") || work.image.includes("/Brand_Logo/msp") ? (
                            <div className="relative w-full h-full flex items-center justify-center p-12 sm:p-16 md:p-20">
                              <div className="relative w-full h-full max-w-[260px] max-h-[150px] sm:max-w-[320px] sm:max-h-[180px]">
                                <Image
                                  src={work.image}
                                  alt={work.project}
                                  fill
                                  className="object-contain transition-transform duration-700 ease-out group-hover/img:scale-105"
                                  sizes="(max-width: 1024px) 100vw, 400px"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <Image
                                src={work.image}
                                alt={work.project}
                                fill
                                className="object-contain p-4 md:p-8 transition-transform duration-700 ease-out group-hover/img:scale-105"
                                sizes="(max-width: 1024px) 100vw, 60vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover/img:opacity-10 transition-opacity" />
                            </>
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </section>

        {/* ─── 03 / BEFORE MARKETING: THE SOFTWARE FOUNDATION ─── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-28 border-b border-dark-borderSubtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-3">
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-warm-muted block">
                02 / BACKGROUND
              </span>
              <h2 className="text-2xl sm:text-4xl font-sans font-bold text-warm-white uppercase">
                The Analytical Edge
              </h2>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-warm-gray">
                Software Engineering &amp; QA Rigor
              </p>
            </div>

            <div className="lg:col-span-8 space-y-8 text-warm-gray leading-relaxed text-base sm:text-lg font-light">
              <p>
                Before transitioning into digital marketing, I spent three years working as a
                <strong className="text-warm-white font-medium"> Software Engineer at Q3 Technologies</strong> and a
                <strong className="text-warm-white font-medium"> Test Engineer at Wipro</strong>.
              </p>
              <p>
                That technical background instilled structured problem-solving, quality assurance discipline,
                and comfort with complex software platforms. In marketing, it translates to:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 font-mono text-xs">
                <div className="p-5 rounded-xl bg-dark-surface border border-dark-borderSubtle space-y-2 shadow-sm">
                  <span className="text-warm-white font-bold block">01 / Process Rigor</span>
                  <p className="text-warm-muted text-[11px] leading-relaxed">
                    Treating content calendars and campaign rollouts with the same QA precision as software releases.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-dark-surface border border-dark-borderSubtle space-y-2 shadow-sm">
                  <span className="text-warm-white font-bold block">02 / Technical SEO</span>
                  <p className="text-warm-muted text-[11px] leading-relaxed">
                    Understanding DOM structures, crawler mechanics, and search indexing at the code level.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-dark-surface border border-dark-borderSubtle space-y-2 shadow-sm">
                  <span className="text-warm-white font-bold block">03 / Tool Fluency</span>
                  <p className="text-warm-muted text-[11px] leading-relaxed">
                    Fast adoption of marketing automation, analytics dashboards, Meta Business Suite, and generative tools.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-warm-white hover:text-accent-blue transition-colors"
                >
                  <span>Read the career transition story</span>
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 / CERTIFICATIONS STRIP ─── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-20 border-b border-dark-borderSubtle">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-warm-muted">
              03 / VERIFIED CREDENTIALS
            </span>
            <Link
              href="/experience"
              className="font-mono text-xs uppercase tracking-[0.18em] text-warm-gray hover:text-warm-white transition-colors"
            >
              View Full Credentials →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certificationsSummary.map((cert, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-dark-surface border border-dark-borderSubtle flex flex-col justify-between min-h-[90px] shadow-sm"
              >
                <span className="text-xs font-semibold text-warm-white">{cert.name}</span>
                <span className="font-mono text-[10px] text-warm-muted uppercase tracking-wider">
                  {cert.org}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 05 / CLOSING INVITATION ─── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-28 text-center space-y-6">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-warm-muted block">
            NEXT STEPS
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-warm-white uppercase max-w-2xl mx-auto leading-tight">
            Explore the creative work or review the resume
          </h2>
          <p className="text-warm-gray max-w-md mx-auto text-sm sm:text-base">
            Detailed project breakdowns, social creatives, short-form concepts, and career history.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/creative"
              className="px-6 py-3 rounded-full btn-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-sm"
            >
              Creative Gallery
            </Link>
            <Link
              href="/work"
              className="px-6 py-3 rounded-full border border-dark-borderSubtle text-warm-white font-mono text-xs uppercase tracking-[0.2em] hover:bg-dark-surface2 transition-all shadow-sm"
            >
              Browse Work
            </Link>
            <Link
              href="/resume"
              className="px-6 py-3 rounded-full border border-dark-borderSubtle text-warm-white font-mono text-xs uppercase tracking-[0.2em] hover:bg-dark-surface2 transition-all shadow-sm"
            >
              Resume
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full text-warm-gray hover:text-warm-white font-mono text-xs uppercase tracking-[0.2em] transition-all"
            >
              Contact
            </Link>
          </div>
        </section>
      </main>

      {/* Lightbox Modal on Homepage: Displays clicked slide ONE BY ONE in large scale */}
      <AnimatePresence>
        {activeSlideModal && activeSlideModal.work.slides && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveSlideModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 modal-theater-backdrop overflow-y-auto cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[94vh] sm:h-[92vh] flex flex-col modal-theater-surface rounded-2xl sm:rounded-3xl border border-dark-borderSubtle shadow-2xl overflow-hidden cursor-default my-auto"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-dark-borderSubtle modal-theater-header shrink-0">
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue font-mono text-[10px] font-bold uppercase tracking-wider">
                      {activeSlideModal.work.type}
                    </span>
                    <span className="font-mono text-xs text-warm-white font-bold uppercase tracking-wider">
                      {activeSlideModal.work.client}
                    </span>
                    <span className="font-mono text-[10px] text-accent-blue px-2.5 py-0.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 font-bold">
                      Slide {activeSlideModal.slideIndex + 1} of {activeSlideModal.work.slides.length}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-sans font-bold text-warm-white truncate">
                    {activeSlideModal.work.project}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {activeSlideModal.work.canvaUrl && (
                    <a
                      href={activeSlideModal.work.canvaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-surface2 hover:bg-dark-border text-warm-white border border-dark-borderSubtle font-mono text-[11px] font-semibold transition-all shadow-sm"
                    >
                      <SiCanva size={12} className="text-[#00C4CC]" aria-label="Canva" title="Canva" />
                      <span>Canva</span>
                      <FiExternalLink size={10} className="text-warm-muted" aria-hidden="true" />
                    </a>
                  )}
                  {activeSlideModal.work.pdfUrl && (
                    <a
                      href={activeSlideModal.work.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-surface2 hover:bg-dark-border text-warm-white border border-dark-borderSubtle font-mono text-[11px] font-semibold transition-all shadow-sm"
                      title="Open PDF"
                    >
                      <FiFileText size={12} className="text-accent-blue" aria-hidden="true" />
                      <span>PDF</span>
                      <FiExternalLink size={10} className="text-warm-muted" aria-hidden="true" />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveSlideModal(null)}
                    className="p-2.5 rounded-full bg-dark-surface2 hover:bg-dark-border text-warm-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 border border-dark-borderSubtle shadow-sm"
                    aria-label="Close modal"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>

              {/* Central Canvas Viewport: Expansive View Showing Slide ONE BY ONE */}
              <div className="relative flex-1 min-h-0 overflow-hidden modal-theater-canvas flex flex-col items-center justify-center p-2 sm:p-4 select-none">
                <div className="relative w-full h-full max-h-[64vh] sm:max-h-[70vh] md:max-h-[74vh] flex items-center justify-center">
                  <Image
                    src={activeSlideModal.work.slides[activeSlideModal.slideIndex].image}
                    alt={activeSlideModal.work.slides[activeSlideModal.slideIndex].title}
                    fill
                    className="object-contain drop-shadow-2xl rounded-sm"
                    sizes="(max-width: 1024px) 100vw, 1200px"
                    priority
                  />
                </div>

                {/* Prev Navigation Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevModalSlide();
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-dark-surface/90 hover:bg-dark-surface text-warm-white border border-dark-borderSubtle transition-all shadow-xl hover:scale-110 z-20"
                  aria-label="Previous slide"
                  title="Previous Slide"
                >
                  <FiChevronLeft size={20} />
                </button>

                {/* Next Navigation Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextModalSlide();
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-dark-surface/90 hover:bg-dark-surface text-warm-white border border-dark-borderSubtle transition-all shadow-xl hover:scale-110 z-20"
                  aria-label="Next slide"
                  title="Next Slide"
                >
                  <FiChevronRight size={20} />
                </button>

                {/* Filmstrip Strip */}
                <div className="flex items-center justify-center gap-2 pt-2 sm:pt-3 pb-0.5 overflow-x-auto max-w-full z-10 shrink-0">
                  {activeSlideModal.work.slides.map((s, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() =>
                        setActiveSlideModal((prev) => (prev ? { ...prev, slideIndex: sIdx } : null))
                      }
                      className={`relative rounded-md overflow-hidden border transition-all ${
                        sIdx === activeSlideModal.slideIndex
                          ? "border-accent-blue ring-2 ring-accent-blue/40 scale-105 opacity-100 shadow-md"
                          : "border-dark-borderSubtle opacity-50 hover:opacity-90"
                      } w-10 h-12 sm:w-12 sm:h-14 shrink-0 bg-dark-surface`}
                      aria-label={`Jump to slide ${sIdx + 1}`}
                      title={s.title}
                    >
                      <Image src={s.image} alt={s.title} fill className="object-cover" sizes="50px" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Caption Bar */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-dark-borderSubtle modal-theater-footer space-y-2 shrink-0 max-h-[26vh] overflow-y-auto">
                <div className="pb-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent-blue font-bold block">
                    {activeSlideModal.work.slides[activeSlideModal.slideIndex].title}
                  </span>
                  <p className="text-xs sm:text-sm text-warm-white leading-relaxed font-sans font-medium mt-0.5">
                    {activeSlideModal.work.slides[activeSlideModal.slideIndex].description}
                  </p>
                </div>
                {activeSlideModal.work.strategicRationale && (
                  <p className="text-xs text-warm-gray leading-relaxed font-sans pt-1 border-t border-dark-borderSubtle">
                    <span className="font-mono text-[10px] text-warm-muted uppercase tracking-wider block">
                      Campaign Strategic Idea:
                    </span>
                    {activeSlideModal.work.strategicRationale}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}