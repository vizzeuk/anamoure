"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart, type CartItem } from "@/context/CartContext";

const ease = [0.16, 1, 0.3, 1] as const;

const QTY_OPTIONS = [1, 2, 3, 4];

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

function generateWhatsAppMessage(items: CartItem[]): string {
  const lines = items.map((item) => {
    const nameLine = item.sizeName
      ? `${item.name} (${item.sizeName})`
      : item.name;

    if (item.cotizar || item.price === null) {
      return `• ${nameLine} — pedido especial / cotizar cantidad y precio`;
    }
    const subtotal = item.quantity * item.price;
    return `• ${item.quantity}x ${nameLine} — ${formatPrice(subtotal)}`;
  });

  const pricedItems = items.filter((i) => !i.cotizar && i.price !== null);
  const total = pricedItems.reduce(
    (acc, i) => acc + i.quantity * (i.price as number),
    0
  );
  const hasCotizar = items.some((i) => i.cotizar || i.price === null);

  const msg = [
    "¡Hola Anamoure! � Quiero realizar un pedido desde la web:",
    "",
    ...lines,
    "",
    hasCotizar
      ? `Total estimado: ${total > 0 ? formatPrice(total) : "por cotizar"} *(algunos ítems requieren cotización de precio/cantidad)*`
      : `Total estimado: ${formatPrice(total)}`,
    "",
    "¿Me confirmas disponibilidad? 🙏",
  ].join("\n");

  return encodeURIComponent(msg);
}

