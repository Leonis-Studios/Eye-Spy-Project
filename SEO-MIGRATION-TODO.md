# SEO migration — resume prompt

Once Sanity Editor access is granted (project `m75fcnj1`, dataset `production`) or a write-scoped `SANITY_API_TOKEN` is added to `.env.local`, paste this into Claude Code to finish the work:

---

Resume the SEO/AEO/GEO work on this repo. Prior session finished everything except the Sanity data migration + frontend field rename, blocked on write permissions (now resolved). Plan file: `C:\Users\shira\.claude\plans\you-are-implementing-optimizing-seo-composed-haven.md`.

Already done (do not redo): shared `seo` object schema at `sanity/schema/objects/seo.ts`, added additively to all 8 publicly-routable doc types (`aboutPage`, `contactPage`, `homePage`, `pricingPage`, `serviceArea`, `serviceLandingPage`, `servicePage`, `blogPost`) alongside their old `metaTitle`/`metaDescription`/`ogImage` fields (blogPost only had `ogImage`). `author` doc type + `blogPost.author`/`publishedAt` fields. `schema-dts` installed. Accordion consolidation, breadcrumb helper, robots.ts, sitemap.ts, llms.txt route, docs — all done and verified (build/lint/type-check clean).

Remaining steps:

1. **Migrate existing content** — query `*[_type in ["aboutPage","contactPage","homePage","pricingPage","serviceArea","serviceLandingPage","servicePage","blogPost"]]{_id, _type, metaTitle, metaDescription, ogImage, seo}` via the Sanity MCP tools (`mcp__Sanity__query_documents`), then for every doc with a non-null `metaTitle`/`metaDescription`/`ogImage`, patch (`mcp__Sanity__patch_documents`) `seo.title`/`seo.description`/`seo.ogImage` from those values (`blogPost` → `seo.ogImage` only). Publish the resulting drafts (`mcp__Sanity__publish_documents`).
2. **Verify** — re-run the query; every doc that had a `metaTitle`/`metaDescription`/`ogImage` value must now have the matching `seo.*` value. Zero discrepancies before continuing.
3. **Remove old fields** — delete `metaTitle`, `metaDescription`, `ogImage` from all 8 schema files (`sanity/schema/*.ts`).
4. **Frontend swap** (`app/lib/types.ts`, `app/lib/queries.ts`, `app/lib/seo.ts`, and every `generateMetadata()` in `app/(main)/page.tsx`, `about/page.tsx`, `contact/page.tsx`, `pricing/page.tsx`, `services/[slug]/page.tsx`, `blog/[slug]/page.tsx`, `lp/[area]/page.tsx`) — replace `metaTitle`/`metaDescription`/`ogImage` reads with `seo.title`/`seo.description`/`seo.ogImage`; add `canonical`/`noindex` params to `buildMetadata()` and wire `seo.canonical`/`seo.noindex` through. Full details in the plan file's Phase 2.
5. Re-run `npm run type-check`, `npm run lint`, `npm run build`; spot-check `/sitemap.xml` (noindex filtering now live) and a page's rendered `<title>`/meta tags.
