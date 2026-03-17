export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fieldsets: [
    { name: "contact", title: "📞 Contact Information" },
    { name: "hours", title: "🕐 Business Hours" },
    { name: "stats", title: "📊 Business Stats" },
    { name: "social", title: "📱 Social Media Links" },
  ],
  fields: [
    {
      name: "siteName",
      title: "Business Name",
      type: "string",
      description: "Your business name as it appears across the site.",
      validation: (R: any) => R.required().error("Business name is required"),
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
      description:
        "Short punchy line that appears under your logo and in the hero section.",
    },
    {
      name: "description",
      title: "Business Description",
      type: "text",
      rows: 3,
      description:
        "1-2 sentence description of your business. Used in SEO and the footer.",
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
      fieldset: "contact",
      description:
        "Include area code. This appears in the navbar, footer, and all landing pages.",
      validation: (R: any) => R.required().error("Phone number is required"),
    },
    {
      name: "email",
      title: "Email Address",
      type: "string",
      fieldset: "contact",
      description:
        "Your business contact email. Appears in the footer and contact page.",
      validation: (R: any) => R.required().error("Email address is required"),
    },
    {
      name: "address",
      title: "Business Address",
      type: "string",
      fieldset: "contact",
      description: "Your full address including city, state, and zip code.",
    },
    {
      name: "serviceArea",
      title: "Service Area Description",
      type: "string",
      fieldset: "contact",
      description: "Example: Serving the greater New York area within 50 miles",
    },
    {
      name: "hours",
      title: "Business Hours",
      type: "object",
      fieldset: "hours",
      description:
        "Your business hours as they appear in the footer and contact page.",
      fields: [
        {
          name: "weekdays",
          title: "Monday – Friday",
          type: "string",
          description: "Example: Mon – Fri: 8am – 6pm",
        },
        {
          name: "saturday",
          title: "Saturday",
          type: "string",
          description: "Example: Sat: 9am – 4pm",
        },
        {
          name: "sunday",
          title: "Sunday",
          type: "string",
          description: "Example: Sun: Closed",
        },
      ],
    },
    {
      name: "stats",
      title: "Business Stats",
      type: "object",
      fieldset: "stats",
      description:
        "The numbers that appear in the hero and trust bar sections. Keep these current.",
      fields: [
        {
          name: "installs",
          title: "Systems Installed",
          type: "string",
          description: "Example: 2,400+",
        },
        {
          name: "years",
          title: "Years in Business",
          type: "string",
          description: "Example: 15+",
        },
        {
          name: "rating",
          title: "Star Rating",
          type: "string",
          description: "Example: 4.9★",
        },
        {
          name: "satisfaction",
          title: "Satisfaction Rate",
          type: "string",
          description: "Example: 98%",
        },
      ],
    },
    {
      name: "social",
      title: "Social Media",
      type: "object",
      fieldset: "social",
      description:
        "Full URLs to your social media profiles. Leave blank if you don't have an account.",
      fields: [
        {
          name: "facebook",
          title: "Facebook URL",
          type: "url",
          description: "Example: https://facebook.com/eyespysurveillance",
        },
        {
          name: "instagram",
          title: "Instagram URL",
          type: "url",
          description: "Example: https://instagram.com/eyespysurveillance",
        },
        {
          name: "google",
          title: "Google Business URL",
          type: "url",
          description: "Your Google Business profile link",
        },
      ],
    },
  ],
};
