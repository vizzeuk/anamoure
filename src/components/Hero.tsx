"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

/*
  4 entradas  left/right solo desktop, center-mobile solo mobile, center-desk solo desktop
*/
const peekRolls = [
  {
    id: "left" as const,
    wrapClass: "hidden md:block left-[2%] lg:left-[5%]",
    rotate: -20,
    widthClass: "w-[30vw] lg:w-[36vw]",
    restY: "18%",
    entranceY: "120%",
    delay: 0.95,
  },
  {
    id: "center-mobile" as const,
    wrapClass: "block md:hidden left-1/2 -translate-x-1/2",
    rotate: 4,
    widthClass: "w-[110vw]",
    restY: "12%",
    entranceY: "140%",
    delay: 0.75,
  },
  {
    id: "center-desk" as const,
    wrapClass: "hidden md:block left-1/2 -translate-x-1/2",
    rotate: 4,
    widthClass: "w-[44vw] lg:w-[46vw]",
    restY: "5%",
    entranceY: "120%",
    delay: 0.75,
  },
  {
    id: "right" as const,
    wrapClass: "hidden md:block right-[2%] lg:right-[5%]",
    rotate: 24,
    widthClass: "w-[28vw] lg:w-[34vw]",
    restY: "20%",
    entranceY: "120%",
    delay: 1.1,
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#661028] px-6"
      style={{ minHeight: "115vh" }}
    >
      {/* Texto: mobile usa pt fijo desde arriba (nunca sale de pantalla),
           desktop usa justify-center con pb para los 3 rolls */}
      <div className="relative z-30 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-start pt-[18vh] text-center md:justify-center md:pt-0 md:pb-[20vh]">
        <motion.div className="relative z-10 flex flex-col items-center">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="mb-6 font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-[#EEE4D0]/50"
          >
            Repostería con amor
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="font-heading text-[clamp(3.5rem,8vw,8rem)] font-bold leading-[0.95] [letter-spacing:-0.02em] text-[#EEE4D0]"
          >
            El arte de
            <br />
            lo efímero
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="mt-8 max-w-md font-sans text-base font-normal leading-relaxed text-[#EEE4D0]/65"
          >
            Creaciones únicas de alta repostería y coctelería
            diseñadas para tus momentos más extraordinarios.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="/catalogo"
              className="w-full rounded-full border border-[#EEE4D0]/40 px-8 py-3.5 font-sans text-xs font-medium tracking-[0.15em] uppercase text-[#EEE4D0] transition-all duration-300 hover:bg-[#EEE4D0]/10 sm:w-auto"
            >
              Explorar Menú
            </a>
            <a
              href="#contacto"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-[#EEE4D0] px-8 py-3.5 font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#661028] transition-all duration-300 hover:bg-[#EEE4D0]/85 sm:w-auto"
            >
              Cotizar
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Rollitos: 1 grande en mobile, 3 en md+ */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        {peekRolls.map((roll) => (
          <motion.div
            key={roll.id}
            className={`absolute bottom-0 ${roll.wrapClass} ${roll.widthClass}`}
            initial={{ y: roll.entranceY }}
            animate={{ y: roll.restY }}
            transition={{ duration: 1.6, delay: roll.delay, ease }}
            style={{
              rotate: roll.rotate,
              filter:
                "drop-shadow(0 -8px 32px rgba(0,0,0,0.35)) drop-shadow(0 -2px 8px rgba(0,0,0,0.2))",
            }}
          >
            <Image
              src="/cinnamon-roll.png"
              alt="Rollito de canela ANAMOURE"
              width={460}
              height={460}
              priority={roll.id === "center-mobile" || roll.id === "center-desk"}
              className="h-auto w-full select-none"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}