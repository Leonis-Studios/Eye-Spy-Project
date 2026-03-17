export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Only one instance of this document should exist
  __experimental_actions: ["update", "publish"],
  fields: [
    { name: "siteName", title: "Site Name", type: "string" },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "phone", title: "Phone Number", type: "string" },
    { name: "email", title: "Email Address", type: "string" },
    { name: "address", title: "Address", type: "string" },
    { name: "serviceArea", title: "Service Area", type: "string" },
    {
      name: "hours",
      title: "Business Hours",
      type: "object",
      fields: [
        { name: "weekdays", title: "Weekdays", type: "string" },
        { name: "saturday", title: "Saturday", type: "string" },
        { name: "sunday", title: "Sunday", type: "string" },
      ],
    },
    {
      name: "stats",
      title: "Stats",
      type: "object",
      fields: [
        { name: "installs", title: "Installs", type: "string" },
        { name: "years", title: "Years", type: "string" },
        { name: "rating", title: "Rating", type: "string" },
        { name: "satisfaction", title: "Satisfaction", type: "string" },
      ],
    },
    {
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "facebook", title: "Facebook URL", type: "url" },
        { name: "instagram", title: "Instagram URL", type: "url" },
        { name: "google", title: "Google URL", type: "url" },
      ],
    },
  ],
};
