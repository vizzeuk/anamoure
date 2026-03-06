import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const fraunces = localFont({
  src: [
    {
      path: "./fonts/Fraunces_72pt-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Fraunces_72pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

const siteUrl = "https://anamoure.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ANAMOURE — Pastelería & Banquetería de Autor",
    template: "%s | ANAMOURE",
  },
  description:
    "Pastelería artesanal, banquetería dulce y salada de autor en Chile. Pasteles de boda, bocados irresistibles y aperitivos sofisticados para eventos y celebraciones exclusivas.",
  keywords: [
    "pastelería de lujo Chile",
    "banquetería dulce",
    "banquetería salada",
    "pasteles de boda Chile",
    "repostería artesanal",
    "catering dulce eventos",
    "bocados dulces para eventos",
    "tortas personalizadas",
    "ANAMOURE",
    "pastelería de autor",
  ],
  authors: [{ name: "ANAMOURE" }],
  creator: "ANAMOURE",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteUrl,
    siteName: "ANAMOURE",
    title: "ANAMOURE — Pastelería & Banquetería de Autor",
    description:
      "Pastelería artesanal y banquetería de autor en Chile. Creaciones únicas para eventos, bodas y celebraciones exclusivas.",
    images: [
      {
        url: "/photos/pasteleria.webp",
        width: 1200,
        height: 630,
        alt: "ANAMOURE — Pastelería & Banquetería de Autor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANAMOURE — Pastelería & Banquetería de Autor",
    description:
      "Pastelería artesanal y banquetería de autor en Chile. Creaciones únicas para eventos y celebraciones.",
    images: ["/photos/pasteleria.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const recoleta = localFont({
  src: [
    {
      path: "./fonts/fonnts.com-recoleta-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-recoleta-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-recoleta-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-recoleta-semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-recoleta-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-recoleta-black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-recoleta",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "ANAMOURE",
    description:
      "Pastelería artesanal y banquetería de autor en Chile. Pasteles de boda, bocados dulces y aperitivos sofisticados para eventos exclusivos.",
    url: "https://anamoure.com",
    telephone: "+56941564398",
    priceRange: "$$",
    servesCuisine: ["Pastelería", "Banquetería Dulce", "Banquetería Salada"],
    areaServed: "Chile",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+56941564398",
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${recoleta.variable} ${fraunces.variable} antialiased`}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
