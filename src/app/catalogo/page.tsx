export const revalidate = 60;

import { Suspense } from "react";
import { client, isCmsConfigured } from "@/sanity/client";
import { allProductsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import type { ProductSummary } from "@/sanity/types";
import CatalogoInner from "./CatalogoInner";

const mockProducts: ProductSummary[] = [
  { _id: "1", name: "Tarta de Frutos Rojos", category: "Pastelería", slug: { current: "tarta-frutos-rojos" }, tag: "Temporada", shortDescription: "Base de masa sablée, crema de almendra y coulis de frambuesa.", gradient: "from-[#661028] to-[#3D0A17]" },
  { _id: "2", name: "Pastel Naked Cake", category: "Pastelería", slug: { current: "naked-cake" }, tag: "Bodas", shortDescription: "Tres capas de bizcocho de vainilla, buttercream de flor de azahar.", gradient: "from-[#4A0B1A] to-[#661028]" },
  { _id: "3", name: "Cheesecake de Matcha", category: "Pastelería", slug: { current: "cheesecake-matcha" }, tag: "Especial", shortDescription: "Base de galleta de jengibre, relleno cremoso con matcha ceremonial.", gradient: "from-[#2D061A] to-[#4A0B1A]" },
  { _id: "4", name: "Tarta de Chocolate", category: "Pastelería", slug: { current: "tarta-chocolate" }, tag: "Favorito", shortDescription: "Ganache de chocolate 72%, base crujiente de avellana y flor de sal.", gradient: "from-[#661028] to-[#2D061A]" },
  { _id: "5", name: "Rollitos de Canela", category: "Banquetería Dulce", slug: { current: "rollitos-canela" }, tag: "Bestseller", shortDescription: "Suaves, esponjosos y bañados en frosting de vainilla.", gradient: "from-[#4A0B1A] to-[#661028]" },
  { _id: "6", name: "Crumble Cookies", category: "Banquetería Dulce", slug: { current: "crumble-cookies" }, tag: "Bestseller", shortDescription: "Crujientes por fuera, fondantes por dentro. Con chips de chocolate premium.", gradient: "from-[#661028] to-[#3D0A17]" },
  { _id: "7", name: "Alfajores", category: "Banquetería Dulce", slug: { current: "alfajores" }, tag: "Tradición", shortDescription: "Masa de maíz delicada, dulce de leche artesanal y coco rallado.", gradient: "from-[#3D0A17] to-[#4A0B1A]" },
  { _id: "8", name: "Brownie Fudgy", category: "Banquetería Dulce", slug: { current: "brownie-fudgy" }, tag: "Clásico", shortDescription: "Chocolate negro intenso, nuez tostada y centro húmedo irresistible.", gradient: "from-[#2D061A] to-[#661028]" },
  { _id: "9", name: "Macarons de Temporada", category: "Banquetería Dulce", slug: { current: "macarons-temporada" }, tag: "Edición Limitada", shortDescription: "Cáscaras de almendra con ganaches de sabores exclusivos de la estación.", gradient: "from-[#661028] to-[#4A0B1A]" },
  { _id: "10", name: "Profiteroles de Queso", category: "Banquetería Salada", slug: { current: "profiteroles-queso" }, tag: "Aperitivo", shortDescription: "Choux crujiente relleno de queso brie, miel de trufa y nuez garapiñada.", gradient: "from-[#4A0B1A] to-[#2D061A]" },
  { _id: "11", name: "Crostini de Higo", category: "Banquetería Salada", slug: { current: "crostini-higo" }, tag: "Premium", shortDescription: "Pan artesanal tostado, prosciutto di Parma, higo fresco y reducción de balsamico.", gradient: "from-[#661028] to-[#3D0A17]" },
  { _id: "12", name: "Blinis de Salmón", category: "Banquetería Salada", slug: { current: "blinis-salmon" }, tag: "Gourmet", shortDescription: "Mini blinis esponjosos, crème fraîche al eneldo y salmón ahumado artesanal.", gradient: "from-[#3D0A17] to-[#661028]" },
];

async function getProducts(): Promise<ProductSummary[]> {
  if (!isCmsConfigured) return mockProducts;
  try {
    const data = await client.fetch<ProductSummary[]>(allProductsQuery);
    return data ?? mockProducts;
  } catch {
    return mockProducts;
  }
}

export default async function CatalogoPage() {
  const products = await getProducts();

  const productsWithImages = products.map((p) => ({
    ...p,
    imageUrl: p.image ? urlFor(p.image).width(600).height(600).url() : null,
  }));

  return (
    <Suspense fallback={null}>
      <CatalogoInner products={productsWithImages} />
    </Suspense>
  );
}
