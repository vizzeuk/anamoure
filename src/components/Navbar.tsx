"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";


const leftLinks = [
  { label: "Inicio", href: "/" },
  { label: "La Esencia", href: "#experiencia" },
];
const rightLinks = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = scrolled
    ? "bg-[#7A1230]/95 shadow-sm backdrop-blur-xl"
    : "bg-[#661028]";
  const textColor = "text-[#EEE4D0]";
  const textMuted = "text-[#EEE4D0]/70";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 lg:pt-5"
      >
        {/* ── Pill nav: 3-column grid ── */}
        <nav
          className={`relative flex items-center justify-between md:grid md:w-full md:max-w-xl md:grid-cols-3 w-full max-w-xl rounded-full px-6 py-4 transition-all duration-700 ${navBg}`}
        >
          {/* Left: first 2 links */}
          <div className="hidden items-center gap-5 md:flex">
            {leftLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-sans text-sm font-normal tracking-wide transition-colors duration-500 hover:opacity-100 ${textMuted}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0 flex justify-center">
            <a href="/">
              <Image
                src="/logos/LOGO-ANA.png"
                alt="Anamoure"
                width={90}
                height={36}
                className="h-8 w-auto object-contain"
                priority
              />
            </a>
          </div>

          {/* Right: last 2 links + CTA */}
          <div className="ml-auto flex items-center justify-end md:ml-0">
            <div className="hidden items-center gap-5 md:flex">
              {rightLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-sm font-normal tracking-wide transition-colors duration-500 hover:opacity-100 ${textMuted}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-10 md:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className={`h-5 w-5 ${textColor}`} />
              ) : (
                <Menu className={`h-5 w-5 ${textColor}`} />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#EEE4D0]/95 backdrop-blur-2xl"
          >
            <nav className="flex flex-col items-center gap-8">
              {[...leftLinks, ...rightLinks].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-heading text-3xl font-light tracking-wide text-primary"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
