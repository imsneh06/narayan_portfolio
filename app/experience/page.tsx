"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiDownload, FiArrowUpRight, FiCheck } from "react-icons/fi";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  focus: string;
  responsibilities: string[];
}

const marketingRoles: ExperienceItem[] = [
  {
    period: "Dec 2025 – Present",
    role: "Founder & Digital Marketing Consultant",
    company: "Digitally Kolkata",
    location: "Kolkata, India",
    focus: "Freelance Digital Marketing, Social Media Strategy & Campaigns",
    responsibilities: [
      "Take on freelance digital marketing work, including social media strategy, content creation, and campaign support for businesses."
    ],
  },
  {
    period: "Feb 2026 – Aug 2026",
    role: "Digital Marketing Intern",
    company: "Mind & Matter",
    location: "Kolkata, India",
    focus: "Social Media Execution, Content Calendars & Multi-Brand Campaigns",
    responsibilities: [
      "Planned, scheduled, and published social media content in Meta Business Suite for client brands including Zee Bangla Sonar, MSP Steel, Walplast, and Drychem.",
      "Built content calendars around brand tone, campaign goals, and seasonal events; designed creatives in Canva and edited short-form videos in CapCut and VN.",
      "Wrote captions and ad copy, researched hashtags and trends, and supported Google Ads and Meta Ads targeting, monitoring, and reporting.",
      "Reviewed engagement data in Meta Business Suite and Google Analytics to refine content, and worked with clients and the team on briefs, approvals, and timelines."
    ],
  },
  {
    period: "Jan 2026 – Feb 2026",
    role: "Digital Marketing Intern",
    company: "JRD Ayurveda",
    location: "Kolkata, India",
    focus: "Wellness Brand Social Planning, Creative Design & SEO",
    responsibilities: [
      "Supported social media content planning and designed Canva creatives for a wellness and Ayurveda brand.",
      "Researched keywords and competitors to find content and SEO opportunities; drafted captions and hashtags."
    ],
  },
  {
    period: "Nov 2025 – Jan 2026",
    role: "Digital Marketing Intern",
    company: "KDMI (Kolkata Digital Marketing Institute)",
    location: "Kolkata, India",
    focus: "Hands-on Practical Training & Live Campaigns",
    responsibilities: [
      "Completed hands-on training and live assignments in SEO, social media, Google Ads, Meta Ads, and analytics, including keyword research, on-page SEO audits, and campaign planning."
    ],
  },
];

const technicalRoles: ExperienceItem[] = [
  {
    period: "Apr 2025 – Oct 2025",
    role: "Software Engineer",
    company: "Q3 Technologies",
    location: "Gurgaon, India",
    focus: "Enterprise CRM Systems & Application Modernization",
    responsibilities: [
      "Collaborated on enterprise CRM enhancement projects and application migration initiatives using .NET, Blazor, and Bootstrap.",
      "Participated in cross-functional development workflows, translating business requirements into structured technical solutions.",
      "Applied systematic debugging, code quality checks, and process optimization to improve internal tool performance."
    ],
  },
  {
    period: "Sep 2021 – Mar 2024",
    role: "Test Engineer",
    company: "Wipro",
    location: "Bengaluru, India",
    focus: "Quality Assurance & Systems Validation",
    responsibilities: [
      "Performed manual and automated regression testing on Salesforce CPQ systems with Jira defect management.",
      "Utilized Jira for structured test planning, defect tracking, and regression analysis across release lifecycles.",
      "Partnered with developers, business analysts, and QA leads to validate requirements and maintain software reliability.",
      "Built a strong foundation in analytical thinking, quality management, and methodical data discipline that now informs marketing execution."
    ],
  },
];

const certifications = [
  {
    title: "Social Media Marketing II Certified",
    issuer: "HubSpot Academy",
    url: "https://app-na2.hubspot.com/academy/achievements/xs73flx6/en/1/sneh-dutta/social-media-marketing-ii-certified",
    image: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/d386c8f9789d4c4c817ee4e2e27e8505.png",
  },
  {
    title: "Inbound Marketing Certified",
    issuer: "HubSpot Academy",
    url: "https://app-na2.hubspot.com/academy/achievements/1c6rkgft/en/1/sneh-dutta/inbound-marketing-certified",
    image: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/db663a23c1ac49639ecf4b5e36e97091.png",
  },
  {
    title: "Social Media Certified",
    issuer: "HubSpot Academy",
    url: "https://app-na2.hubspot.com/academy/achievements/8d7gqtv7/en/1/sneh-dutta/social-media-certified",
    image: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/6b6c3e92bae54d2cb80e1d98a884010e.png",
  },
  {
    title: "Digital Marketing Certified",
    issuer: "HubSpot Academy",
    url: "https://app-na2.hubspot.com/academy/achievements/x09qss96/en/1/sneh-dutta/digital-marketing-certified",
    image: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/2289737151764252bffcb649cc0896fb.png",
  },
  {
    title: "KDMI Digital Marketing Certificate",
    issuer: "KDMI Institute",
    url: null,
    image: "/certifications/kdmi.jpg",
  },
  {
    title: "Masai Certificate",
    issuer: "Masai School",
    url: null,
    image: "/certifications/masai.png",
  },
];

