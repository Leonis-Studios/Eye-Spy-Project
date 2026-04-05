export const servicePage = {
  name: "servicePage",
  title: "Service Pages",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Service Title",
      type: "string",
      description: "The name of this service. Example: CCTV Installation",
      validation: (R: any) => R.required().error("Title is required"),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "This becomes the URL of the service page. Click Generate to auto-fill from the title.",
      options: { source: "title", maxLength: 96 },
      validation: (R: any) => R.required().error("Slug is required — click Generate"),
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "1–2 sentences shown on service cards and the listing page.",
    },
    {
      name: "longDescription",
      title: "Full Description",
      type: "array",
      description: "Rich text content shown on the service detail page.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal (Paragraph)", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Sub-Heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet List", value: "bullet" },
            { title: "Numbered List", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
      ],
    },
    {
      name: "icon",
      title: "Icon",
      type: "string",
      description: "An emoji or short icon identifier shown on cards. Example: 📷",
    },
    {
      name: "images",
      title: "Gallery Images",
      type: "array",
      description: "Photos shown in the image gallery on the detail page.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Image Description",
              type: "string",
              description: "Describe the image for accessibility and SEO.",
            },
          ],
        },
      ],
    },
    {
      name: "features",
      title: "Features / Key Points",
      type: "array",
      description: "Bullet points highlighting the key features of this service.",
      of: [{ type: "string" }],
    },
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "SEO title shown in browser tabs and search results. Defaults to the service title if left blank.",
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "string",
      description: "SEO description shown in search results. Defaults to the short description if left blank.",
    },
    {
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Controls display order in grids and dropdowns. Lower = first.",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "order",
    },
  },
};
