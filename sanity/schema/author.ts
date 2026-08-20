export const author = {
  name: "author",
  title: "Authors",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (R: any) => R.required(),
    },
    { name: "role", title: "Role", type: "string" },
    { name: "bio", title: "Bio", type: "text", rows: 3 },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
};
