"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

interface Product {
  title: string;
  category: string;
  description: string;
  placeholderClass: string;
  aspect: string;
}

const products: Product[] = [
  {
    title: "Tarta Opéra Noir",
    category: "Alta Repostería",
    description:
      "Capas de bizcocho joconde, ganache de chocolate 70%, crema de café arábica y glaseado espejo.",
    placeholderClass: "img-placeholder-1",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Coctel Le Jardin",
    category: "Coctelería de Autor",
    description:
      "Gin infusionado con lavanda, cordial de pepino, espuma de limón meyer y bitter floral.",
    placeholderClass: "img-placeholder-2",
    aspect: "aspect-[3/4]",
  },
  {
    title: "Entremets Passion",
    category: "Alta Repostería",
    description:
      "Mousse de maracuyá, cremoso de vainilla de Tahití, crujiente de almendra y glaseado dorado.",
    placeholderClass: "img-placeholder-3",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Old Fashioned Fumé",
    category: "Coctelería de Autor",
    description:
      "Bourbon añejado, jarabe de arce ahumado, bitter de naranja y cereza al bourbon.",
    placeholderClass: "img-placeholder-4",
    aspect: "aspect-[3/4]",
  },
  {
    title: "Mille-Feuille Royal",
    category: "Alta Repostería",
    description:
      "Hojaldre caramelizado, crema diplomática de pistacho de Bronte y frambuesas frescas.",
    placeholderClass: "img-placeholder-5",
    aspect: "aspect-[4/5]",
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease }}
      className="group relative"
    >
      {/* Image */}
      <div className={`relative ${product.aspect} w-full overflow-hidden`}>
        <div
          className={`${product.placeholderClass} absolute inset-0 transition-transform duration-700 group-hover:scale-105`}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 transition-all duration-500 group-hover:bg-primary/50" />

        {/* Hover content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <p className="mb-4 max-w-[240px] text-center font-sans text-xs font-normal leading-relaxed tracking-wide text-[#EEE4D0]/80">
            {product.description}
          </p>
          <a
            href="https://wa.me/TUNUMERO?text=Hola%20ANAMOURE%2C%20quiero%20cotizar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brand px-5 py-2.5 font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#EEE4D0] transition-colors duration-300 hover:bg-brand hover:text-[#EEE4D0]"
          >
            <MessageCircle className="h-3 w-3" />
            Cotizar en WhatsApp
          </a>
        </div>

        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span className="font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-[#EEE4D0]/60">
            {product.category}
          </span>
        </div>
      </div>

      {/* Title below image */}
      <div className="mt-4 flex items-start justify-between">
        <h3 className="font-heading text-xl font-bold [letter-spacing:-0.01em] text-[#661028] lg:text-2xl">
          {product.title}
        </h3>
        <ArrowUpRight className="mt-1 h-4 w-4 text-primary/30 transition-all duration-300 group-hover:text-brand" />
      </div>
    </motion.div>
  );
}

export default function Catalog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="relative overflow-hidden bg-[#EEE4D0] px-6 py-32 lg:px-12 lg:py-48"
    >
      {/* Section header */}
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-20 flex flex-col items-start justify-between gap-6 lg:mb-32 lg:flex-row lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="mb-4 font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-brand"
            >
              03 — Colección
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              className="font-heading text-5xl font-bold leading-[0.95] [letter-spacing:-0.02em] text-[#661028] md:text-6xl lg:text-8xl"
            >
              Catálogo
              <br />
              Editorial
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="max-w-sm font-sans text-sm font-light leading-relaxed tracking-wide text-primary/50 lg:text-right"
          >
            Cada pieza es una obra de autor. Pasa el cursor para descubrir los
            detalles y cotiza directamente por WhatsApp.
          </motion.p>
        </div>

        {/* ── Zig-Zag / Bento Grid ── */}
        <motion.div style={{ y: parallaxY }}>
          {/* Row 1: Large left + Small right */}
          <div className="mb-8 grid gap-8 md:grid-cols-12 lg:mb-12">
            <div className="md:col-span-7">
              <ProductCard product={products[0]} index={0} />
            </div>
            <div className="md:col-span-5 md:mt-24">
              <ProductCard product={products[1]} index={1} />
            </div>
          </div>

          {/* Row 2: Offset center */}
          <div className="mb-8 grid gap-8 md:grid-cols-12 lg:mb-12">
            <div className="md:col-span-5 md:col-start-2">
              <ProductCard product={products[2]} index={2} />
            </div>
            <div className="md:col-span-5 md:col-start-8 md:-mt-12">
              <ProductCard product={products[3]} index={3} />
            </div>
          </div>

          {/* Row 3: Full width center */}
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6 md:col-start-4">
              <ProductCard product={products[4]} index={4} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
