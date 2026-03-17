export const serviceArea = {
  name: "serviceArea",
  title: "Service Areas",
  type: "document",
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
  ],
  preview: {
    select: { title: "name", subtitle: "region" },
  },
};
