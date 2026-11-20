import React from "react";
import Link from "next/link";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-dark-borderSubtle bg-dark-bg text-warm-gray py-14 px-6 sm:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Identity */}
          <div className="md:col-span-5 space-y-2.5">
            <span className="font-mono text-xs tracking-wider uppercase text-warm-white font-semibold">
              Shenehashis Dutta
            </span>
            <p className="text-sm text-warm-gray leading-relaxed max-w-sm font-normal">
              Digital Marketing &amp; Social Media support with a software engineering foundation.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-warm-muted">
                Based in Kolkata, India · Open to Opportunities
              </span>
            </div>
          </div>

          {/* Quick Index */}
          <div className="md:col-span-3 space-y-2.5 font-mono text-xs">
            <span className="text-warm-muted block tracking-wider uppercase">
              Navigation
            </span>
            <ul className="space-y-1.5">
              <li>
                <Link href="/work" className="hover:text-warm-white transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/creative" className="hover:text-warm-white transition-colors">
                  Creative Archive
                </Link>
              </li>
              <li>
                <Link href="/motion" className="hover:text-warm-white transition-colors">
                  Motion &amp; Video
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-warm-white transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-warm-white transition-colors">
                  Career Transition
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-warm-white transition-colors">
                  Resume (CV)
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Resume */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-warm-muted block tracking-wider uppercase">
              Connect
            </span>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:duttarayan3@gmail.com"
                className="inline-flex items-center gap-1.5 text-warm-white hover:underline transition-colors"
              >
                <span>duttarayan3@gmail.com</span>
                <FiArrowUpRight size={13} />
              </a>
              <a
                href="https://www.linkedin.com/in/im-rayn/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-warm-white transition-colors"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
                <FiArrowUpRight size={13} />
              </a>
              <a
                href="https://github.com/imsneh06"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-warm-white transition-colors"
              >
                <FaGithub />
                <span>GitHub</span>
                <FiArrowUpRight size={13} />
              </a>
            </div>

            <div className="pt-2">
              <a
                href="https://drive.google.com/file/d/1X_G8QEqNvXD9L2pKJyUtxjafG1xzIGo8/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-dark-surface border border-dark-borderSubtle hover:border-dark-border text-xs text-warm-white hover:bg-dark-surface2 transition-colors"
              >
                <FiDownload size={13} />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-dark-borderSubtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-warm-muted">
          <p>© {new Date().getFullYear()} Shenehashis Dutta. Built with precision and restraint.</p>
          <div className="flex items-center gap-5">
            <span>Kolkata, IN</span>
            <span>·</span>
            <Link href="/contact" className="hover:text-warm-white transition-colors">
              Direct Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
