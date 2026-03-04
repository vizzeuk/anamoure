export interface SanityImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
}

export interface ProductSize {
  name: string;
  servings?: string;
  price: number;
}

export interface Product {
  _id: string;
  _type: "product";
  name: string;
  slug: {
    current: string;
  };
  category: "Pastelería" | "Banquetería Dulce" | "Banquetería Salada";
  tag?: string;
  featured?: boolean;
  image?: SanityImageAsset;
  shortDescription?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  longDescription?: any[] | null; // Portable Text blocks
  flavors?: string[];
  sizes?: ProductSize[];
  allergens?: string[];
  gradient?: string; // computed by GROQ query
}

export interface ProductSummary {
  _id: string;
  name: string;
  slug: { current: string };
  category: string;
  tag?: string;
  featured?: boolean;
  image?: SanityImageAsset;
  shortDescription?: string;
  gradient?: string;
}
