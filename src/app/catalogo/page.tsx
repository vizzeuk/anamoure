"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

type Category = "Todos" | "Pastelería" | "Banquetería Dulce" | "Banquetería Salada";

interface Product {
  id: number;
  name: string;
  category: Exclude<Category, "Todos">;
  description: string;
  tag: string;
  gradient: string;
}

const products: Product[] = [
  // Pastelería
  { id: 1, name: "Tarta de Frutos Rojos", category: "Pastelería", description: "Base de masa sablée, crema de almendra y coulis de frambuesa con frutos del bosque frescos.", tag: "Temporada", gradient: "from-[#661028] to-[#3D0A17]" },
  { id: 2, name: "Pastel Naked Cake", category: "Pastelería", description: "Tres capas de bizcocho de vainilla, buttercream de flor de azahar y decoración silvestre.", tag: "Bodas", gradient: "from-[#4A0B1A] to-[#661028]" },
  { id: 3, name: "Cheesecake de Matcha", category: "Pastelería", description: "Base de galleta de jengibre, relleno cremoso con matcha ceremonial importado de Kyoto.", tag: "Especial", gradient: "from-[#2D061A] to-[#4A0B1A]" },
  { id: 4, name: "Tarta de Chocolate", category: "Pastelería", description: "Ganache de chocolate 72%, base crujiente de avellana y flor de sal marina.", tag: "Favorito", gradient: "from-[#661028] to-[#2D061A]" },
  // Banquetería Dulce
  { id: 5, name: "Rollitos de Canela", category: "Banquetería Dulce", description: "Suaves, esponjosos y bañados en frosting de vainilla de Madagascar.", tag: "Bestseller", gradient: "from-[#4A0B1A] to-[#661028]" },
  { id: 6, name: "Crumble Cookies", category: "Banquetería Dulce", description: "Crujientes por fuera, fondantes por dentro. Con chips de chocolate premium.", tag: "Bestseller", gradient: "from-[#661028] to-[#3D0A17]" },
  { id: 7, name: "Alfajores", category: "Banquetería Dulce", description: "Masa de maíz delicada, dulce de leche artesanal y coco rallado.", tag: "Tradición", gradient: "from-[#3D0A17] to-[#4A0B1A]" },
  { id: 8, name: "Brownie Fudgy", category: "Banquetería Dulce", description: "Chocolate negro intenso, nuez tostada y centro húmedo irresistible.", tag: "Clásico", gradient: "from-[#2D061A] to-[#661028]" },
  { id: 9, name: "Macarons de Temporada", category: "Banquetería Dulce", description: "Cáscaras de almendra con ganaches de sabores exclusivos de la estación.", tag: "Edición Limitada", gradient: "from-[#661028] to-[#4A0B1A]" },
  // Banquetería Salada
  { id: 10, name: "Profiteroles de Queso", category: "Banquetería Salada", description: "Choux crujiente relleno de queso brie, miel de trufa y nuez garapiñada.", tag: "Aperitivo", gradient: "from-[#4A0B1A] to-[#2D061A]" },
  { id: 11, name: "Crostini de Higo", category: "Banquetería Salada", description: "Pan artesanal tostado, prosciutto di Parma, higo fresco y reducción de balsámico.", tag: "Premium", gradient: "from-[#661028] to-[#3D0A17]" },
  { id: 12, name: "Blinis de Salmón", category: "Banquetería Salada", description: "Mini blinis esponjosos, crème fraîche al eneldo y salmón ahumado artesanal.", tag: "Gourmet", gradient: "from-[#3D0A17] to-[#661028]" },
];

const filters: Category[] = ["Todos", "Pastelería", "Banquetería Dulce", "Banquetería Salada"];

