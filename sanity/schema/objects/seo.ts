export const seo = {
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Meta Title",
      type: "string",
      description: "SEO title shown in browser tabs and search results. Defaults to the page title if left blank.",
      validation: (R: any) => R.max(60).warning("Titles over 60 characters may be truncated in search results."),
    },
    {
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "SEO description shown in search results. Defaults to the page description if left blank.",
      validation: (R: any) => R.max(160).warning("Descriptions over 160 characters may be truncated in search results."),
    },
    {
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      options: { hotspot: true },
      description: "Image shown when this page is shared on social media. Recommended size: 1200x630. Defaults to a page-specific fallback if left blank.",
    },
    {
      name: "canonical",
      title: "Canonical URL",
      type: "url",
      description: "Override the canonical URL for this page. Leave blank unless this content is duplicated elsewhere and you need to point search engines to the preferred version.",
      validation: (R: any) => R.uri({ scheme: ["http", "https"] }),
    },
    {
      name: "noindex",
      title: "Hide From Search Engines",
      type: "boolean",
      description: "Turn on to prevent this page from appearing in search results. Leave off for normal pages.",
      initialValue: false,
    },
  ],
};
