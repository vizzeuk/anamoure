import { groq } from "next-sanity";

// Todos los productos (para el catálogo)
export const allProductsQuery = groq`
  *[_type == "product"] | order(_createdAt asc) {
    _id,
    name,
    slug,
    category,
    tag,
    featured,
    shortDescription,
    image,
    "gradient": select(
      category == "Pastelería"       => "from-[#661028] to-[#3D0A17]",
      category == "Banquetería Dulce"  => "from-[#4A0B1A] to-[#661028]",
      category == "Banquetería Salada" => "from-[#2D061A] to-[#4A0B1A]",
      "from-[#661028] to-[#3D0A17]"
    )
  }
`;

// Productos destacados (para Bestsellers)
export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(_createdAt asc) {
    _id,
    name,
    slug,
    category,
    tag,
    featured,
    shortDescription,
    image,
    "gradient": select(
      category == "Pastelería"       => "from-[#661028] to-[#3D0A17]",
      category == "Banquetería Dulce"  => "from-[#4A0B1A] to-[#661028]",
      category == "Banquetería Salada" => "from-[#2D061A] to-[#4A0B1A]",
      "from-[#661028] to-[#3D0A17]"
    )
  }
`;

// Un producto por slug (para la página de detalle)
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    category,
    tag,
    featured,
    shortDescription,
    longDescription,
    image,
    flavors,
    sizes,
    allergens,
    "gradient": select(
      category == "Pastelería"       => "from-[#661028] to-[#3D0A17]",
      category == "Banquetería Dulce"  => "from-[#4A0B1A] to-[#661028]",
      category == "Banquetería Salada" => "from-[#2D061A] to-[#4A0B1A]",
      "from-[#661028] to-[#3D0A17]"
    )
  }
`;

// Todos los slugs (para generateStaticParams)
export const allSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }
`;