function CatalogoInner() {
  const searchParams = useSearchParams();
  const param = searchParams.get("categoria");
  const validCategories: Category[] = ["Pastelería", "Banquetería Dulce", "Banquetería Salada"];
  const initialCategory: Category = validCategories.includes(param as Category) ? (param as Category) : "Todos";

  const [active, setActive] = useState<Category>(initialCategory);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = active === "Todos" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F0E8D8]">
        {/* Page header — solid hero */}
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
              Explora nuestra colección de repostería y banquetería de autor
            </motion.p>
          </div>
          {/* Rollito decorativo — esquina inferior derecha */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease }}
            className="pointer-events-none absolute -bottom-16 right-0 z-10 w-[clamp(200px,30vw,420px)] lg:right-6"
            style={{ rotate: -12 }}
          >
            <Image
              src="/cinnamon-roll.png"
              alt=""
              width={260}
              height={260}
              className="h-auto w-full select-none opacity-70"
            />
          </motion.div>        </div>

        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="flex gap-12">

            {/* ── Sidebar desktop ── */}
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

                {/* Count */}
                <p className="mt-8 font-sans text-[10px] font-light tracking-wide text-[#661028]/30">
                  {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>
            </aside>

            {/* ── Mobile filter button ── */}
            <div className="fixed bottom-6 right-6 z-40 lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 rounded-full bg-[#661028] px-5 py-3 font-sans text-xs font-medium tracking-[0.15em] uppercase text-[#EEE4D0] shadow-lg"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filtrar
              </button>
            </div>

            {/* ── Mobile sidebar drawer ── */}
            <AnimatePresence>
              {sidebarOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                  />
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.35, ease }}
                    className="fixed inset-y-0 left-0 z-50 w-72 bg-[#F0E8D8] p-8 lg:hidden"
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <p className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-[#661028]/40">
                        Filtrar por
                      </p>
                      <button onClick={() => setSidebarOpen(false)}>
                        <X className="h-4 w-4 text-[#661028]/50" />
                      </button>
                    </div>
                    <nav className="flex flex-col gap-1">
                      {filters.map((f) => (
                        <button
                          key={f}
                          onClick={() => { setActive(f); setSidebarOpen(false); }}
                          className={`rounded-xl px-4 py-3 text-left font-sans text-sm font-medium tracking-wide transition-all duration-300 ${
                            active === f
                              ? "bg-[#661028] text-[#EEE4D0]"
                              : "text-[#661028]/60 hover:bg-[#661028]/8 hover:text-[#661028]"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </nav>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* ── Product grid ── */}
            <div className="flex-1">
              {/* Active filter label (mobile) */}
              <div className="mb-8 flex items-center justify-between lg:hidden">
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
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 28, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease }}
                      className="group flex flex-col"
                    >
                      {/* Card image */}
                      <div className="relative overflow-hidden rounded-2xl">
                        <div
                          className={`aspect-square w-full bg-gradient-to-br ${product.gradient} transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
                        >
                          {/* Inner border */}
                          <div className="pointer-events-none absolute inset-2 rounded-xl border border-[#EEE4D0]/10" />

                          {/* Tag */}
                          <span className="absolute left-3 top-3 rounded-full border border-[#EEE4D0]/25 px-2.5 py-1 font-sans text-[9px] font-medium tracking-[0.18em] uppercase text-[#EEE4D0]/70">
                            {product.tag}
                          </span>

                          {/* Hover: descripcion + CTA */}
                          <div className="absolute inset-0 flex flex-col items-center justify-end rounded-2xl bg-gradient-to-t from-black/60 to-transparent p-5 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                            <p className="mb-4 text-center font-sans text-xs font-light leading-relaxed text-white/80">
                              {product.description}
                            </p>
                            <a
                              href="https://wa.me/TUNUMERO?text=Hola%20ANAMOURE%2C%20quiero%20cotizar"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 rounded-full bg-[#EEE4D0] px-4 py-2 font-sans text-[9px] font-medium tracking-[0.18em] uppercase text-[#661028] transition-colors duration-300 hover:bg-white"
                            >
                              <MessageCircle className="h-3 w-3" />
                              Cotizar
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Name + category */}
                      <div className="mt-3 pl-1">
                        <h3 className="font-heading text-base font-bold leading-snug text-[#661028] md:text-lg">
                          {product.name}
                        </h3>
                        <p className="mt-0.5 font-sans text-[10px] font-light tracking-wide text-[#661028]/40">
                          {product.category}
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

export default function CatalogoPage() {
  return (
    <Suspense fallback={null}>
      <CatalogoInner />
    </Suspense>
  );
}
