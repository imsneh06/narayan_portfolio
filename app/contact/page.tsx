"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiPhone, FiDownload, FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("duttarayan3@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-36 pb-24 text-warm-white flex flex-col justify-between">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 w-full space-y-16">
          {/* Header */}
          <div className="space-y-4">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-warm-muted block">
              06 / GET IN TOUCH
            </span>
            <h1 className="text-4xl sm:text-7xl md:text-8xl font-sans font-black tracking-tight uppercase text-warm-white leading-[1.05]">
              Let&apos;s Work Together.
            </h1>
            <p className="font-mono text-sm sm:text-base md:text-lg uppercase tracking-[0.15em] text-warm-gray">
              Digital Marketing · Social Media · Content Execution
            </p>
          </div>

          {/* Main Contact Channels */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/[0.08]">
            {/* Primary Action / Direct Email */}
            <div className="md:col-span-7 space-y-8">
              <div className="p-8 sm:p-10 rounded-3xl bg-dark-surface border border-white/[0.08] space-y-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-warm-muted block mb-2">
                    PRIMARY INBOX
                  </span>
                  <a
                    href="mailto:duttarayan3@gmail.com"
                    className="text-2xl sm:text-3xl font-sans font-bold text-warm-white hover:text-accent-blue transition-colors break-all"
                  >
                    duttarayan3@gmail.com
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <a
                    href="mailto:duttarayan3@gmail.com"
                    className="px-6 py-3 rounded-full btn-primary font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2"
                  >
                    <FiMail />
                    <span>Send Email</span>
                  </a>

                  <button
                    onClick={copyEmail}
                    className="px-5 py-3 rounded-full border border-white/[0.12] hover:border-white/30 text-warm-white uppercase tracking-wider transition-all inline-flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <FiCheck className="text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <FiCopy />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="p-8 rounded-3xl bg-dark-surface border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-warm-muted block mb-1">
                    PHONE &amp; WHATSAPP
                  </span>
                  <a
                    href="tel:9073277478"
                    className="text-xl sm:text-2xl font-sans font-bold text-warm-white hover:text-accent-blue transition-colors"
                  >
                    +91 907-327-7478
                  </a>
                </div>

                <a
                  href="tel:9073277478"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.12] hover:border-white/30 font-mono text-xs uppercase tracking-wider text-warm-white transition-all self-start sm:self-auto"
                >
                  <FiPhone size={13} />
                  <span>Call Directly</span>
                </a>
              </div>
            </div>

            {/* Sidebar / Profiles & Resume */}
            <div className="md:col-span-5 space-y-6">
              {/* Profiles */}
              <div className="p-8 rounded-3xl bg-dark-surface border border-white/[0.08] space-y-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-warm-muted block">
                  PROFESSIONAL NETWORKS
                </span>

                <div className="space-y-4 font-mono text-xs">
                  <a
                    href="https://www.linkedin.com/in/im-rayn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-2 border-b border-white/[0.04] text-warm-white hover:text-accent-blue transition-colors group"
                  >
                    <span className="flex items-center gap-2.5">
                      <FaLinkedin size={16} />
                      <span>LinkedIn Profile</span>
                    </span>
                    <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href="https://github.com/imsneh06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-2 border-b border-white/[0.04] text-warm-white hover:text-accent-blue transition-colors group"
                  >
                    <span className="flex items-center gap-2.5">
                      <FaGithub size={16} />
                      <span>GitHub Archive</span>
                    </span>
                    <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href="https://x.com/imsneh06?s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-2 text-warm-white hover:text-accent-blue transition-colors group"
                  >
                    <span className="flex items-center gap-2.5">
                      <FaTwitter size={16} />
                      <span>Twitter / X</span>
                    </span>
                    <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Resume download CTA card */}
              <div className="p-8 rounded-3xl bg-dark-surface border border-white/[0.08] space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-warm-muted block">
                  CANDIDATE DOSSIER
                </span>
                <p className="text-xs text-warm-gray leading-relaxed font-light">
                  Looking to review offline? Download the complete verified resume as a formatted PDF.
                </p>
                <div className="pt-2">
                  <a
                    href="https://drive.google.com/file/d/185494u4R1dLbgnbQKxqLRyc1aL6FcCvp/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] font-mono text-xs uppercase tracking-wider text-warm-white transition-all"
                  >
                    <FiDownload size={13} />
                    <span>Download Resume (PDF)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
