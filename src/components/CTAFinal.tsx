"use client";

import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CTAFinal() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-[#661028] px-6 py-32 lg:px-12 lg:py-48"
    >
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="select-none font-heading text-[18rem] font-extralight leading-none text-[#EEE4D0] md:text-[30rem]">
          A
        </span>
      </motion.div>

      {/* Gold accent lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="absolute left-0 top-0 h-px w-full origin-left bg-[#EEE4D0]/10"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-10 flex items-center justify-center gap-3"
        >
          <CalendarDays className="h-4 w-4 text-[#EEE4D0]/60" />
          <span className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-[#EEE4D0]/50">
            Bodas · Eventos · Celebraciones
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="mb-8 font-heading text-4xl font-bold leading-[1.05] [letter-spacing:-0.02em] text-[#EEE4D0] md:text-6xl lg:text-7xl"
        >
          Hagamos de tu
          <br />
          evento algo{" "}
          <span className="text-[#EEE4D0]">irrepetible</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mx-auto mb-14 max-w-lg font-sans text-sm font-normal leading-[1.8] tracking-wide text-[#EEE4D0]/55 lg:text-base"
        >
          Desde mesas de postres para 200 invitados hasta bandejas de banqueteria. Diseñamos una propuesta a medida para que cada detalle
          refleje tu visión.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
        >
          <a
            href="https://wa.me/56941564398?text=Hola%20Anamoure!%20quiero%20agendar%20una%20cotizacion%20para%20mi%20evento."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 rounded-full border border-[#EEE4D0]/40 bg-[#EEE4D0]/15 px-10 py-4 font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#EEE4D0] transition-all duration-500 hover:bg-[#EEE4D0]/25"
          >
            Agendar Consulta Gratuita
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          className="mt-8 font-sans text-[10px] font-light tracking-[0.2em] uppercase text-[#EEE4D0]/30"
        >
          Respuesta en menos de 24 horas · Sin compromiso
        </motion.p>
      </div>
    </section>
  );
}
