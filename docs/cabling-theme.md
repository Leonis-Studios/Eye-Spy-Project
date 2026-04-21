# Cabling Visual Theme — Design Reference

This document defines the visual language for the "voice and data cabling" aesthetic used across EyeSpy Cabling's website. Reference this before adding cabling-themed styling to any new section.

---

## Core Metaphor

> UI sections = server rooms. Cards = patch panel ports. Connections = structured cable runs.

Every decorative element should reinforce the idea that the website itself is wired infrastructure:

- Cards are **termination points** (wall ports, patch panel jacks)
- Connecting lines are **cable runs** (routed along trays, not floating in space)
- Step numbers / labels are **port identifiers** (P-touch labels, port numbering)
- Animation sequence mirrors real-world installation: **cables are run before hardware is racked**

---

## Color Palette — Cabling-Specific Opacities

All cable visuals use the site's brand accent color (`#EF6B4D`) at controlled opacities. Never use a different color for cable elements.

| Element                 | Color     | Opacity | Usage                               |
| ----------------------- | --------- | ------- | ----------------------------------- |
| Main cable line         | `#EF6B4D` | 25%     | Primary `stroke` on SVG cable paths |
| Glow / halo layer       | `#EF6B4D` | 7–8%    | Wider stroke behind main line       |
| Port connector dot      | `#EF6B4D` | 60%     | `fill` on junction/terminus circles |
| Port housing stroke     | `#EF6B4D` | 40%     | RJ45 jack outline rect              |
| Port contact pins       | `#EF6B4D` | 50%     | Inner lines on port symbol          |
| Cable label text        | `#EF6B4D` | 60%     | `PORT XX` pill text                 |
| Cable label border      | `#EF6B4D` | 25%     | Pill border                         |
| Cable label background  | `#EF6B4D` | 5%      | Pill fill                           |
| Card patch panel border | `#EF6B4D` | 20%     | Left border on stacked mobile cards |

In Tailwind: `border-brand-accent/25`, `bg-brand-accent/5`, `text-brand-accent/60`, etc.

---

## SVG Cable Line Specifications

These rules must be followed for all cable SVG paths to maintain visual consistency.

### Stroke Properties

```
stroke:          #EF6B4D
strokeOpacity:   0.25 (main), 0.07 (glow)
strokeWidth:     1.5 (main), 4 (glow)
strokeLinecap:   "square"   ← NEVER round or butt
strokeLinejoin:  "miter"
fill:            "none"     ← always
```

**Why square linecaps?** Round ends look organic and fluid. Square ends look manufactured and precise — exactly the right register for structured cabling. This is a non-negotiable rule.

### Path Routing Rules

- **Right-angle turns only** — all paths use `L` (lineto) commands exclusively. No `C`, `Q`, `A`, or `S` (no curves).
- Cable runs go: horizontal → vertical → horizontal (or vertical → horizontal → vertical). Never diagonal.
- Always layer two paths per cable run: glow halo (wide, low opacity) behind main line (narrow, higher opacity).

### Glow Halo Pattern

```tsx
// Always render in this order (glow first, line second):
<motion.path d={path} stroke="#EF6B4D" strokeOpacity="0.07" strokeWidth="4" fill="none" strokeLinecap="square" ... />
<motion.path d={path} stroke="#EF6B4D" strokeOpacity="0.25" strokeWidth="1.5" fill="none" strokeLinecap="square" ... />
```

---

## Animation Timing

The animation sequence must match the cabling metaphor: cables install before hardware appears.

| Phase                          | Duration | Delay                     |
| ------------------------------ | -------- | ------------------------- |
| Cable path draw (`pathLength`) | 0.7s     | `i * 0.15s` stagger       |
| Port connector dot pop-in      | 0.2s     | `i * 0.15 + 0.7s`         |
| Card / content fade-in         | 0.5s     | After all cables complete |

- Use `ease: "easeInOut"` for `pathLength` transitions
- `containerVariants.delayChildren` must account for cable draw time (typically 1.2–1.3s for 4 cables)
- For connection cables (e.g. How It Works), cards can start earlier (~0.5s) since it's one continuous path

### Reduced Motion

Always check `useReducedMotion()` from Framer Motion. When true, set cable `pathLength` duration to `0` so cables appear instantly at full opacity. Content should never be hidden when motion is reduced.

```tsx
const prefersReducedMotion = useReducedMotion();
// In cableVariants:
pathLength: { duration: prefersReducedMotion ? 0 : 0.7, ... }
```

---

## Component Vocabulary

### RJ45 Port Symbol

28×20px inline SVG. Represents a wall port or patch panel jack face-on. Place above step numbers or card headers.

