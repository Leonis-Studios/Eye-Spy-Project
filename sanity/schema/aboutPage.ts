export const aboutPage = {
  name: "aboutPage",
  title: "About Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fieldsets: [
    { name: "hero", title: "🏠 Hero Section" },
    { name: "story", title: "📖 Our Story Section" },
    { name: "values", title: "💡 Core Values Section" },
    { name: "cta", title: "📣 CTA Section" },
    { name: "seo", title: "🔍 SEO" },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────
    {
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      fieldset: "hero",
      description: 'Small label above the heading. Example: "Our Story"',
    },
    {
      name: "heroHeadingLine1",
      title: "Hero Heading — Line 1",
      type: "string",
      fieldset: "hero",
      description: 'First line of the main heading. Example: "Security Done Right,"',
    },
    {
      name: "heroHeadingLine2",
      title: "Hero Heading — Line 2 (gradient)",
      type: "string",
      fieldset: "hero",
      description: 'Second line shown in gradient. Example: "By People You Can Trust."',
    },
    {
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      fieldset: "hero",
      description: "Short paragraph below the heading.",
    },

    // ── Story ─────────────────────────────────────────────────────────────────
    {
      name: "storyEyebrow",
      title: "Story Eyebrow",
      type: "string",
      fieldset: "story",
      description: 'Small label above the heading. Example: "How We Started"',
    },
    {
      name: "storyHeading",
      title: "Story Heading",
      type: "string",
      fieldset: "story",
      description: 'Main heading for the story section. Example: "15 Years of Protecting What Matters Most"',
    },
    {
      name: "storyParagraphs",
      title: "Story Paragraphs",
      type: "array",
      fieldset: "story",
      description: "Each item is one paragraph of the story text.",
      of: [{ type: "text" }],
    },

    // ── Values ────────────────────────────────────────────────────────────────
    {
      name: "valuesEyebrow",
      title: "Values Eyebrow",
      type: "string",
      fieldset: "values",
      description: 'Small label above the heading. Example: "What Drives Us"',
    },
    {
      name: "valuesHeading",
      title: "Values Heading",
      type: "string",
      fieldset: "values",
      description: 'Main heading. Example: "Our Core Values"',
    },
    {
      name: "values",
      title: "Value Items",
      type: "array",
      fieldset: "values",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "iconName",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Shield Check", value: "shieldCheck" },
                  { title: "Award", value: "award" },
                  { title: "Clock", value: "clock" },
                  { title: "Heart", value: "heart" },
                  { title: "Star", value: "star" },
                  { title: "Users", value: "users" },
                  { title: "Handshake", value: "handshake" },
                  { title: "Wrench", value: "wrench" },
                  { title: "Eye", value: "eye" },
                  { title: "Lock", value: "lock" },
                ],
                layout: "dropdown",
              },
            },
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (R: any) => R.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            },
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    },

    // ── CTA ───────────────────────────────────────────────────────────────────
    {
      name: "ctaEyebrow",
      title: "CTA Eyebrow",
      type: "string",
      fieldset: "cta",
      description: 'Small label. Example: "Ready to Get Started?"',
    },
    {
      name: "ctaHeading",
      title: "CTA Heading",
      type: "string",
      fieldset: "cta",
      description: 'Main CTA heading. Example: "Let\'s Protect Your Property"',
    },
    {
      name: "ctaBody",
      title: "CTA Body Text",
      type: "text",
      rows: 2,
      fieldset: "cta",
    },
    {
      name: "ctaButtonLabel",
      title: "CTA Button Label",
      type: "string",
      fieldset: "cta",
      description: 'Example: "Get a Free Estimate"',
    },

    // ── SEO ───────────────────────────────────────────────────────────────────
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      fieldset: "seo",
      description: "SEO title shown in browser tabs and search results.",
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "string",
      fieldset: "seo",
      description: "SEO description shown in search results.",
    },
    {
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      fieldset: "seo",
      options: { hotspot: true },
      description: "Image shown when this page is shared on social media. Recommended size: 1200x630.",
    },
    {
      name: "seo",
      title: "Advanced SEO",
      type: "seo",
      fieldset: "seo",
      description: "Advanced SEO overrides (canonical URL, hide from search). Meta Title/Description/Image above are used unless set here.",
    },
  ],

  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
};
