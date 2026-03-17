export const blogPost = {
  name: "blogPost",
  title: "Blog Posts",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (R: any) => R.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R: any) => R.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (R: any) => R.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Buyer's Guide", value: "Buyer's Guide" },
          { title: "Security Tips", value: "Security Tips" },
          { title: "Commercial", value: "Commercial" },
        ],
      },
    },
    { name: "readTime", title: "Read Time", type: "string" },
    { name: "date", title: "Date", type: "string" },
    { name: "featured", title: "Featured", type: "boolean" },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt Text", type: "string" }],
        },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
};
