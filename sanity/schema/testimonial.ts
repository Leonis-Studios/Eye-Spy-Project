export const testimonial = {
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    {
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (R: any) => R.required(),
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (R: any) => R.required(),
    },
    { name: "location", title: "Location", type: "string" },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
    },
  ],
  preview: {
    select: { title: "name", subtitle: "quote" },
  },
};
