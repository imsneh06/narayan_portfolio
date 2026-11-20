"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowUpRight, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./ThemeContext";

const navLinks = [
  { title: "Work", href: "/work" },
  { title: "Creative", href: "/creative" },
  { title: "Motion", href: "/motion" },
  { title: "Experience", href: "/experience" },
  { title: "About", href: "/about" },
  { title: "Resume", href: "/resume" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 py-4 sm:py-5 transition-colors duration-200 pointer-events-none ${
        isOpen
          ? "mix-blend-normal bg-dark-surface/95 backdrop-blur-md border-b border-dark-borderSubtle md:bg-transparent md:border-b-0"
          : "mix-blend-difference"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between pointer-events-auto transition-colors ${
          isOpen ? "text-warm-white" : "text-white"
        }`}
      >
        {/* Brand Logotype */}
        <Link
          href="/"
          className={`group flex items-center gap-2.5 font-mono text-xs tracking-wider uppercase hover:opacity-80 transition-opacity ${
            isOpen ? "text-warm-white" : "text-white"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-warm-white" : "bg-white"}`} />
          <span className="font-semibold">Shenehashis Dutta</span>
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6"
        >
          <div className="flex items-center gap-5 text-xs font-mono">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-opacity ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-white/80 font-normal hover:text-white"
                  }`}
                >
                  {link.title}
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-white"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="h-3.5 w-[1px] bg-white/30" />

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="p-1.5 rounded-md border border-white/40 hover:bg-white/15 text-white transition-colors flex items-center justify-center min-w-[32px] min-h-[32px]"
          >
            {theme === "dark" ? (
              <FiSun size={14} />
            ) : (
              <FiMoon size={14} />
            )}
          </button>

          {/* Contact CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-white px-3 py-1.5 rounded-md border border-white/60 hover:bg-white/15 transition-colors font-medium"
          >
            <span>Contact</span>
            <FiArrowUpRight size={13} />
          </Link>
        </nav>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md transition-colors ${
              isOpen
                ? "border border-dark-borderSubtle text-warm-white hover:bg-dark-surface2"
                : "border border-white/40 text-white"
            }`}
          >
            {theme === "dark" ? (
              <FiSun size={16} />
            ) : (
              <FiMoon size={16} />
            )}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            className={`p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md transition-colors ${
              isOpen
                ? "border border-dark-borderSubtle text-warm-white hover:bg-dark-surface2"
                : "text-white border border-white/40 hover:bg-white/15"
            }`}
          >
            {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-0 top-[60px] bg-dark-surface border-b border-dark-borderSubtle px-6 py-6 md:hidden shadow-xl mix-blend-normal pointer-events-auto text-warm-white"
          >
            <div className="flex flex-col space-y-4 text-left font-mono">
              <span className="text-[11px] uppercase tracking-wider text-warm-muted pb-2 border-b border-dark-borderSubtle">
                Navigation
              </span>

              {navLinks.map((link, idx) => {
                const isActive = pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-1.5 text-sm transition-colors"
                  >
                    <span
                      className={
                        isActive
                          ? "text-warm-white font-medium"
                          : "text-warm-gray hover:text-warm-white"
                      }
                    >
                      0{idx + 1} / {link.title}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                    )}
                  </Link>
                );
              })}

              <div className="pt-3 mt-2 border-t border-dark-borderSubtle flex items-center justify-between">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 text-xs font-mono font-medium rounded-md bg-white text-dark-bg hover:bg-warm-white transition-colors"
                >
                  Direct Contact
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
