"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// Deshabilitar el layout de la app para que el Studio use su propio layout
export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
