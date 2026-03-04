"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const products = [
  {
    name: "Rollitos de Canela",
    tag: "Pastelería",
    description: "Suaves, esponjosos y bañados en frosting de vainilla.",
    gradient: "from-[#661028]/90 via-[#4A0B1A]/80 to-[#2D061A]/90",
    delay: 0,
  },
  {
    name: "Crumble Cookies",
    tag: "Repostería",
    description: "Crujientes por fuera, suaves por dentro. Irresistibles.",
    gradient: "from-[#4A0B1A]/90 via-[#661028]/80 to-[#3D0A17]/90",
    delay: 0.1,
  },
  {
    name: "Brownie",
    tag: "Clásicos",
    description: "Chocolate intenso, textura fudgy y centro perfectamente húmedo.",
    gradient: "from-[#2D061A]/90 via-[#4A0B1A]/80 to-[#661028]/90",
    delay: 0.2,
  },
  {
    name: "Alfajores",
    tag: "Tradición",
    description: "Delicado maíz, dulce de leche artesanal y toque de coco.",
    gradient: "from-[#3D0A17]/90 via-[#661028]/80 to-[#4A0B1A]/90",
    delay: 0.3,
  },
];

export default function Bestsellers() {
  return (
    <section className="bg-[#E5D9C5] px-6 pb-24 pt-20 lg:px-12 lg:pb-32 lg:pt-28">
      <div className="mx-auto max-w-[1440px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="mb-14 text-center"
        >
          <h2 className="font-heading text-4xl font-bold leading-tight [letter-spacing:-0.02em] text-[#661028] md:text-5xl lg:text-6xl">
            Amado por los clientes
          </h2>
          <p className="mt-4 font-sans text-sm font-light tracking-wide text-[#661028]/60">
            Los favoritos que siempre vuelven a pedir
          </p>
        </motion.div>

        {/* Product cards grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: product.delay, ease }}
              className="group flex flex-col"
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-3xl">
                <div
                  className="relative aspect-square w-full bg-[#661028] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                >
                  {/* Decorative inner border */}
                  <div className="pointer-events-none absolute inset-2 rounded-2xl border border-[#EEE4D0]/10" />
                </div>
              </div>

              {/* Name + description below card */}
              <div className="mt-3 pl-1">
                <h3 className="font-heading text-base font-bold leading-snug text-[#661028] md:text-lg">
                  {product.name}
                </h3>
                <p className="mt-1 font-sans text-xs font-light leading-relaxed text-[#661028]/60">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mt-12 flex justify-center"
        >
          <button
            type="button"
            className="rounded-full border border-[#661028] px-10 py-3.5 font-sans text-xs font-medium tracking-[0.2em] uppercase text-[#661028] transition-all duration-300 hover:bg-[#661028] hover:text-[#EEE4D0]"
          >
            Explorar Catálogo
          </button>
        </motion.div>

      </div>
    </section>
  );
}
