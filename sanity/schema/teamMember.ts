export const teamMember = {
  name: "teamMember",
  title: "Team Members",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (R: any) => R.required(),
    },
    { name: "role", title: "Role", type: "string" },
    { name: "years", title: "Years Experience", type: "string" },
    { name: "bio", title: "Bio", type: "text" },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    },
    { name: "order", title: "Order", type: "number" },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
};
