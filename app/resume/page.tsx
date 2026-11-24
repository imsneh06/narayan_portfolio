"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FiDownload, FiPrinter, FiMail, FiPhone, FiLinkedin, FiMapPin, FiArrowLeft, FiFileText } from "react-icons/fi";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RobotMascot } from "@/components/RobotMascot";
import ExperienceCertificates from "@/components/ExperienceCertificates";

export default function ResumePage() {
  // Prevent right-click, drag, and inspection shortcuts across the resume tab
  useEffect(() => {
    // 1. Disable right-click context menu (blocks native inspect and save image)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Disable dragging images or elements
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // 3. Block Developer Tools & Inspection keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+I / Cmd+Option+I (Inspect DevTools)
      // Ctrl+Shift+J / Cmd+Option+J (Console)
      // Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        ["I", "i", "J", "j", "C", "c"].includes(e.key)
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+U / Cmd+U (View Page Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+S / Cmd+S (Save Page / Save Document)
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="no-print">
        <Navbar />
      </div>

      <main className="min-h-screen pt-32 pb-24 text-warm-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          {/* Top Actions Bar (Hidden when printing) */}
          <div className="no-print border-b border-white/[0.08] pb-8 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="font-mono text-xs uppercase tracking-[0.2em] text-warm-muted hover:text-warm-white transition-colors inline-flex items-center gap-1.5"
              >
                <FiArrowLeft />
                <span>Home</span>
              </Link>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-warm-white font-semibold">
                Curriculum Vitae
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#certificates"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/[0.12] hover:border-accent-blue/50 text-xs font-mono uppercase tracking-wider text-warm-muted hover:text-warm-white transition-colors"
              >
                <FiFileText size={12} className="text-accent-blue" />
                <span>Certificates (4)</span>
              </a>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.12] hover:border-white/30 text-xs font-mono uppercase tracking-wider text-warm-white transition-colors"
              >
                <FiPrinter size={13} />
                <span>Print CV</span>
              </button>

              <a
                href="https://drive.google.com/file/d/185494u4R1dLbgnbQKxqLRyc1aL6FcCvp/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full btn-primary font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <FiDownload size={13} />
                <span>Download PDF</span>
              </a>

              <RobotMascot variant="resume" size={38} className="ml-2 hidden sm:inline-flex" />
            </div>
          </div>

          {/* Interactive Screen View */}
          <div className="screen-only print-container bg-dark-surface border border-white/[0.08] p-8 sm:p-12 rounded-3xl space-y-12">
            {/* Header / Identity */}
            <header className="border-b border-white/[0.08] pb-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-sans font-black tracking-tight uppercase text-warm-white">
                    NARAYAN SHENEHASHIS DUTTA
                  </h1>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-blue mt-1 font-semibold">
                    Digital Marketing Associate (Ex-Software Engineer)
                  </p>
                </div>

                <div className="font-mono text-xs text-warm-gray space-y-1.5 text-left sm:text-right">
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <FiMapPin size={12} className="text-warm-muted" />
                    <span>Kolkata, West Bengal 700032, India</span>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <FiMail size={12} className="text-warm-muted" />
                    <a href="mailto:duttarayan3@gmail.com" className="hover:text-warm-white">
                      duttarayan3@gmail.com
                    </a>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <FiPhone size={12} className="text-warm-muted" />
                    <a href="tel:9073277478" className="hover:text-warm-white">
                      +91 907-327-7478
                    </a>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <FiLinkedin size={12} className="text-warm-muted" />
                    <a
                      href="https://www.linkedin.com/in/im-rayn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-warm-white"
                    >
                      linkedin.com/in/im-rayn
                    </a>
                  </p>
                </div>
              </div>
            </header>

            {/* ─── 01 / PROFESSIONAL SUMMARY ─── */}
            <section className="space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-warm-muted font-bold">
                01 / PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed font-light">
                Early-career digital marketer with hands-on agency experience on Zee Bangla Sonar, Walplast, Drychem, and MSP Steel, where I planned content calendars, designed creatives, wrote captions, and supported Google Ads and Meta Ads campaigns. Before moving into marketing, I spent about three years in software development and testing at Wipro and Q3 Technologies, which taught me to work methodically, pay attention to detail, and pick up new tools quickly. I am curious about social media, content, SEO, paid campaigns, and what makes audiences respond. I am looking for an entry-level role where I can work on real campaigns, test ideas, take ownership, and keep building my skills across these areas.
              </p>
            </section>

            {/* ─── 02 / WORK EXPERIENCE ─── */}
            <section className="space-y-6 pt-4 border-t border-white/[0.06]">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-warm-muted font-bold">
                02 / WORK EXPERIENCE
              </h2>

              <div className="space-y-8">
                {/* Role 1 */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-sans font-bold text-warm-white">
                      Founder &amp; Digital Marketing Consultant · Digitally Kolkata
                    </h3>
                    <span className="font-mono text-xs text-warm-muted">Dec 2025 – Present | Kolkata, IN</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-warm-gray font-light leading-relaxed">
                    <li>Take on freelance digital marketing work, including social media strategy, content creation, and campaign support for businesses.</li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-sans font-bold text-warm-white">
                      Digital Marketing Intern · Mind &amp; Matter
                    </h3>
                    <span className="font-mono text-xs text-warm-muted">Feb 2026 – Aug 2026 | Kolkata, IN</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-warm-gray font-light leading-relaxed">
                    <li>Planned, scheduled, and published social media content in Meta Business Suite for client brands including Zee Bangla Sonar, MSP Steel, Walplast, and Drychem.</li>
                    <li>Built content calendars around brand tone, campaign goals, and seasonal events; designed creatives in Canva and edited short-form videos in CapCut and VN.</li>
                    <li>Wrote captions and ad copy, researched hashtags and trends, and supported Google Ads and Meta Ads targeting, monitoring, and reporting.</li>
                    <li>Reviewed engagement data in Meta Business Suite and Google Analytics to refine content, and worked with clients and the team on briefs, approvals, and timelines.</li>
                  </ul>
                </div>

                {/* Role 3 */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-sans font-bold text-warm-white">
                      Digital Marketing Intern · JRD Ayurveda
                    </h3>
                    <span className="font-mono text-xs text-warm-muted">Jan 2026 – Feb 2026 | Kolkata, IN</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-warm-gray font-light leading-relaxed">
                    <li>Supported social media content planning and designed Canva creatives for a wellness and Ayurveda brand.</li>
                    <li>Researched keywords and competitors to find content and SEO opportunities; drafted captions and hashtags.</li>
                  </ul>
                </div>

                {/* Role 4 */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-sans font-bold text-warm-white">
                      Digital Marketing Intern · KDMI (Kolkata Digital Marketing Institute)
                    </h3>
                    <span className="font-mono text-xs text-warm-muted">Nov 2025 – Jan 2026 | Kolkata, IN</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-warm-gray font-light leading-relaxed">
                    <li>Completed hands-on training and live assignments in SEO, social media, Google Ads, Meta Ads, and analytics, including keyword research, on-page SEO audits, and campaign planning.</li>
                  </ul>
                </div>

                {/* Prior Technical Experience */}
                <div className="pt-4 border-t border-white/[0.04] space-y-6">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-warm-muted block">
                    PREVIOUS TECHNICAL BACKGROUND (SOFTWARE &amp; QA)
                  </span>

                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h4 className="text-sm font-sans font-bold text-warm-white">
                        Software Engineer · Q3 Technologies
                      </h4>
                      <span className="font-mono text-xs text-warm-muted">Apr 2025 – Oct 2025 | Gurgaon, IN</span>
                    </div>
                    <p className="text-xs text-warm-gray font-light">
                      Software engineering tenure focused on CRM system enhancements, enterprise migrations (.NET, Blazor, Bootstrap), and disciplined delivery.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h4 className="text-sm font-sans font-bold text-warm-white">
                        Test Engineer · Wipro
                      </h4>
                      <span className="font-mono text-xs text-warm-muted">Sep 2021 – Mar 2024 | Bengaluru, IN</span>
                    </div>
                    <p className="text-xs text-warm-gray font-light">
                      Quality engineering and regression testing on Salesforce CPQ systems; utilized Jira for defect tracking and release validation, establishing deep methodical discipline.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── 03 / DIGITAL MARKETING PROJECTS ─── */}
            <section className="space-y-4 pt-4 border-t border-white/[0.06]">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-warm-muted font-bold">
                03 / DIGITAL MARKETING PROJECTS
              </h2>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04] space-y-1.5">
                  <span className="text-warm-white font-bold text-sm block">
                    FIFA 2026 Campaign (Walplast)
                  </span>
                  <p className="text-warm-gray leading-relaxed font-light">
                    Helped plan and run an interactive prediction-contest campaign on Instagram and Facebook around the FIFA 2026 knockout stages to grow organic reach and community interaction. The campaign recorded <strong className="text-warm-white font-semibold">1.1M+ views, 30K+ engagements, and 323+ new followers</strong> across 28 creatives.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04] space-y-1.5">
                  <span className="text-warm-white font-bold text-sm block">
                    SEO &amp; Website Optimization
                  </span>
                  <p className="text-warm-gray leading-relaxed font-light">
                    Keyword research with Google Keyword Planner, Ubersuggest, and Google Trends; on-page SEO recommendations to improve website visibility.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04] space-y-1.5">
                  <span className="text-warm-white font-bold text-sm block">
                    Campaign Support
                  </span>
                  <p className="text-warm-gray leading-relaxed font-light">
                    Google Ads and Meta Ads planning, audience targeting, ad copy, monitoring, and performance analysis.
                  </p>
                </div>
              </div>
            </section>

            {/* ─── 04 / CORE SKILLS & TOOLS ─── */}
            <section className="space-y-6 pt-4 border-t border-white/[0.06]">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-warm-muted font-bold">
                04 / CORE SKILLS &amp; TOOLS
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
                <div className="space-y-1.5">
                  <span className="text-warm-white font-bold block uppercase tracking-wider">
                    Social Media &amp; Content
                  </span>
                  <p className="text-warm-gray leading-relaxed font-light">
                    Content Calendar Planning, Social Media Marketing, Caption Writing, Copywriting, Hashtag Research, Community Management, Campaign Planning, Client Coordination, Marketing Analytics.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-warm-white font-bold block uppercase tracking-wider">
                    SEO
                  </span>
                  <p className="text-warm-gray leading-relaxed font-light">
                    Keyword Research, On-Page SEO, Competitor Analysis, Website Optimization, Google Search Console.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-warm-white font-bold block uppercase tracking-wider">
                    Paid Ads / Performance Marketing
                  </span>
                  <p className="text-warm-gray leading-relaxed font-light">
                    Google Ads, Meta Ads Manager, Audience Targeting, Ad Copy, Campaign Monitoring and Reporting (practical exposure).
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-warm-white font-bold block uppercase tracking-wider">
                    Design &amp; Editing
                  </span>
                  <p className="text-warm-gray leading-relaxed font-light">
                    Canva, CapCut, VN, Figma.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-warm-white font-bold block uppercase tracking-wider">
                    Technical Background
                  </span>
                  <p className="text-warm-gray leading-relaxed font-light">
                    Full Stack Development, Software Testing.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-warm-white font-bold block uppercase tracking-wider">
                    Tools &amp; Platforms
                  </span>
                  <p className="text-warm-gray leading-relaxed font-light">
                    <strong className="text-warm-white font-medium">Marketing:</strong> Meta Business Suite, Google Analytics, Google Ads, Mailchimp, Looker Studio, RocketSend (WhatsApp campaigns), Salesforce CRM, Excel.
                    <br />
                    <strong className="text-warm-white font-medium">SEO:</strong> Google Keyword Planner, Google Trends, Ubersuggest, SEMrush, Ahrefs, Moz.
                    <br />
                    <strong className="text-warm-white font-medium">Creative &amp; AI:</strong> Canva, CapCut, Figma, Notion, WordPress, Claude, ChatGPT, Gemini.
                  </p>
                </div>
              </div>
            </section>

            {/* ─── 05 / EDUCATION & CERTIFICATIONS ─── */}
            <section className="space-y-4 pt-4 border-t border-white/[0.06]">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-warm-muted font-bold">
                05 / EDUCATION &amp; CERTIFICATIONS
              </h2>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.04] flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="text-warm-white font-semibold">Digital Marketing</span>
                    <span className="text-warm-gray block sm:inline sm:ml-2">· Kolkata Digital Marketing Institute, Kolkata</span>
                  </div>
                  <span className="text-warm-muted">Oct 2025 – Jan 2026</span>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.04] flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="text-warm-white font-semibold">Full Stack Development</span>
                    <span className="text-warm-gray block sm:inline sm:ml-2">· MASAI (Remote)</span>
                  </div>
                  <span className="text-warm-muted">Mar 2024 – Apr 2025</span>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.04] flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="text-warm-white font-semibold">Bachelor of Computer Applications (B.C.A)</span>
                    <span className="text-warm-gray block sm:inline sm:ml-2">· Dinabandhu Andrews Institute of Technology and Management, Kolkata | CGPA: 8.96 / 10</span>
                  </div>
                  <span className="text-warm-muted">2018 – 2021</span>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.04]">
                  <span className="text-warm-white font-semibold block mb-1">Certifications:</span>
                  <span className="text-warm-gray">
                    HubSpot Academy – Digital Marketing Certified; Social Media Marketing II Certified; Inbound Marketing Certified; Social Media Certified
                  </span>
                </div>
              </div>
            </section>

            {/* ─── 05 / EXPERIENCE CERTIFICATES ─── */}
            <ExperienceCertificates />
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              EXACT PORTFOLIO RESUME REPLICA (PRINT VIEW)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="ats-print-cv hidden print:block text-black bg-white w-full leading-tight font-sans">
            {/* Header Details */}
            <div className="ats-header pb-2 mb-2 border-b border-black">
              <h1 className="text-[19pt] font-black tracking-tight text-black leading-none mb-1">
                Narayan Shenehashis Dutta
              </h1>
              <div className="text-[10pt] font-bold text-[#1e40af] tracking-tight leading-tight mb-1">
                Digital Marketing Associate
              </div>
              <div className="text-[7.5pt] text-neutral-800 leading-[1.3] font-medium space-y-0.5">
                <div>Kolkata, West Bengal 700032, India | +91 9073277478 | duttarayan3@gmail.com</div>
                <div>
                  LinkedIn: linkedin.com/in/im-rayn | GitHub: github.com/imsneh06 | Portfolio: narayan-portfolio-three.vercel.app
                </div>
              </div>
            </div>

            {/* PROFESSIONAL SUMMARY */}
            <section className="ats-section mb-2">
              <h2 className="ats-section-title">Professional Summary</h2>
              <p className="text-[7.5pt] text-neutral-900 leading-[1.3] text-justify">
                Early-career digital marketer with hands-on agency experience on Zee Bangla Sonar, Walplast, Drychem, and MSP Steel, where I planned content calendars, designed creatives, wrote captions, and supported Google Ads and Meta Ads campaigns. Before moving into marketing, I spent about three years in software development and testing at Wipro and Q3 Technologies, which taught me to work methodically, pay attention to detail, and pick up new tools quickly. I am curious about social media, content, SEO, paid campaigns, and what makes audiences respond. I am looking for an entry-level role where I can work on real campaigns, test ideas, take ownership, and keep building my skills across these areas.
              </p>
            </section>

            {/* CORE SKILLS */}
            <section className="ats-section mb-2">
              <h2 className="ats-section-title">Core Skills</h2>
              <div className="text-[7.5pt] text-neutral-900 leading-[1.25] space-y-0.5">
                <p>
                  <strong className="font-bold text-black">Social Media &amp; Content:</strong> Content Calendar Planning, Social Media Marketing, Caption Writing, Copywriting, Hashtag Research, Community Management, Campaign Planning, Client Coordination, Marketing Analytics
                </p>
                <p>
                  <strong className="font-bold text-black">SEO:</strong> Keyword Research, On-Page SEO, Competitor Analysis, Website Optimization, Google Search Console
                </p>
                <p>
                  <strong className="font-bold text-black">Paid Ads / Performance Marketing (practical exposure):</strong> Google Ads, Meta Ads Manager, Audience Targeting, Ad Copy, Campaign Monitoring and Reporting
                </p>
                <p>
                  <strong className="font-bold text-black">Design &amp; Editing:</strong> Canva, CapCut, VN, Figma
                </p>
                <p>
                  <strong className="font-bold text-black">Technical Background:</strong> Full Stack Development, Software Testing
                </p>
              </div>
            </section>

            {/* WORK EXPERIENCE */}
            <section className="ats-section mb-2">
              <h2 className="ats-section-title">Work Experience</h2>

              <div className="space-y-1.5 text-[7.5pt] leading-[1.25]">
                {/* Role 1 */}
                <div className="ats-item">
                  <div className="flex items-baseline justify-between font-bold text-black">
                    <span>Founder &amp; Digital Marketing Consultant | Digitally Kolkata, Kolkata</span>
                    <span className="font-normal text-neutral-800">Dec 2025 – Present</span>
                  </div>
                  <ul className="list-disc ml-3.5 space-y-0.5 text-neutral-900 mt-0.5">
                    <li>Take on freelance digital marketing work, including social media strategy, content creation, and campaign support for businesses.</li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div className="ats-item">
                  <div className="flex items-baseline justify-between font-bold text-black">
                    <span>Digital Marketing Intern | Mind &amp; Matter, Kolkata</span>
                    <span className="font-normal text-neutral-800">Feb 2026 – Aug 2026</span>
                  </div>
                  <ul className="list-disc ml-3.5 space-y-0.5 text-neutral-900 mt-0.5">
                    <li>Planned, scheduled, and published social media content in Meta Business Suite for client brands including Zee Bangla Sonar, MSP Steel, Walplast, and Drychem.</li>
                    <li>Built content calendars around brand tone, campaign goals, and seasonal events; designed creatives in Canva and edited short-form videos in CapCut and VN.</li>
                    <li>Wrote captions and ad copy, researched hashtags and trends, and supported Google Ads and Meta Ads targeting, monitoring, and reporting.</li>
                    <li>Reviewed engagement data in Meta Business Suite and Google Analytics to refine content, and worked with clients and the team on briefs, approvals, and timelines.</li>
                  </ul>
                </div>

                {/* Role 3 */}
                <div className="ats-item">
                  <div className="flex items-baseline justify-between font-bold text-black">
                    <span>Digital Marketing Intern | JRD Ayurveda, Kolkata</span>
                    <span className="font-normal text-neutral-800">Jan 2026 – Feb 2026</span>
                  </div>
                  <ul className="list-disc ml-3.5 space-y-0.5 text-neutral-900 mt-0.5">
                    <li>Supported social media content planning and designed Canva creatives for a wellness and Ayurveda brand.</li>
                    <li>Researched keywords and competitors to find content and SEO opportunities; drafted captions and hashtags.</li>
                  </ul>
                </div>

                {/* Role 4 */}
                <div className="ats-item">
                  <div className="flex items-baseline justify-between font-bold text-black">
                    <span>Digital Marketing Intern | KDMI (Kolkata Digital Marketing Institute), Kolkata</span>
                    <span className="font-normal text-neutral-800">Nov 2025 – Jan 2026</span>
                  </div>
                  <ul className="list-disc ml-3.5 space-y-0.5 text-neutral-900 mt-0.5">
                    <li>Completed hands-on training and live assignments in SEO, social media, Google Ads, Meta Ads, and analytics, including keyword research, on-page SEO audits, and campaign planning.</li>
                  </ul>
                </div>

                {/* Tech roles */}
                <div className="ats-item flex items-baseline justify-between font-bold text-black pt-0.5">
                  <span>Software Engineer | Q3 Technologies, Gurgaon</span>
                  <span className="font-normal text-neutral-800">Apr 2025 – Oct 2025</span>
                </div>
                <div className="ats-item flex items-baseline justify-between font-bold text-black">
                  <span>Test Engineer | Wipro, Bengaluru</span>
                  <span className="font-normal text-neutral-800">Sep 2021 – Mar 2024</span>
                </div>
              </div>
            </section>

            {/* DIGITAL MARKETING PROJECTS */}
            <section className="ats-section mb-2">
              <h2 className="ats-section-title">Digital Marketing Projects</h2>
              <ul className="list-disc ml-3.5 space-y-0.5 text-[7.5pt] leading-[1.25] text-neutral-900">
                <li>
                  <strong className="font-bold text-black">FIFA 2026 Campaign (Walplast):</strong> Helped plan and run an interactive prediction-contest campaign on Instagram and Facebook around the FIFA 2026 knockout stages to grow organic reach and community interaction. The campaign recorded 1.1M+ views, 30K+ engagements, and 323+ new followers across 28 creatives.
                </li>
                <li>
                  <strong className="font-bold text-black">SEO &amp; Website Optimization:</strong> Keyword research with Google Keyword Planner, Ubersuggest, and Google Trends; on-page SEO recommendations to improve website visibility.
                </li>
                <li>
                  <strong className="font-bold text-black">Campaign Support:</strong> Google Ads and Meta Ads planning, audience targeting, ad copy, monitoring, and performance analysis.
                </li>
              </ul>
            </section>

            {/* EDUCATION & CERTIFICATIONS */}
            <section className="ats-section mb-2">
              <h2 className="ats-section-title">Education &amp; Certifications</h2>
              <div className="text-[7.5pt] leading-[1.25] text-neutral-900 space-y-0.5">
                <div className="flex items-baseline justify-between">
                  <span><strong className="font-bold text-black">Digital Marketing</strong> | Kolkata Digital Marketing Institute, Kolkata</span>
                  <span>Oct 2025 – Jan 2026</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span><strong className="font-bold text-black">Full Stack Development</strong> | MASAI (Remote)</span>
                  <span>Mar 2024 – Apr 2025</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span><strong className="font-bold text-black">Bachelor of Computer Applications (B.C.A)</strong> | Dinabandhu Andrews Institute of Technology and Management, Kolkata | CGPA: 8.96 / 10</span>
                  <span>2018 – 2021</span>
                </div>
                <p className="pt-0.5">
                  <strong className="font-bold text-black">Certifications:</strong> HubSpot Academy – Digital Marketing Certified; Social Media Marketing II Certified; Inbound Marketing Certified; Social Media Certified
                </p>
              </div>
            </section>

            {/* TOOLS & PLATFORMS */}
            <section className="ats-section">
              <h2 className="ats-section-title">Tools &amp; Platforms</h2>
              <div className="text-[7.5pt] leading-[1.25] text-neutral-900 space-y-0.5">
                <p>
                  <strong className="font-bold text-black">Marketing:</strong> Meta Business Suite, Google Analytics, Google Ads, Mailchimp, Looker Studio, RocketSend (WhatsApp campaigns), Salesforce CRM, Microsoft Excel
                </p>
                <p>
                  <strong className="font-bold text-black">SEO:</strong> Google Keyword Planner, Google Trends, Ubersuggest, SEMrush, Ahrefs Webmaster Tools, Moz
                </p>
                <p>
                  <strong className="font-bold text-black">Creative &amp; AI:</strong> Canva, CapCut, Figma, Notion, WordPress, Claude, ChatGPT, Gemini
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </>
  );
}
