export const pricingPage = {
  name: "pricingPage",
  title: "Pricing Page",
  type: "document",
  // Singleton — prevent creating more than one document of this type
  __experimental_actions: ["update", "publish"],

  fields: [
    // ── Page header ───────────────────────────────────────────────────────────
    {
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: 'Displayed as the main heading. Example: "Transparent Pricing"',
      validation: (R: any) => R.required().error("Page title is required"),
    },
    {
      name: "pageSubtitle",
      title: "Page Subtitle",
      type: "string",
      description: 'Shown below the title. Example: "No surprises. No hidden fees."',
    },
    {
      name: "introText",
      title: "Intro Text",
      type: "text",
      rows: 3,
      description:
        "Short paragraph shown between the subtitle and the pricing cards.",
    },

    // ── Pricing cards ─────────────────────────────────────────────────────────
    {
      name: "pricingCards",
      title: "Pricing Cards",
      type: "array",
      description: "One card per service tier. Drag to reorder.",
      of: [
        {
          type: "object",
          name: "pricingCard",
          title: "Pricing Card",
          fields: [
            {
              name: "service",
              title: "Service",
              type: "reference",
              to: [{ type: "servicePage" }],
              description:
                "Links this card to a service page — pulls in the title, slug, and icon automatically.",
              validation: (R: any) =>
                R.required().error("A service must be selected"),
            },
            {
              name: "priceLabel",
              title: "Price Label",
              type: "string",
              description:
                'Displayed prominently on the card. Example: "Starting at $499" or "From $89/mo"',
              validation: (R: any) =>
                R.required().error("Price label is required"),
            },
            {
              name: "priceNote",
              title: "Price Note",
              type: "string",
              description:
                'Small clarifying text below the price. Example: "Based on a 4-camera system"',
            },
            {
              name: "highlights",
              title: "Highlights",
              type: "array",
              description:
                "Bullet points shown on the card. Keep to 4–6 items for best layout.",
              of: [{ type: "string" }],
            },
            {
              name: "ctaLabel",
              title: "CTA Button Label",
              type: "string",
              description:
                'Text on the call-to-action button. Example: "Get a Quote" or "Book a Consult"',
              initialValue: "Get a Quote",
            },
            {
              name: "featured",
              title: "Featured (Most Popular)",
              type: "boolean",
              description:
                'Mark this card as the recommended option. Adds an accent border and a "Most Popular" badge.',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: "service.title",
              subtitle: "priceLabel",
              featured: "featured",
            },
            prepare({ title, subtitle, featured }: any) {
              return {
                title: `${featured ? "★ " : ""}${title ?? "Untitled Card"}`,
                subtitle: subtitle ?? "No price set",
              };
            },
          },
        },
      ],
    },

    // ── Bottom CTA ────────────────────────────────────────────────────────────
    {
      name: "bottomCtaHeading",
      title: "Bottom CTA Heading",
      type: "string",
      description:
        'Heading for the final call-to-action section. Example: "Not sure which plan fits?"',
    },
    {
      name: "bottomCtaText",
      title: "Bottom CTA Body Text",
      type: "text",
      rows: 2,
      description: "Supporting paragraph shown below the CTA heading.",
    },

    // ── FAQ section ───────────────────────────────────────────────────────────
    {
      name: "faqTitle",
      title: "FAQ Section Title",
      type: "string",
      description:
        'Optional title for the FAQ section. Defaults to "Pricing FAQs" if left blank.',
    },
    {
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      description:
        "Pricing-specific FAQs. These are separate from the global FAQ documents.",
      of: [
        {
          type: "object",
          name: "pricingFaq",
          title: "FAQ Item",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
              validation: (R: any) =>
                R.required().error("Question is required"),
            },
            {
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (R: any) => R.required().error("Answer is required"),
            },
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    },
  ],

  preview: {
    prepare() {
      return { title: "Pricing Page" };
    },
  },
};
