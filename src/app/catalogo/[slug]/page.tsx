import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartDetail from "@/components/AddToCartDetail";
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
    ? urlFor(product.image).width(900).height(900).url()
    : null;
  const gradient = product.gradient ?? "from-[#661028] to-[#3D0A17]";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F0E8D8]">

        {/* Back link */}
        <div className="mx-auto max-w-[1100px] px-6 pb-0 pt-28 lg:px-12">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 font-sans text-xs font-medium tracking-[0.2em] uppercase text-[#661028]/40 transition-colors hover:text-[#661028]"
          >
            <ArrowLeft className="h-3 w-3" />
            Catálogo
          </Link>
        </div>

        {/* Product layout: square image left, info right */}
        <div className="mx-auto max-w-[1100px] px-6 py-10 lg:px-12 lg:py-16">
          <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-16">

            {/* Square image */}
            <div
              className={`relative aspect-square w-full overflow-hidden rounded-3xl ${
                imageUrl ? "bg-[#1a0a12]" : `bg-gradient-to-br ${gradient}`
              }`}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-4 rounded-2xl border border-[#EEE4D0]/10" />
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              {product.tag && (
                <span className="mb-4 inline-block self-start rounded-full border border-[#661028]/20 px-3 py-1 font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#661028]/50">
                  {product.tag}
                </span>
              )}
              <h1 className="font-heading text-3xl font-bold leading-tight text-[#661028] [letter-spacing:-0.02em] md:text-4xl lg:text-5xl">
                {product.name}
              </h1>
              {product.category && (
                <p className="mt-2 font-sans text-xs font-light tracking-[0.2em] uppercase text-[#661028]/40">
                  {product.category}
                </p>
              )}
              {product.shortDescription && (
                <p className="mt-6 font-sans text-sm leading-relaxed text-[#661028]/65">
                  {product.shortDescription}
                </p>
              )}

              {/* Selector de tamaño + botón añadir al carrito */}
              <div className="mt-8">
                <AddToCartDetail
                  id={product._id}
                  slug={product.slug.current}
                  name={product.name}
                  category={product.category}
                  sizes={product.sizes}
                />
              </div>

              {/* Cotizar directamente (secundario) */}
              <p className="mt-4 text-center font-sans text-xs font-light text-[#661028]/35">
                ¿Necesitas algo especial?{" "}
                <a
                  href={`https://wa.me/56941564398?text=${encodeURIComponent(`Hola Anamoure, quiero consultar sobre: ${product.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 transition-colors hover:text-[#661028]/60"
                >
                  Escríbenos directamente
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Content adicional abajo */}
        <div className="mx-auto max-w-[1100px] px-6 pb-20 lg:px-12 lg:pb-28">

          {/* Divisor */}
          <div className="mb-12 h-px w-full bg-[#661028]/10" />

          {/* Descripción completa */}
          {product.longDescription && (
            <section className="mb-14">
              <h2 className="mb-6 font-sans text-xs font-medium tracking-[0.25em] uppercase text-[#661028]/40">
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
                <h2 className="mb-6 font-sans text-xs font-medium tracking-[0.25em] uppercase text-[#661028]/40">
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
                <h2 className="mb-6 font-sans text-xs font-medium tracking-[0.25em] uppercase text-[#661028]/40">
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

        </div>
      </main>
      <Footer />
    </>
  );
}
