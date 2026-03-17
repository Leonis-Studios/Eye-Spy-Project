export const faqItem = {
  name: "faqItem",
  title: "FAQ Items",
  type: "document",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
      validation: (R: any) => R.required(),
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
      validation: (R: any) => R.required(),
    },
    { name: "order", title: "Order", type: "number" },
  ],
  preview: {
    select: { title: "question" },
  },
};
