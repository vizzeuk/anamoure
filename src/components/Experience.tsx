"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const paragraphs = [
  "Cada creación de ANAMOURE es un manifiesto de precisión y sensibilidad.",
  "Trabajamos con ingredientes de origen selecto, técnicas de vanguardia y una obsesión inquebrantable por el detalle.",
  "No hacemos repostería ni cócteles. Diseñamos experiencias sensoriales que transforman lo ordinario en extraordinario.",
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="relative overflow-hidden bg-base px-6 py-32 lg:px-12 lg:py-48"
    >
      {/* Background accent number */}
      <motion.span
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [0, 0.04]) }}
        className="pointer-events-none absolute -right-10 top-20 select-none font-heading text-[20rem] font-extralight leading-none text-primary lg:text-[28rem]"
      >
        02
      </motion.span>

      <div className="relative mx-auto max-w-2xl text-center">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-16 flex items-center justify-center gap-3"
        >
          <Sparkles className="h-3.5 w-3.5 text-brand" />
          <span className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-primary/50">
            La Experiencia
          </span>
          <Sparkles className="h-3.5 w-3.5 text-brand" />
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="mb-6 font-heading text-4xl font-bold leading-[1.1] [letter-spacing:-0.02em] text-[#661028] md:text-6xl lg:text-7xl"
        >
          Donde el arte
          <br />
          <span className="text-[#661028]">se saborea</span>
        </motion.h2>

        {/* Animated line */}
        <motion.div
          style={{ width: lineWidth }}
          className="mx-auto mb-16 h-px bg-brand/30"
        />

        {/* Paragraphs animated line-by-line */}
        <div className="space-y-8">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease,
              }}
              className="font-sans text-base font-normal leading-[1.8] tracking-wide text-primary/70 lg:text-lg"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-20 grid grid-cols-3 gap-6 border-t border-primary/10 pt-12"
        >
          {[
            { number: "200+", label: "Eventos" },
            { number: "5★", label: "Reseñas" },
            { number: "100%", label: "A Medida" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease }}
              className="text-center"
            >
              <span className="font-heading text-2xl font-bold text-[#661028] md:text-3xl">
                {stat.number}
              </span>
              <p className="mt-2 font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-primary/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
