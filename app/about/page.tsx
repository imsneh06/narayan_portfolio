"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiDownload, FiArrowDown } from "react-icons/fi";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RobotMascot } from "@/components/RobotMascot";

const timelineStages = [
  {
    step: "01",
    title: "Software Engineering & Testing Foundation",
    years: "2021 — 2025",
    desc: "Began my career in enterprise software quality assurance and development at Wipro and Q3 Technologies. Developed structured thinking, rigorous debugging habits, Jira release processes, and comfort with code architecture.",
  },
  {
    step: "02",
    title: "Transition to Digital Marketing",
    years: "Late 2025",
    desc: "Realized a strong inclination toward the communication and creative side of digital business. Completed intensive practical digital marketing training at KDMI and began consulting with local businesses via Digitally Kolkata.",
  },
  {
    step: "03",
    title: "Hands-on Social Media & Agency Internships",
    years: "2026",
    desc: "Supported real brand accounts across social media management, monthly content planning, Meta Ads support, and community management at Mind & Matter and JRD Ayurveda.",
  },
  {
    step: "04",
    title: "Creative + Analytical Marketer",
    years: "Present",
    desc: "Seeking entry-level digital marketing and social media roles where technical discipline, content creation, and data literacy converge to drive consistent brand growth.",
  },
];

const coreTraits = [
  {
    trait: "Analytical Rigor",
    desc: "Approaches marketing data, tracking pixels, and SEO keyword models with developer logic rather than guesswork.",
  },
  {
    trait: "Creative Experimentation",
    desc: "Enjoys testing visual hooks, meme angles, short-form editing rhythms, and conversational copy formats.",
  },
  {
    trait: "Fast Tool Adoption",
    desc: "Comfortable navigating new platforms rapidly — from Meta Business Suite and GA4 to CapCut and generative tools.",
  },
  {
    trait: "Disciplined Follow-Through",
    desc: "Recognizes that social media consistency, clean scheduling, and clear team communication beat irregular bursts.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 text-warm-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-20">
          {/* Header */}
          <div className="border-b border-white/[0.08] pb-12 space-y-4">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-warm-muted block">
              05 / PERSONAL STORY
            </span>
            <h1 className="text-4xl sm:text-6xl font-sans font-bold tracking-tight uppercase text-warm-white">
              About Me
            </h1>
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.18em] text-warm-gray">
              The Intersection of Technology, Content, and Digital Marketing
            </p>
          </div>

          {/* ─── 01 / HONEST CAREER TRANSITION NARRATIVE ─── */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 space-y-4">
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-dark-surface max-w-[320px]">
                <Image
                  src="/og-image.png"
                  alt="Shenehashis Dutta"
                  width={320}
                  height={320}
                  priority
                  className="w-full aspect-square object-cover grayscale contrast-110"
                />
              </div>
              <div className="font-mono text-xs text-warm-muted space-y-1">
                <p className="text-warm-white font-semibold">Narayan Shenehashis Dutta</p>
                <p>Digital Marketing Associate · Ex-Software Engineer</p>
                <p>Based in Kolkata, West Bengal, India</p>
              </div>
            </div>

            <div className="md:col-span-7 space-y-6 text-warm-gray text-base sm:text-lg font-light leading-relaxed">
              <p>
                I am an early-career digital marketer with hands-on agency experience across client accounts including <strong className="text-warm-white font-medium">Zee Bangla Sonar</strong>, <strong className="text-warm-white font-medium">Walplast</strong>, <strong className="text-warm-white font-medium">Drychem</strong>, and <strong className="text-warm-white font-medium">MSP Steel</strong> — planning content calendars, designing creatives, writing captions, and supporting Google Ads and Meta Ads campaigns.
              </p>
              <p>
                Before transitioning into marketing, I spent about three years in software development and quality testing at <strong className="text-warm-white font-medium">Wipro</strong> and <strong className="text-warm-white font-medium">Q3 Technologies</strong>. That engineering background taught me to work methodically, pay close attention to detail, and pick up new tools quickly.
              </p>
              <p>
                I am deeply curious about social media, content, SEO, paid campaigns, and understanding what makes audiences respond.
              </p>
              <p>
                Today, I am looking for an entry-level role where I can work on real campaigns, test ideas, take ownership, and keep building my skills across these areas.
              </p>

              <div className="pt-2">
                <a
                  href="https://drive.google.com/file/d/185494u4R1dLbgnbQKxqLRyc1aL6FcCvp/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all"
                >
                  <FiDownload size={14} />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </section>

          {/* ─── 02 / VISUAL TIMELINE WITH ROBOT MASCOT ─── */}
          <section className="pt-16 border-t border-white/[0.08] space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-warm-muted block mb-1">
                  CAREER ARC
                </span>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold text-warm-white uppercase">
                  Trajectory
                </h2>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-warm-muted">
                <span>Transition in Progress</span>
                <RobotMascot variant="timeline" size={44} />
              </div>
            </div>

            <div className="space-y-6">
              {timelineStages.map((stage, i) => (
                <div key={stage.step}>
                  <div className="p-6 sm:p-8 rounded-2xl bg-dark-surface border border-white/[0.06] flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="md:w-1/3 space-y-1">
                      <div className="flex items-center gap-3 font-mono text-xs text-accent-blue font-bold">
                        <span>STAGE {stage.step}</span>
                        <span>·</span>
                        <span className="text-warm-muted font-normal">{stage.years}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-sans font-bold text-warm-white">
                        {stage.title}
                      </h3>
                    </div>

                    <div className="md:w-2/3">
                      <p className="text-xs sm:text-sm text-warm-gray leading-relaxed font-light">
                        {stage.desc}
                      </p>
                    </div>
                  </div>

                  {i < timelineStages.length - 1 && (
                    <div className="py-2 flex justify-center text-warm-muted">
                      <FiArrowDown size={18} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ─── 03 / PROFESSIONAL TRAITS ─── */}
          <section className="pt-16 border-t border-white/[0.08] space-y-8">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-warm-muted block">
              WORK STYLE &amp; MINDSET
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreTraits.map((t, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-dark-surface border border-white/[0.06] space-y-2"
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-warm-white font-bold block">
                    {t.trait}
                  </span>
                  <p className="text-xs text-warm-gray leading-relaxed font-light">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── NEXT ACTIONS ─── */}
          <div className="pt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-warm-gray hover:text-warm-white transition-colors"
            >
              <span>View Chronological Experience</span>
              <FiArrowRight />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-warm-white hover:text-accent-blue transition-colors"
            >
              <span>Get in Touch Directly</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
