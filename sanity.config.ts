import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset, apiVersion } from "./src/sanity/client";

export default defineConfig({
  basePath: "/studio",
  name: "anamoure_studio",
  title: "ANAMOURE — Studio",
  projectId,
  dataset,
  apiVersion,
  plugins: [
    structureTool(),
    visionTool(), // Permite probar queries GROQ directamente
  ],
  schema: {
    types: schemaTypes,
  },
});