```tsx
<svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
  <rect
    x="1"
    y="1"
    width="26"
    height="18"
    rx="1"
    stroke="#EF6B4D"
    strokeOpacity="0.4"
    strokeWidth="1"
  />
  {[4, 6.5, 9, 11.5, 14, 16.5, 19, 21.5].map((x, i) => (
    <line
      key={i}
      x1={x}
      y1="5"
      x2={x}
      y2="15"
      stroke="#EF6B4D"
      strokeOpacity="0.5"
      strokeWidth="0.8"
    />
  ))}
</svg>
```

### Cable Label Tag (P-touch aesthetic)

Monospaced pill styled to look like a cable identification label.

```tsx
<div className="inline-flex items-center gap-1 border border-brand-accent/25 bg-brand-accent/5 px-2 py-0.5 rounded-xs">
  <span className="text-brand-accent/60 font-mono text-[10px] tracking-widest uppercase">
    PORT 01
  </span>
</div>
```

### Junction / Terminus Dot

Small filled circle at cable connection points. Use at: cable endpoints (where cable meets card), intersections in routing paths.

```tsx
<motion.circle cx={x} cy={y} r="3" fill="#EF6B4D" fillOpacity="0.6" ... />
```

### Patch Panel Left Border (mobile)

On mobile stacked layouts (single column), the cable SVG is hidden. Use a left border on cards to maintain the patch panel aesthetic.

```
border-l-2 border-brand-accent/20 pl-3
```

Hide on desktop where SVG cables take over: `md:border-l-0 md:pl-0`

---

## Responsive Behavior

**Rule: all cable SVG overlays are `hidden md:block`.**

Cable path geometry is computed from card positions in a multi-column layout. In single-column (mobile) the math breaks and cables look wrong. Mobile users see only the content animations — which remain fully functional and accessible.

```tsx
<div
  className="hidden md:block absolute inset-0 pointer-events-none"
  aria-hidden="true"
>
  {/* Cable SVG here */}
</div>
```

---

## Accessibility

- All cable SVG elements: `aria-hidden="true"` — they are decorative
- No cable animation should affect keyboard navigation or focus order
- `pointer-events: none` on all SVG overlay containers
- Reduced motion: see Animation Timing section above
- Never gate content visibility behind cable animation completion

---

## Coordinate Measurement Pattern

Cable paths must be computed from actual DOM measurements, not hardcoded. Card positions shift with viewport width — hardcoded coordinates break between breakpoints.

```tsx
const sectionRef = useRef<HTMLElement>(null);
const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
const [cablePaths, setCablePaths] = useState<CablePath[]>([]);

useEffect(() => {
  if (!isInView || !sectionRef.current) return;
  const sectionRect = sectionRef.current.getBoundingClientRect();
  const paths = cardRefs.current.map((card, i) => {
    if (!card) return null;
    const rect = card.getBoundingClientRect();
    const relTop = rect.top - sectionRect.top;
    const relLeft = rect.left - sectionRect.left;
    const relRight = rect.right - sectionRect.left;
    const cardMidY = relTop + rect.height / 2;
    const isLeft = i % 2 === 0;
    const entryY = cardMidY - 20; // slight offset above center

    if (isLeft) {
      return {
        d: `M 0,${entryY} L ${relLeft - 20},${entryY} L ${relLeft - 20},${cardMidY} L ${relLeft},${cardMidY}`,
        termX: relLeft,
        termY: cardMidY,
      };
    } else {
      const W = sectionRect.width;
      return {
        d: `M ${W},${entryY} L ${relRight + 20},${entryY} L ${relRight + 20},${cardMidY} L ${relRight},${cardMidY}`,
        termX: relRight,
        termY: cardMidY,
      };
    }
  });
  setCablePaths(paths.filter(Boolean) as CablePath[]);
}, [isInView]);
```

- `useEffect` depends on `[isInView]` — runs once when scroll threshold is crossed
- `useInView` uses `{ once: true, amount: 0.2 }` — fires once, never re-runs
- SVG uses the section's natural pixel dimensions (no viewBox scaling)

---

## Framer Motion Variants Reference

```tsx
// Cable draw — use custom prop for per-cable stagger delay
const cableVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: prefersReducedMotion ? 0 : 0.7,
        delay: i * 0.15,
        ease: "easeInOut",
      },
      opacity: { duration: 0.01, delay: i * 0.15 },
    },
  }),
};

// Port dot pop-in — after cable completes
const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2, delay: i * 0.15 + 0.7 },
  }),
};
```

---

## Sections Using This Theme

| Section      | File                            | Cable Type                      | Status |
| ------------ | ------------------------------- | ------------------------------- | ------ |
| Benefits     | `app/components/Benefits.tsx`   | 4 cables from both screen edges | Done   |
| How It Works | `app/components/HowItWorks.tsx` | 1 routed cable between 3 steps  | Done   |

When adding the cabling theme to a new section, add a row to this table.
