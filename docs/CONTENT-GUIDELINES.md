# Content Guidelines — EyeSpy Cabling

Editorial guidance for anyone writing content in Sanity Studio. For the technical schema/structured-data reference, see [`SEO-AEO-GEO.md`](./SEO-AEO-GEO.md).

---

## Titles and descriptions

Every page has an **Advanced SEO** panel (the `seo` object) with optional `Meta Title` and `Meta Description` overrides. Leave them blank unless you specifically want different wording than the page's own title/content — the site falls back to sensible values automatically.

If you do set them:
- **Meta Title**: under 60 characters. Longer titles get truncated in search results.
- **Meta Description**: under 160 characters, same reasoning.

## Answer-first writing (AEO)

When writing a section that answers a question — an FAQ, a "what is X" paragraph, a comparison — lead with a **40–60 word direct answer** before adding detail. Readers and AI answer engines both extract the first sentence or two; make it stand alone.

- Prefer **numbered lists** for step-by-step processes.
- Prefer **tables** for comparisons (pricing tiers, feature comparisons).
- Keep FAQ answers **self-contained** — someone reading only the answer, out of context, should still understand it.

See the AEO Checklist in `SEO-AEO-GEO.md` §6 for the full technical checklist this feeds into.

## Image alt text

Every image field that supports alt text has an **Image Description** field next to it in Studio — fill it in. Describe what's actually in the photo, not just a caption. Example: "Technician installing a dome camera under a covered porch" rather than "Camera install."

Skipping alt text isn't a hard error, but it makes the image invisible to screen readers and search engine image indexing.

## Blog authorship

Blog posts have an optional **Author** reference. Assign one when:
- A real team member wrote or is credited for the post.
- You want a byline to show on the post and in its structured data (`Article.author` becomes a `Person` instead of the business).

Leave it blank for posts written collectively or attributed to the business — the site falls back to attributing the post to EyeSpy Cabling automatically.

## Publish dates

New posts should set **Published Date** (the datetime field) — it drives the visible date, sitemap freshness, and `Article.datePublished`/`dateModified` in search results. The older **Publication Date** text field ("Month YYYY") still works as a fallback for posts written before this field existed, but new posts should use the datetime field.
