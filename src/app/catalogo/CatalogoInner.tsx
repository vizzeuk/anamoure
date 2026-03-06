"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import type { ProductSummary } from "@/sanity/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Category = "Todos" | "Pastelería" | "Banquetería Dulce" | "Banquetería Salada";
const filters: Category[] = ["Todos", "Pastelería", "Banquetería Dulce", "Banquetería Salada"];

type ProductWithImage = ProductSummary & { imageUrl: string | null };

interface Props {
  products: ProductWithImage[];
}

function CatalogoInnerClient({ products }: Props) {
  const searchParams = useSearchParams();
  const param = searchParams.get("categoria");
  const validCategories: Category[] = ["Pastelería", "Banquetería Dulce", "Banquetería Salada"];
  const initialCategory: Category = validCategories.includes(param as Category)
    ? (param as Category)
    : "Todos";

  const [active, setActive] = useState<Category>(initialCategory);

  const filtered =
    active === "Todos" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F0E8D8]">
        {/* Page header */}
        <div className="relative overflow-hidden bg-[#661028] px-6 pb-20 pt-40 lg:px-12 lg:pb-28 lg:pt-52">
          <div className="mx-auto max-w-[1440px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mb-3 font-sans text-[10px] font-medium tracking-[0.35em] uppercase text-[#EEE4D0]/50"
            >
              ANAMOURE — Colección
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="font-heading text-5xl font-bold leading-tight [letter-spacing:-0.02em] text-[#EEE4D0] md:text-6xl lg:text-7xl"
            >
              Catálogo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mt-4 font-sans text-sm font-light tracking-wide text-[#EEE4D0]/50"
            >
              Explora nuestra colección de repostería y banquetería de autor
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease }}
            className="pointer-events-none absolute -bottom-20 right-[-2%] z-10 w-[clamp(260px,40vw,560px)] lg:right-4"
            style={{ rotate: -15 }}
          >
            <Image
              src="/galleta.png"
              alt=""
              width={560}
              height={560}
              className="h-auto w-full select-none opacity-80"
            />
          </motion.div>
        </div>

        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">

          {/* Filtros mobile — pills, solo visible en mobile */}
          <div className="mb-8 lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`shrink-0 rounded-full px-4 py-2 font-sans text-xs font-medium tracking-wide transition-all duration-200 ${
                    active === f
                      ? "bg-[#661028] text-[#EEE4D0]"
                      : "border border-[#661028]/20 text-[#661028]/60 hover:border-[#661028]/50 hover:text-[#661028]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-12">
            {/* Sidebar desktop */}
            <aside className="hidden w-56 shrink-0 lg:block">
              <div className="sticky top-32">
                <p className="mb-6 font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-[#661028]/40">
                  Filtrar por
                </p>
                <nav className="flex flex-col gap-1">
                  {filters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setActive(f)}
                      className={`group flex items-center justify-between rounded-xl px-4 py-3 text-left font-sans text-sm font-medium tracking-wide transition-all duration-300 ${
                        active === f
                          ? "bg-[#661028] text-[#EEE4D0]"
                          : "text-[#661028]/60 hover:bg-[#661028]/8 hover:text-[#661028]"
                      }`}
                    >
                      <span>{f}</span>
                      {active === f && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#EEE4D0]/60" />
                      )}
                    </button>
                  ))}
                </nav>
                <p className="mt-8 font-sans text-[10px] font-light tracking-wide text-[#661028]/30">
                  {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>
            </aside>

            {/* Filtros mobile — pills horizontales */}
            {/* (renderizados arriba, fuera del flex) */}

            {/* Product grid */}
            <div className="flex-1">
              <div className="mb-8 hidden items-center justify-between lg:hidden">
                <p className="font-sans text-xs font-medium tracking-wide text-[#661028]/50">
                  {active} · {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>

              <motion.div
                layout
                className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-7"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, y: 28, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease }}
                      className="group flex flex-col"
                    >
                      <Link href={`/catalogo/${product.slug.current}`} className="block">
                        <div className="relative overflow-hidden rounded-3xl">
                          {product.imageUrl ? (
                            <div className="relative aspect-square w-full overflow-hidden rounded-3xl transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 33vw"
                              />
                              <div className="pointer-events-none absolute inset-2 rounded-2xl border border-white/10" />
                            </div>
                          ) : (
                            <div
                              className="relative aspect-square w-full bg-[#661028] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            >
                              <div className="pointer-events-none absolute inset-2 rounded-2xl border border-[#EEE4D0]/10" />
                            </div>
                          )}

                          {/* Tag */}
                          {product.tag && (
                            <span className="absolute left-3 top-3 rounded-full border border-[#EEE4D0]/25 bg-black/20 px-2.5 py-1 font-sans text-[9px] font-medium tracking-[0.18em] uppercase text-[#EEE4D0]/80 backdrop-blur-sm">
                              {product.tag}
                            </span>
                          )}


                        </div>
                      </Link>

                      <div className="mt-3 pl-1">
                        <h3 className="font-heading text-base font-bold leading-snug text-[#661028] md:text-lg">
                          {product.name}
                        </h3>
                        <p className="mt-1.5 font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-[#661028]/35 transition-colors group-hover:text-[#661028]/60">
                          Ver detalle →
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CatalogoInner(props: Props) {
  return (
    <Suspense fallback={null}>
      <CatalogoInnerClient {...props} />
    </Suspense>
  );
}
