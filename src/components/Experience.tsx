"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  {
    number: "25",
    label: "Recetas exclusivas",
    description: "Desarrolladas y perfeccionadas en nuestra propia cocina de autor.",
    accent: true,
  },
  {
    number: "100%",
    label: "Artesanal",
    description: "Sin procesos industriales. Cada pieza elaborada de principio a fin a mano.",
    accent: false,
  },
  {
    number: "0",
    label: "Conservantes",
    description: "Solo ingredientes frescos y naturales en cada preparación.",
    accent: false,
  },
  {
    number: "48h",
    label: "Anticipación mínima",
    description: "Porque lo extraordinario no se improvisa. Reserva con tiempo.",
    accent: true,
  },
];

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="relative overflow-hidden bg-[#EEE4D0] px-6 py-24 lg:px-12 lg:py-40"
    >
      {/* Label + heading */}
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 lg:mb-24 lg:flex lg:items-end lg:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease }}
              className="mb-4 font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-[#661028]/50"
            >
              Nuestra esencia
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease }}
              className="font-heading text-4xl font-bold leading-[1.05] [letter-spacing:-0.02em] text-[#661028] md:text-5xl lg:text-6xl"
            >
              Lo que nos
              <br />
              define
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-6 max-w-sm font-sans text-base font-normal leading-relaxed text-[#661028]/60 lg:mt-0 lg:text-right"
          >
            Cada detalle en ANAMOURE responde a un compromiso real con la calidad,
            la creatividad y el sabor auténtico.
          </motion.p>
        </div>

        {/* Stats grid  2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              className={`group flex flex-col justify-between rounded-3xl p-6 lg:p-8 ${
                stat.accent
                  ? "bg-[#661028] text-[#EEE4D0]"
                  : "bg-[#F7F0E4] text-[#661028]"
              }`}
            >
              <span
                className={`font-heading text-5xl font-bold leading-none [letter-spacing:-0.03em] lg:text-6xl ${
                  stat.accent ? "text-[#EEE4D0]" : "text-[#661028]"
                }`}
              >
                {stat.number}
              </span>

              <div className="mt-8 lg:mt-12">
                <p
                  className={`mb-2 font-sans text-xs font-semibold tracking-[0.18em] uppercase ${
                    stat.accent ? "text-[#EEE4D0]/60" : "text-[#661028]/50"
                  }`}
                >
                  {stat.label}
                </p>
                <p
                  className={`font-sans text-sm font-light leading-relaxed ${
                    stat.accent ? "text-[#EEE4D0]/75" : "text-[#661028]/60"
                  }`}
                >
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent strip */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, delay: 0.5, ease }}
          style={{ originX: 0 }}
          className="mt-10 h-px bg-[#661028]/15 lg:mt-14"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease }}
          className="mt-6 font-heading text-xl font-light italic text-[#661028]/40 lg:text-2xl"
        >
          Diseñamos experiencias que transforman lo ordinario en extraordinario.
        </motion.p>
      </div>
    </section>
  );
}