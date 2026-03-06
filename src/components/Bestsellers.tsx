"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ProductSummary } from "@/sanity/types";

const ease = [0.16, 1, 0.3, 1] as const;

interface Props {
  products: (ProductSummary & { imageUrl: string | null })[];
}

export default function Bestsellers({ products }: Props) {
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
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
                className="group flex flex-col"
              >
                <Link href={`/catalogo/${product.slug.current}`} className="block">
                  {/* Card */}
                  <div className="relative overflow-hidden rounded-3xl">
                    <div className="relative aspect-square w-full overflow-hidden bg-[#661028] transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="pointer-events-none absolute inset-2 rounded-2xl border border-[#EEE4D0]/10" />
                      )}
                      {product.tag && (
                        <span className="absolute left-3 top-3 rounded-full border border-[#EEE4D0]/25 bg-black/20 px-2.5 py-1 font-sans text-[9px] font-medium tracking-[0.18em] uppercase text-[#EEE4D0]/80 backdrop-blur-sm">
                          {product.tag}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Name + description below card */}
                <div className="mt-3 pl-1">
                  <h3 className="font-heading text-base font-bold leading-snug text-[#661028] md:text-lg">
                    {product.name}
                  </h3>
                  {product.shortDescription && (
                    <p className="mt-1 font-sans text-xs font-light leading-relaxed text-[#661028]/60">
                      {product.shortDescription}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center font-sans text-sm font-light text-[#661028]/40">
            Próximamente nuestros favoritos aquí.
          </p>
        )}

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/catalogo"
            className="rounded-full border border-[#661028] px-10 py-3.5 font-sans text-xs font-medium tracking-[0.2em] uppercase text-[#661028] transition-all duration-300 hover:bg-[#661028] hover:text-[#EEE4D0]"
          >
            Explorar Catálogo
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
