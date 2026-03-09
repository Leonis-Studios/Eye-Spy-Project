// "use client" is needed here because we're using:
//   - useInView from Framer Motion (a browser hook that detects scroll position)
//   - motion components with scroll-triggered animations
"use client"

// ─── IMPORTS ─────────────────────────────────────────────────────────────────
// useRef: gives us a reference to a DOM element so we can observe it.
import { useRef } from "react"

// motion: Framer Motion's animated element wrapper.
// useInView: a Framer Motion hook that returns true when an element enters the viewport.
//   We use this to trigger animations only when the user scrolls to this section,
//   not when the page first loads (since the section starts below the fold).
import { motion, useInView, type Variants } from "framer-motion"

// Icons from Lucide — each one represents a certification/trust signal.
import { ShieldCheck, BadgeCheck, Star, Users, Clock, Award } from "lucide-react"


// ─── TYPE DEFINITIONS ─────────────────────────────────────────────────────────
// TypeScript interfaces define the "shape" of an object — what properties it has
// and what type each property is. This is like a blueprint for our data objects.
// If you try to create a stat or cert object that doesn't match this shape,
// TypeScript will throw an error before you even run the code.

// A stat item — a number/value with a label and an icon
interface Stat {
  value: string   // e.g. "2,400+"
  label: string   // e.g. "Systems Installed"
  icon: React.ReactNode  // a React component (like <ShieldCheck />) — ReactNode means "anything renderable"
}

// A certification item — just an icon and a label
interface Cert {
  icon: React.ReactNode
  label: string
}


// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function SocialProof() {

  // ─── REF FOR SCROLL DETECTION ──────────────────────────────────────────────
  // We attach this ref to the <section> element below.
  // useInView then watches that element and tells us when it's visible on screen.
  const sectionRef = useRef<HTMLElement>(null)

  // useInView returns a boolean — true when the element is in the viewport.
  // once: true means it only triggers ONCE — after the animation plays,
  // it won't reset if you scroll away and come back. Feels more natural.
  // amount: 0.2 means "trigger when 20% of the element is visible" —
  // so the animation starts just as the section comes into view, not after
  // the user has scrolled past most of it.
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })


  // ─── ANIMATION VARIANTS ────────────────────────────────────────────────────
  // Same pattern as Hero — define named states, reference them in JSX.
  // The key difference from Hero: we don't animate on page load (animate="visible").
  // Instead, we tie the animate prop to isInView — so it only plays when scrolled to.

  // Container variant — this animates the wrapper div.
  // "staggerChildren: 0.1" means each direct child will start its animation
  // 100ms after the previous one — creates a cascading reveal effect automatically.
  // You define this on the parent, and Framer Motion handles the stagger for children.
  const containerVariants: Variants = {
    hidden: {},  // container itself doesn't animate — just controls children timing
    visible: {
      transition: {
        staggerChildren: 0.1,    // each child starts 100ms after the previous
        delayChildren: 0.1,      // wait 100ms before starting the first child
      }
    }
  }

  // Item variant — applied to each individual card/item inside the container.
  // Each item starts invisible and 20px below, then rises up to full opacity.
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  }


  // ─── DATA ──────────────────────────────────────────────────────────────────
  // Stats array — the three numerical trust signals.
  // We store them in an array and loop with .map() instead of repeating JSX 3 times.
  // icon: <Component /> syntax — JSX inside a JS object. This works because
  // React elements are just objects, so they can be stored in variables/arrays.
  const stats: Stat[] = [
    { value: "15+",    label: "Years in Business",    icon: <Clock size={18} /> },
    { value: "2,400+", label: "Systems Installed",    icon: <Users size={18} /> },
    { value: "4.9★",   label: "Average Rating",       icon: <Star  size={18} /> },
  ]

  // Certifications array — the trust badges shown on the right side.
  const certs: Cert[] = [
    { icon: <ShieldCheck size={16} />, label: "Licensed & Insured" },
    { icon: <BadgeCheck  size={16} />, label: "BBB Accredited"     },
    { icon: <Award       size={16} />, label: "Certified Installer" },
  ]


  // ─── JSX ───────────────────────────────────────────────────────────────────
  return (
    // ref={sectionRef} — attaches our ref so useInView can watch this element.
    // The section sits directly below the Hero — no min-h-screen, just enough
    // padding to breathe. bg-[#070f1e] is slightly lighter than the Hero's
    // #050d1a — creates a subtle layered depth effect between sections.
    // "border-y border-white/5" — very faint top and bottom borders that act as
    // section dividers without being heavy-handed.
    <section
      ref={sectionRef}
      className="relative bg-[#070f1e] border-y border-white/5 overflow-hidden py-14"
    >

      {/* ── BACKGROUND ACCENT ─────────────────────────────────────────────────
          A faint cyan glow on the right side — mirrors the Hero's left-side orb.
          Together they create a diagonal accent flow across the page as you scroll.
          pointer-events-none so it never blocks interactions.
          aria-hidden so screen readers skip it.
      */}
      <div
        className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      {/* ── INNER LAYOUT ──────────────────────────────────────────────────────
          motion.div with containerVariants — this is the stagger parent.
          animate={isInView ? "visible" : "hidden"} is the scroll-trigger pattern:
            - When isInView is false (section off screen): stay in "hidden" state
            - When isInView becomes true (section scrolled into view): animate to "visible"
          This means the animation only plays when the user actually sees the section.

          Layout: on mobile, stack vertically (flex-col).
          On lg (1024px+), split into two columns side by side (flex-row).
          "items-center" vertically centers the two columns against each other.
          "gap-10 lg:gap-0" — gap between stacked items on mobile, no gap on desktop
          (we'll use a divider line between the two halves instead).
      */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative max-w-6xl mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-0"
      >

        {/* ── LEFT SIDE: STATS ────────────────────────────────────────────────
            Three stat boxes in a row.
            "grid grid-cols-3" — three equal columns.
            "gap-px bg-white/5" — this is a border trick:
              The parent has a faint background color.
              gap-px creates 1px gaps between children.
              Those 1px gaps reveal the parent's background — creating divider lines
              between items without needing actual border elements.
            "flex-1" lets this half grow to fill available space on desktop.
        */}
        <div className="flex-1 w-full">

          {/* Section eyebrow label — small uppercase text above the stats */}
          <motion.p
            variants={itemVariants}
            className="text-[#00c8ff] text-xs uppercase tracking-widest mb-6 text-center lg:text-left"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Trusted by homeowners & businesses across the region
          </motion.p>

          {/* Stats grid — the gap-px border trick in action */}
          <div className="grid grid-cols-3 gap-px bg-white/5 rounded-sm overflow-hidden">
            {stats.map((stat) => (
              // motion.div uses itemVariants — the parent's staggerChildren
              // automatically staggers each of these with 100ms delay between them.
              // key={stat.label} — unique identifier React needs for list items.
              // "group" — enables group-hover on child elements.
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="group bg-[#070f1e] hover:bg-[#0a1628] transition-colors duration-300 px-6 py-8 flex flex-col items-center gap-3"
              >
                {/* Icon — shown in accent color, fades slightly on hover */}
                <span className="text-[#00c8ff] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {stat.icon}
                </span>

                {/* The big number — the main thing the eye lands on */}
                <span
                  className="text-3xl md:text-4xl font-bold text-white"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {stat.value}
                </span>

                {/* Label underneath — muted, small */}
                <span
                  className="text-xs text-slate-500 uppercase tracking-widest text-center leading-tight"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── VERTICAL DIVIDER ────────────────────────────────────────────────
            Only visible on large screens (hidden on mobile since we stack vertically).
            "self-stretch" makes it grow to match the height of both columns.
            The gradient fades in/out at top and bottom — same technique as the
            Hero's bottom divider line but rotated 90 degrees (bg-gradient-to-b).
        */}
        <div className="hidden lg:block self-stretch w-px mx-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* ── RIGHT SIDE: CERTIFICATIONS ──────────────────────────────────────
            Three certification badges stacked vertically.
            "flex-shrink-0" prevents this column from shrinking on desktop.
        */}
        <div className="flex-shrink-0 flex flex-col gap-4 w-full lg:w-auto">

          {/* Section eyebrow label for the certs side */}
          <motion.p
            variants={itemVariants}
            className="text-[#00c8ff] text-xs uppercase tracking-widest mb-2 text-center lg:text-left"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Credentials
          </motion.p>

          {/* Loop over certs array — same .map() pattern as stats */}
          {certs.map((cert) => (
            <motion.div
              key={cert.label}
              variants={itemVariants}
              // Each cert is a horizontal row: icon on left, label on right.
              // "border border-white/5" — very subtle border around each badge.
              // "hover:border-[#00c8ff]/20 hover:bg-[#00c8ff]/5" — on hover,
              // the border and background shift to a faint cyan tint.
              // transition-all duration-300 — smoothly animates ALL changing properties.
              className="group flex items-center gap-4 px-6 py-4 rounded-sm border border-white/5 hover:border-[#00c8ff]/20 hover:bg-[#00c8ff]/5 transition-all duration-300 cursor-default"
            >
              {/* Icon — in a small accent-colored circle */}
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00c8ff]/10 text-[#00c8ff] flex-shrink-0 group-hover:bg-[#00c8ff]/20 transition-colors duration-300"
              >
                {cert.icon}
              </span>

              {/* Cert label text */}
              <span
                className="text-sm text-slate-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap"
                style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.05em" }}
              >
                {cert.label}
              </span>

              {/* Small checkmark dot on the right — appears on hover only.
                  "ml-auto" pushes it to the far right of the flex row.
                  "opacity-0 group-hover:opacity-100" — invisible by default,
                  fades in when the parent (group) is hovered. */}
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00c8ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
            </motion.div>
          ))}
        </div>

      </motion.div>

      {/* Google Fonts — same fonts as Hero for consistency.
          In production, move this to globals.css so it only loads once. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:wght@400;500&display=swap');
      `}</style>

    </section>
  )
}