export default function ExperiencePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 pb-24 text-warm-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="border-b border-white/[0.08] pb-12 mb-16 space-y-4">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-warm-muted block">
              04 / CAREER RECORD
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl sm:text-6xl font-sans font-bold tracking-tight uppercase text-warm-white">
                  Experience
                </h1>
                <p className="text-warm-gray text-base sm:text-lg max-w-2xl mt-4 font-light">
                  A transparent chronology separating recent digital marketing internships from previous software engineering and quality assurance experience.
                </p>
              </div>

              <a
                href="https://drive.google.com/file/d/185494u4R1dLbgnbQKxqLRyc1aL6FcCvp/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-dark-surface border border-white/[0.12] hover:border-white/30 text-xs font-mono uppercase tracking-[0.18em] text-warm-white transition-all shrink-0"
              >
                <FiDownload size={14} className="text-warm-gray" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* ─── SECTION 1: DIGITAL MARKETING ROLES ─── */}
          <section className="space-y-12 mb-20">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent-blue" />
              <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-warm-white font-bold">
                PART 01 / DIGITAL MARKETING EXPERIENCE
              </h2>
            </div>

            <div className="space-y-10 border-l border-white/[0.08] pl-6 sm:pl-8 ml-2">
              {marketingRoles.map((role, idx) => (
                <article key={idx} className="relative group space-y-3">
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-[#1A1A1A] border border-white/20 group-hover:border-accent-blue transition-colors" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-xs">
                    <span className="text-accent-blue font-semibold">{role.period}</span>
                    <span className="text-warm-muted">{role.location}</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-warm-white">
                      {role.role}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-wider text-warm-gray mt-0.5">
                      {role.company} · {role.focus}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 text-xs sm:text-sm font-light text-warm-gray leading-relaxed">
                    {role.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-warm-muted mt-1 text-xs">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* ─── SECTION 2: SOFTWARE ENGINEERING & QA BACKGROUND ─── */}
          <section className="space-y-12 mb-20 pt-12 border-t border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-warm-muted" />
              <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-warm-muted font-bold">
                PART 02 / PREVIOUS SOFTWARE ENGINEERING &amp; QA EXPERIENCE
              </h2>
            </div>

            <p className="text-sm font-light text-warm-gray max-w-2xl leading-relaxed">
              Prior professional foundation built over 3+ years in enterprise IT, emphasizing analytical debugging, Jira release cycles, and systems testing.
            </p>

            <div className="space-y-10 border-l border-white/[0.08] pl-6 sm:pl-8 ml-2">
              {technicalRoles.map((role, idx) => (
                <article key={idx} className="relative group space-y-3">
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-[#1A1A1A] border border-white/20 group-hover:border-warm-white transition-colors" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-xs">
                    <span className="text-warm-muted font-semibold">{role.period}</span>
                    <span className="text-warm-muted">{role.location}</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-warm-white">
                      {role.role}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-wider text-warm-gray mt-0.5">
                      {role.company} · {role.focus}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 text-xs sm:text-sm font-light text-warm-gray leading-relaxed">
                    {role.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-warm-muted mt-1 text-xs">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* ─── SECTION 3: VERIFIED CERTIFICATIONS ─── */}
          <section className="pt-12 border-t border-white/[0.08] space-y-8">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-warm-muted block">
              PART 03 / CREDENTIALS &amp; CERTIFICATIONS
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-dark-surface border border-white/[0.06] hover:border-white/15 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-warm-muted block">
                      {cert.issuer}
                    </span>
                    <h4 className="text-sm font-sans font-bold text-warm-white">
                      {cert.title}
                    </h4>
                  </div>

                  <div className="relative w-full aspect-[16/9] bg-[#141414] rounded-xl overflow-hidden p-2 flex items-center justify-center">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-contain p-2"
                      sizes="280px"
                    />
                  </div>

                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-warm-gray hover:text-warm-white transition-colors"
                    >
                      <span>Verify Credential</span>
                      <FiArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
