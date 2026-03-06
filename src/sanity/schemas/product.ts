import { defineField, defineType } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre del producto",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Pastelería", value: "Pastelería" },
          { title: "Banquetería Dulce", value: "Banquetería Dulce" },
          { title: "Banquetería Salada", value: "Banquetería Salada" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Etiqueta (ej: Bestseller, Temporada, Especial)",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Destacado (aparece en Amado por los Clientes)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "shortDescription",
      title: "Descripción corta (tarjeta de catálogo)",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "longDescription",
      title: "Descripción completa (página de detalle)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "flavors",
      title: "Sabores disponibles",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "sizes",
      title: "Tamaños / Formatos",
      type: "array",
      of: [
        {
          type: "object",
          name: "size",
          fields: [
            defineField({ name: "name", title: "Nombre (ej: Caja de 6, Docena)", type: "string" }),
            defineField({
              name: "price",
              title: "Precio (solo el número, ej: 12000)",
              type: "number",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
          },
        },
      ],
    }),
    defineField({
      name: "allergens",
      title: "Alérgenos",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Gluten", "Lácteos", "Huevos", "Frutos secos", "Soya", "Maní",
        ],
        layout: "grid",
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
});
