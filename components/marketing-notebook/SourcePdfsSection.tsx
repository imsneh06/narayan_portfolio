"use client";

import React from "react";
import { FiDownload, FiFileText } from "react-icons/fi";
import { SourcePdfItem } from "@/data/marketing-notebook";

interface SourcePdfsSectionProps {
  showSourcePdfs: boolean;
  pdfs: SourcePdfItem[];
}

export default function SourcePdfsSection({
  showSourcePdfs,
  pdfs,
}: SourcePdfsSectionProps) {
  if (!showSourcePdfs || pdfs.length === 0) return null;

  return (
    <div className="space-y-4">
      <p className="text-xs sm:text-sm text-warm-gray font-normal">
        Original raw exercise notes, teardown matrices and concept drafts prepared during training.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
        {pdfs.map((pdf) => (
          <a
            key={pdf.fileName}
            href={pdf.href}
            download
            className="p-5 rounded-xl bg-dark-surface border border-dark-borderSubtle hover:border-dark-border hover:bg-dark-surface2 transition-colors group flex flex-col justify-between space-y-3 min-h-[52px]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-8 h-8 rounded-lg bg-dark-surface2 border border-dark-borderSubtle text-warm-white flex items-center justify-center shrink-0">
                <FiFileText className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-warm-muted bg-dark-surface2 px-2 py-0.5 rounded border border-dark-borderSubtle">
                PDF Document
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-medium text-warm-white group-hover:text-accent-blue transition-colors font-sans">
                {pdf.title}
              </h4>
              <div className="text-[11px] text-warm-muted flex items-center gap-2">
                <span>{pdf.pages} {pdf.pages === 1 ? "page" : "pages"}</span>
                <span>·</span>
                <span>{pdf.size}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-dark-borderSubtle/60 flex items-center justify-between text-xs text-accent-blue group-hover:underline">
              <span>Download PDF</span>
              <FiDownload className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
