export const service = {
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    {
      name: "label",
      title: "Service Label",
      type: "string",
      description: "The display name shown in the dropdown. Example: CCTV & Camera Systems",
      validation: (R: any) => R.required().error("Service label is required"),
    },
    {
      name: "value",
      title: "Service Value",
      type: "string",
      description: "The form submission value. Use lowercase with no spaces. Example: cameras",
      validation: (R: any) => R.required().error("Service value is required"),
    },
    {
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Controls the order services appear in the dropdown. Lower numbers appear first.",
    },
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "value",
    },
  },
};
