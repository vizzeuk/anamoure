"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

const categories = [
  {
    title: "Pastelería",
    description: "Pasteles de autor para momentos únicos",
    gradient: "from-[#661028] to-[#4A0B1A]",
    href: "/catalogo?categoria=Pastelería",
    image: "/photos/pasteleria.webp",
    imageClass: "object-contain p-2 drop-shadow-lg",
    delay: 0,
  },
  {
    title: "Banquetería Dulce",
    description: "Bocados irresistibles que deleitan el paladar",
    gradient: "from-[#4A0B1A] to-[#2D061A]",
    href: "/catalogo?categoria=Banquetería Dulce",
    image: "/photos/banqueteria-dulce.png",
    imageClass: "object-contain scale-[1.35] -translate-x-[3.75%] drop-shadow-lg",
    delay: 0.12,
  },
  {
    title: "Banquetería Salada",
    description: "Sofisticados aperitivos de cocina de autor",
    gradient: "from-[#2D061A] to-[#661028]",
    href: "/catalogo?categoria=Banquetería Salada",
    image: "/photos/banqueteria-salada.png",
    imageClass: "object-contain p-2 drop-shadow-lg",
    delay: 0.24,
  },
];

export default function Categories() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-[#F0E8D8] px-6 py-14 md:min-h-0 lg:px-12 lg:pb-44 lg:pt-36">
      <div className="mx-auto max-w-[1440px]">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="mb-8 text-center font-heading text-2xl font-bold leading-tight [letter-spacing:-0.02em] text-[#661028] sm:mb-10 sm:text-3xl md:mb-16 md:text-4xl lg:mb-24 lg:text-6xl"
        >
          Encuentra lo que más amas
        </motion.h2>

        {/*
          Mobile (<md): lista vertical — círculo izquierda, texto derecha
          Los 3 ítems caben en pantalla sin scroll
          Desktop (md+): fila horizontal, círculo arriba, texto abajo
        */}
        <div className="flex flex-col gap-7 sm:gap-9 md:flex-row md:flex-wrap md:justify-center md:gap-16 lg:gap-28">
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: cat.delay, ease }}
              className="group flex flex-row items-center gap-5 sm:gap-7 md:flex-col md:items-center md:gap-6"
            >
              {/* Círculo — proporcional al viewport en mobile, fijo en desktop */}
              <Link href={cat.href} className="shrink-0">
                <div
                  className={`relative flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br ${cat.gradient} shadow-lg transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl
                    h-[30vw] w-[30vw] sm:h-36 sm:w-36 md:h-52 md:w-52 lg:h-72 lg:w-72`}
                >
                  <div className="absolute inset-[5px] rounded-full border border-[#EEE4D0]/15 md:inset-3" />
                  <div className="absolute inset-0 rounded-full bg-[#EEE4D0]/0 transition-all duration-500 group-hover:bg-[#EEE4D0]/8" />
                  {/* Imagen PNG encima del círculo */}
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    unoptimized
                    className={cat.imageClass}
                    sizes="(max-width: 640px) 30vw, (max-width: 768px) 144px, (max-width: 1024px) 208px, 288px"
                  />
                </div>
              </Link>

              {/* Solo título — sin descripción */}
              <div className="flex flex-col gap-1 md:items-center">
                <p className="font-heading text-lg font-bold leading-snug text-[#661028] transition-colors duration-300 group-hover:text-[#4A0B1A] sm:text-xl md:text-center md:text-2xl">
                  {cat.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
