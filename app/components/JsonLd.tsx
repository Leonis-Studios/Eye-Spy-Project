import type { Thing, WithContext } from "schema-dts";

// Server component — do NOT add "use client".
// All JSON-LD injection must happen in server components (page.tsx / layout.tsx).
interface JsonLdProps {
  schema: WithContext<Thing> | Record<string, unknown>;
}

export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
