"use client";

import { motion } from "framer-motion";
import { Instagram, Mail, MapPin } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const footerLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Contacto", href: "#contacto" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/anamooure", label: "Instagram" },
  { icon: Mail, href: "mailto:hola@anamoure.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#661028] px-6 pb-10 pt-24 lg:px-12 lg:pt-32">
      {/* Top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="absolute left-6 right-6 top-0 h-px origin-left bg-[#EEE4D0]/20 lg:left-12 lg:right-12"
      />

      <div className="mx-auto max-w-[1440px]">
        {/* Main footer grid */}
        <div className="mb-20 grid gap-12 md:grid-cols-3 lg:mb-32">
          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="font-heading text-base font-bold tracking-[0.2em] uppercase text-[#EEE4D0]">
              ANAMOURE
            </span>
            <p className="mt-4 max-w-xs font-sans text-xs font-light leading-relaxed tracking-wide text-[#EEE4D0]/60">
              Repostería & Banqueteria. Creando momentos
              extraordinarios desde el primer bocado hasta el último sorbo.
            </p>
          </motion.div>

          {/* Column 2: Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <p className="mb-6 font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-[#EEE4D0]/40">
              Navegación
            </p>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm font-bold tracking-wide text-[#EEE4D0]/70 transition-colors duration-300 hover:text-[#EEE4D0]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Column 3: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <p className="mb-6 font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-[#EEE4D0]/40">
              Conecta
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#EEE4D0]/50" />
                <span className="font-sans text-sm font-bold tracking-wide text-[#EEE4D0]/70">
                  Santigago, CL
                </span>
              </div>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-sm font-bold tracking-wide text-[#EEE4D0]/70 transition-colors duration-300 hover:text-[#EEE4D0]"
                >
                  <social.icon className="h-3.5 w-3.5" />
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Large centered logo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="mb-12 text-center"
        >
          <span className="font-heading text-[clamp(3rem,10vw,8rem)] font-bold leading-none tracking-[0.15em] text-[#EEE4D0]">
            ANAMOURE
          </span>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#EEE4D0]/10 pt-6 md:flex-row">
          <p className="font-sans text-[10px] font-light tracking-[0.15em] text-[#EEE4D0]/40">
            © {new Date().getFullYear()} ANAMOURE. 
          </p>
          <p className="font-sans text-[10px] font-light tracking-[0.15em] text-[#EEE4D0]/30">
            Diseñado con obsesión por el detalle
          </p>
        </div>
      </div>
    </footer>
  );
}
