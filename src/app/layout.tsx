import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "ANAMOURE — Repostería & Coctelería de Autor",
  description:
    "Creaciones de alta repostería y coctelería de autor para momentos extraordinarios. Lujo artesanal para eventos, bodas y celebraciones exclusivas.",
  keywords: [
    "repostería de lujo",
    "coctelería de autor",
    "pasteles de boda",
    "eventos exclusivos",
    "ANAMOURE",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${recoleta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
