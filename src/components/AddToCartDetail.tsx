"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import type { ProductSize } from "@/sanity/types";

interface Props {
  id: string;
  slug: string;
  name: string;
  category: string;
  sizes?: ProductSize[];
}

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

export default function AddToCartDetail({ id, slug, name, category, sizes }: Props) {
  const { addItem, items } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    sizes && sizes.length > 0 ? sizes[0] : null
  );
  const [esPedidoEspecial, setEsPedidoEspecial] = useState(false);
  const [success, setSuccess] = useState(false);

  function selectSize(size: ProductSize) {
    setSelectedSize(size);
    setEsPedidoEspecial(false);
  }

  function selectPedidoEspecial() {
    setSelectedSize(null);
    setEsPedidoEspecial(true);
  }

  // La clave del carrito: para pedido especial usamos "__cotizar"
  const cartKey = esPedidoEspecial
    ? `${id}__cotizar`
    : `${id}__${selectedSize?.name ?? ""}`;
  const isInCart = items.some(
    (i) => `${i.id}__${i.sizeName ?? ""}` === cartKey ||
           (esPedidoEspecial && i.id === id && i.cotizar)
  );

  function handleAdd() {
    if (isInCart || success) return;
    addItem({
      id,
      slug,
      name,
      category,
      sizeName: selectedSize?.name,
      price: selectedSize && selectedSize.price > 0 ? selectedSize.price : null,
      cotizar: esPedidoEspecial,
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Size selector */}
      {sizes && sizes.length > 0 && (
        <div>
          <p className="mb-3 font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-[#661028]/40">
            Selecciona un formato
          </p>
          <div className="flex flex-col gap-2">
            {sizes.map((size) => {
              const isSelected = selectedSize?.name === size.name;
              return (
                <button
                  key={size.name}
                  onClick={() => selectSize(size)}
                  className={`flex items-center justify-between rounded-2xl border px-5 py-3 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#661028] bg-[#661028]/5"
                      : "border-[#661028]/10 hover:border-[#661028]/40"
                  }`}
                >
                  <span className={`font-heading text-sm font-bold ${isSelected ? "text-[#661028]" : "text-[#661028]/60"}`}>
                    {size.name}
                  </span>
                  {size.price > 0 && (
                    <span className={`font-sans text-sm font-medium ${isSelected ? "text-[#661028]" : "text-[#661028]/50"}`}>
                      {formatPrice(size.price)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Opción pedido especial — mismo estilo que los formatos */}
      <button
        onClick={selectPedidoEspecial}
        className={`flex items-center justify-between rounded-2xl border px-5 py-3 text-left transition-all duration-200 ${
          esPedidoEspecial
            ? "border-[#661028] bg-[#661028]/5"
            : "border-[#661028]/10 hover:border-[#661028]/40"
        }`}
      >
        <div>
          <span className={`font-heading text-sm font-bold ${
            esPedidoEspecial ? "text-[#661028]" : "text-[#661028]/60"
          }`}>
            Pedido especial
          </span>
          <p className={`mt-0.5 font-sans text-[10px] font-light ${
            esPedidoEspecial ? "text-[#661028]/50" : "text-[#661028]/35"
          }`}>
            +25 unidades o cantidad personalizada
          </p>
        </div>
        <span className={`font-sans text-xs font-medium ${
          esPedidoEspecial ? "text-[#661028]" : "text-[#661028]/40"
        }`}>
          cotizar
        </span>
      </button>

      {/* Add button */}
      <button
        onClick={handleAdd}
        disabled={isInCart}
        className={`flex w-full items-center justify-center gap-3 rounded-full py-4 font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
          isInCart
            ? "bg-[#661028]/15 text-[#661028]/60 cursor-default"
            : "bg-[#661028] text-[#EEE4D0] shadow-lg shadow-[#661028]/25 hover:scale-[1.02] hover:bg-[#4A0B1A]"
        }`}
      >
        <AnimatePresence mode="wait">
          {success ? (
            <motion.span key="ok" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              ¡Añadido al pedido!
            </motion.span>
          ) : isInCart ? (
            <motion.span key="in" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Ya está en tu pedido ·{" "}
              <Link href="/carrito" className="underline underline-offset-2">
                ver pedido
              </Link>
            </motion.span>
          ) : (
            <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Añadir al pedido
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
