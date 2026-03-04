import { createClient } from "next-sanity";

// ─── REEMPLAZA ESTOS VALORES CON LOS DE TU PROYECTO EN sanity.io ────────────
// Encuéntralos en: https://www.sanity.io/manage → tu proyecto → Settings → API
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-03-01";
export const isCmsConfigured = projectId.length > 0;
// ─────────────────────────────────────────────────────────────────────────────

// Solo crea el cliente real si hay un projectId configurado
export const client = createClient({
  projectId: isCmsConfigured ? projectId : "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});
