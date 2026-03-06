import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Bestsellers from "@/components/Bestsellers";
import Experience from "@/components/Experience";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";
import { client, isCmsConfigured } from "@/sanity/client";
import { featuredProductsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import type { ProductSummary } from "@/sanity/types";

export default async function Home() {
  let featuredProducts: (ProductSummary & { imageUrl: string | null })[] = [];

  if (isCmsConfigured) {
    const raw = await client.fetch<ProductSummary[]>(featuredProductsQuery);
    featuredProducts = raw.map((p) => ({
      ...p,
      imageUrl: p.image ? urlFor(p.image).width(600).height(600).url() : null,
    }));
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Bestsellers products={featuredProducts} />
      <CTAFinal />
      <Experience />
      <Footer />
    </>
  );
}
