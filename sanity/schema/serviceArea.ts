export const serviceArea = {
  name: "serviceArea",
  title: "Service Areas",
  type: "document",
  groups: [{ name: "seo", title: "SEO" }],
  fields: [
    {
      name: "name",
      title: "Area Name",
      type: "string",
      validation: (R: any) => R.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    },
    { name: "region", title: "Region", type: "string" },
    { name: "description", title: "Description", type: "text" },
    {
      name: "nearbyAreas",
      title: "Nearby Areas",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "includesList",
      title: "Includes List",
      type: "array",
      description: "Checklist bullets shown in the hero section. Leave blank to use the site default.",
      of: [{ type: "string" }],
    },
    {
      name: "formPhotos",
      title: "Photos Above Form (Bottom Section)",
      type: "array",
      description:
        "Optional photos shown in a carousel above the estimate form near the bottom of the page. Leave empty to hide this section.",
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
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      group: "seo",
      description: "SEO title shown in browser tabs and search results. Defaults to the area name if left blank.",
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "string",
      group: "seo",
      description: "SEO description shown in search results. Defaults to the description above if left blank.",
    },
    {
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      description: "Image shown when this page is shared on social media. Recommended size: 1200x630.",
    },
    {
      name: "seo",
      title: "Advanced SEO",
      type: "seo",
      group: "seo",
      description: "Advanced SEO overrides (canonical URL, hide from search). Meta Title/Description/Image above are used unless set here.",
    },
  ],
  preview: {
    select: { title: "name", subtitle: "region" },
  },
};
