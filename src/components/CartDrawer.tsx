"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { totalItems } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href="/carrito"
        className="flex items-center gap-2.5 rounded-full bg-[#661028] px-5 py-3.5 shadow-xl shadow-[#661028]/30 transition-all duration-300 hover:scale-105 hover:bg-[#4A0B1A]"
      >
        <ShoppingBag className="h-4 w-4 text-[#EEE4D0]" />
        <span className="font-sans text-xs font-semibold text-[#EEE4D0]">
          {totalItems > 0
            ? `${totalItems} ${totalItems === 1 ? "ítem" : "ítems"}`
            : "Mi pedido"}
        </span>
        {totalItems > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEE4D0] font-sans text-[10px] font-bold text-[#661028]">
            {totalItems}
          </span>
        )}
      </Link>
    </motion.div>
  );
}