function CartItemRow({ item }: { item: CartItem }) {
  const { updateItem, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.35, ease }}
      className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#661028]/10 py-6 last:border-0 sm:grid-cols-[1fr_auto_auto]"
    >
      {/* Info */}
      <div className="min-w-0">
        <Link
          href={`/catalogo/${item.slug}`}
          className="group inline-flex flex-col"
        >
          <span className="font-heading text-base font-bold leading-snug text-[#661028] transition-opacity group-hover:opacity-70 md:text-lg">
            {item.name}
          </span>
          {item.sizeName && (
            <span className="font-sans text-xs font-light text-[#661028]/50">
              {item.sizeName}
            </span>
          )}
        </Link>
        <p className="mt-1 font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-[#661028]/40">
          {item.category}
        </p>

        {item.cotizar || item.price === null ? (
          <p className="mt-3 inline-block rounded-full border border-[#661028]/20 px-3 py-1 font-sans text-xs font-medium italic text-[#661028]/50">
            Pedido especial · precio a cotizar
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#661028]/40">
              Unidades:
            </span>
            {QTY_OPTIONS.map((q) => (
              <button
                key={q}
                onClick={() => updateItem(item.id, item.sizeName, q)}
                className={`h-8 w-8 rounded-full font-sans text-xs font-semibold transition-all duration-200 ${
                  item.quantity === q
                    ? "bg-[#661028] text-[#EEE4D0]"
                    : "border border-[#661028]/20 text-[#661028]/50 hover:border-[#661028]/60 hover:text-[#661028]"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price (hidden on mobile, shown on sm+) */}
      <div className="hidden flex-col items-end justify-center sm:flex">
        {item.cotizar || item.price === null ? (
          <span className="font-sans text-xs font-light text-[#661028]/40">—</span>
        ) : (
          <>
            <span className="font-heading text-base font-bold text-[#661028]">
              {formatPrice(item.quantity * item.price)}
            </span>
            {item.quantity > 1 && (
              <span className="font-sans text-[10px] font-light text-[#661028]/40">
                {formatPrice(item.price)} c/u
              </span>
            )}
          </>
        )}
      </div>

      {/* Remove */}
      <div className="flex items-center">
        <button
          onClick={() => removeItem(item.id, item.sizeName)}
          className="rounded-full p-2 text-[#661028]/25 transition-colors hover:bg-[#661028]/8 hover:text-[#661028]"
          aria-label="Eliminar"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

export default function CarritoPage() {
  const { items, clearCart } = useCart();

  const pricedItems = items.filter((i) => !i.cotizar && i.price !== null);
  const total = pricedItems.reduce(
    (acc, i) => acc + i.quantity * (i.price as number),
    0
  );
  const hasCotizar = items.some((i) => i.cotizar || i.price === null);
  const whatsappUrl = `https://wa.me/56941564398?text=${generateWhatsAppMessage(items)}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F0E8D8]">
        <div className="mx-auto max-w-[780px] px-6 pb-24 pt-28 lg:px-12 lg:pt-36">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-10"
          >
            <Link
              href="/catalogo"
              className="mb-6 inline-flex items-center gap-2 font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-[#661028]/40 transition-colors hover:text-[#661028]"
            >
              <ArrowLeft className="h-3 w-3" />
              Seguir explorando
            </Link>
            <h1 className="font-heading text-3xl font-bold text-[#661028] [letter-spacing:-0.02em] md:text-4xl">
              Tu pedido
            </h1>
            {items.length > 0 && (
              <p className="mt-2 font-sans text-sm font-light text-[#661028]/50">
                {items.length} {items.length === 1 ? "producto" : "productos"} · revisa las cantidades antes de enviar
              </p>
            )}
          </motion.div>

          {items.length === 0 ? (
            /* Empty state */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="flex flex-col items-center gap-6 py-24 text-center"
            >
              <ShoppingBag className="h-14 w-14 text-[#661028]/15" />
              <div>
                <p className="font-heading text-xl font-bold text-[#661028]/40">
                  Tu pedido está vacío
                </p>
                <p className="mt-2 font-sans text-sm font-light text-[#661028]/30">
                  Explora el catálogo y añade lo que te guste
                </p>
              </div>
              <Link
                href="/catalogo"
                className="mt-2 rounded-full bg-[#661028] px-8 py-3.5 font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#EEE4D0] transition-all hover:bg-[#4A0B1A]"
              >
                Ver catálogo
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_320px]">

              {/* Items list */}
              <div>
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItemRow key={`${item.id}__${item.sizeName ?? ""}`} item={item} />
                  ))}
                </AnimatePresence>

                <div className="mt-6">
                  <button
                    onClick={clearCart}
                    className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-[#661028]/35 transition-colors hover:text-[#661028]/60"
                  >
                    Vaciar pedido
                  </button>
                </div>
              </div>

              {/* Summary panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
                className="h-fit rounded-3xl bg-white/60 p-7 shadow-sm"
              >
                <h2 className="mb-6 font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#661028]/50">
                  Resumen
                </h2>

                {/* Line items */}
                <div className="mb-6 flex flex-col gap-3">
                  {items.map((item) => (
                    <div
                      key={`${item.id}__${item.sizeName ?? ""}`}
                      className="flex items-start justify-between gap-2"
                    >
                      <span className="font-sans text-xs font-semibold text-[#661028]/80 leading-snug">
                        {item.cotizar ? "✦ " : `${item.quantity}× `}
                        {item.name}
                        {item.sizeName && (
                          <span className="text-[#661028]/40"> ({item.sizeName})</span>
                        )}
                      </span>
                      <span className="flex-shrink-0 font-sans text-xs font-bold text-[#661028]">
                        {item.cotizar || item.price === null
                          ? "cotizar"
                          : formatPrice(item.quantity * item.price)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="mb-5 h-px w-full bg-[#661028]/10" />

                {/* Total */}
                {hasCotizar && (
                  <p className="mb-3 font-sans text-xs font-medium italic leading-relaxed text-[#661028]/55">
                    ✦ Algunos ítems se cotizarán por WhatsApp
                  </p>
                )}
                <div className="mb-6 flex items-baseline justify-between">
                  <span className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#661028]/60">
                    {hasCotizar ? "Total parcial" : "Total estimado"}
                  </span>
                  <span className="font-heading text-2xl font-bold text-[#661028]">
                    {total > 0 ? formatPrice(total) : "—"}
                  </span>
                </div>

                {/* WhatsApp button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#661028] px-6 py-4 font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#EEE4D0] shadow-lg shadow-[#661028]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#4A0B1A]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Enviar pedido por WhatsApp
                </a>
                <p className="mt-4 text-center font-sans text-xs font-medium leading-relaxed text-[#661028]/45">
                  Se abrirá WhatsApp con tu pedido listo para enviar
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
