import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { MessageCircle, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client, isCmsConfigured } from "@/sanity/client";
import { productBySlugQuery, allSlugsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Product } from "@/sanity/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (!isCmsConfigured) return [];
  const data = await client.fetch<{ slug: string }[]>(allSlugsQuery);
  return data.map((d: { slug: string }) => ({ slug: d.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  if (!isCmsConfigured) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#F0E8D8] px-6">
          <p className="font-heading text-3xl text-[#661028]">CMS no configurado</p>
          <p className="mt-2 font-sans text-sm text-[#661028]/50">
            Configura tu proyecto Sanity para ver los productos.
          </p>
          <Link
            href="/catalogo"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#661028] px-6 py-3 font-sans text-xs tracking-widest uppercase text-[#EEE4D0]"
          >
            <ArrowLeft className="h-3 w-3" />
            Volver al catálogo
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const product = await client.fetch<Product | null>(productBySlugQuery, { slug });
  if (!product) notFound();

  const imageUrl = product.image
    ? urlFor(product.image).width(1200).height(900).url()
    : null;
  const gradient = product.gradient ?? "from-[#661028] to-[#3D0A17]";
  const whatsappMsg = encodeURIComponent(
    `Hola ANAMOURE, quiero cotizar: ${product.name}`
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F0E8D8]">

        {/* Hero */}
        <div
          className={`relative min-h-[65vh] overflow-hidden ${
            imageUrl ? "bg-[#1a0a12]" : `bg-gradient-to-br ${gradient}`
          }`}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover opacity-60"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="relative z-10 flex h-full min-h-[65vh] flex-col justify-end px-6 pb-16 pt-40 lg:px-12 lg:pb-24">
            <div className="mx-auto w-full max-w-[900px]">
              <Link
                href="/catalogo"
                className="mb-8 inline-flex items-center gap-2 font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-[#EEE4D0]/50 transition-colors hover:text-[#EEE4D0]"
              >
                <ArrowLeft className="h-3 w-3" />
                Catálogo
              </Link>

              {product.tag && (
                <span className="mb-4 inline-block rounded-full border border-[#EEE4D0]/25 px-3 py-1 font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-[#EEE4D0]/70">
                  {product.tag}
                </span>
              )}
              <h1 className="font-heading text-4xl font-bold leading-tight text-[#EEE4D0] [letter-spacing:-0.02em] md:text-6xl lg:text-7xl">
                {product.name}
              </h1>
              <p className="mt-1 font-sans text-xs font-light tracking-[0.2em] uppercase text-[#EEE4D0]/50">
                {product.category}
              </p>
              {product.shortDescription && (
                <p className="mt-5 max-w-xl font-sans text-sm font-light leading-relaxed text-[#EEE4D0]/70">
                  {product.shortDescription}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-[900px] px-6 py-16 lg:px-12 lg:py-24">

          {/* Descripción completa */}
          {product.longDescription && (
            <section className="mb-16">
              <h2 className="mb-6 font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-[#661028]/40">
                Descripción
              </h2>
              <div className="prose prose-sm max-w-none font-sans text-[#661028]/80 [&>p]:mb-4 [&>p]:leading-relaxed">
                <PortableText value={product.longDescription ?? []} />
              </div>
            </section>
          )}

          <div className="grid gap-12 md:grid-cols-2">
            {/* Sabores */}
            {product.flavors && product.flavors.length > 0 && (
              <section>
                <h2 className="mb-6 font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-[#661028]/40">
                  Sabores disponibles
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((flavor: string) => (
                    <span
                      key={flavor}
                      className="rounded-full border border-[#661028]/20 px-4 py-2 font-sans text-xs font-medium text-[#661028]/70"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Alérgenos */}
            {product.allergens && product.allergens.length > 0 && (
              <section>
                <h2 className="mb-6 font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-[#661028]/40">
                  Alérgenos
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.allergens.map((a: string) => (
                    <span
                      key={a}
                      className="rounded-full bg-[#661028]/8 px-4 py-2 font-sans text-xs font-medium text-[#661028]/70"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Tamaños */}
          {product.sizes && product.sizes.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-[#661028]/40">
                Tamaños y precios
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {product.sizes.map((size: import("@/sanity/types").ProductSize) => (
                  <div
                    key={size.name}
                    className="flex flex-col gap-1 rounded-2xl border border-[#661028]/10 bg-white/50 px-5 py-4"
                  >
                    <span className="font-heading text-base font-bold text-[#661028]">
                      {size.name}
                    </span>
                    {size.servings && (
                      <span className="font-sans text-[10px] font-light tracking-wide text-[#661028]/40">
                        {size.servings}
                      </span>
                    )}
                    {size.price > 0 && (
                      <span className="mt-2 font-sans text-sm font-medium text-[#661028]">
                        ${size.price.toLocaleString("es-CL")}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA WhatsApp */}
          <div className="mt-20 flex flex-col items-center gap-4 text-center">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-[#661028]/40">
              ¿Te interesa?
            </p>
            <a
              href={`https://wa.me/TUNUMERO?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full bg-[#661028] px-8 py-4 font-sans text-xs font-medium tracking-[0.2em] uppercase text-[#EEE4D0] transition-all hover:scale-[1.02] hover:bg-[#4A0B1A]"
            >
              <MessageCircle className="h-4 w-4" />
              Cotizar por WhatsApp
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
