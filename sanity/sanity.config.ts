import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schema";

export default defineConfig({
  name: "eyespy-studio",
  title: "EyeSpy CMS",
  projectId: "m75fcnj1",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
