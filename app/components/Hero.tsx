// "use client" tells Next.js to run this component in the browser (client-side).
// By default, Next.js runs components on the server. But this component uses:
//   - useEffect and useRef (React hooks — only work in the browser)
//   - canvas animation (a browser API)
//   - button click handlers (browser events)
// Any time you use those things, you need "use client" at the top.
"use client";

// ─── IMPORTS ─────────────────────────────────────────────────────────────────
// Importing specific hooks from React.
// useEffect: runs code AFTER the component appears on screen (good for browser APIs)
// useRef: gives you a direct reference to a real DOM element (like a canvas or div)
import { useEffect, useRef } from "react";

// Framer Motion is an animation library.
// "motion" is a special version of HTML elements (motion.div, motion.h1, etc.)
// that have built-in animation support via props like initial, animate, transition.
// Importing the Variants type from Framer Motion.
// We need this so TypeScript knows exactly what shape our animation object should be.
// Without it, TypeScript infers the types too loosely and throws errors.
import { motion, type Variants } from "framer-motion";

// Lucide React is an icon library.
// We're importing three specific icons by name.
// These are React components — you use them like <ShieldCheck /> in JSX.
import { ShieldCheck, ArrowRight, ChevronDown } from "lucide-react";

import { siteConfig } from "../config/site";
import { type SiteSettings } from "../lib/types";

// ─── COMPONENT DEFINITION ────────────────────────────────────────────────────
// This is the Hero component — a function that returns UI (JSX).
// "export default" means other files can import this component.
// In page.tsx you'd write: import Hero from "./components/Hero"
// Then use it like an HTML tag: <Hero />
export default function Hero({ settings }: { settings: SiteSettings }) {
  // ─── REFS ──────────────────────────────────────────────────────────────────
  // useRef creates a reference to a real DOM element.
  // We attach this to the <canvas> element below via ref={canvasRef}.
  // After the component mounts, canvasRef.current IS the actual canvas element.
  // The <HTMLCanvasElement> part is TypeScript — it tells TypeScript what
  // type of element this ref will point to, so it knows what methods are available.
  // null is the initial value before the canvas exists yet.
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ─── CANVAS ANIMATION (useEffect) ─────────────────────────────────────────
  // useEffect runs code AFTER the component renders in the browser.
  // We use it here because we can't touch the canvas until it exists in the DOM.
  // Structure: useEffect(() => { setup }, [dependencies])
  // The empty array [] as the second argument means: run this effect ONCE only,
  // right after the first render. If you put a variable in the array, it would
  // re-run every time that variable changes.
  useEffect(() => {
    // Get the actual canvas element from our ref.
    // If it doesn't exist yet for some reason, bail out early.
    const canvas = canvasRef.current;
    if (!canvas) return;

    // getContext("2d") gives us the 2D drawing API for the canvas.
    // ctx is the object we use to draw lines, shapes, gradients, etc.
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // animFrameId stores the ID of the current animation frame request.
    // We need this so we can cancel the animation when the component unmounts
    // (otherwise it keeps running in the background and causes memory leaks).
    let animFrameId: number;

    // offset is a number that increases each frame.
    // We use it to move the scanline downward over time, creating the animation.
    let offset = 0;

    // resize() makes the canvas pixel dimensions match its CSS display size.
    // Without this, the canvas would draw at a different resolution than it displays,
    // making everything look blurry or the wrong size.
    const resize = () => {
      canvas.width = canvas.offsetWidth; // actual pixel width of the element
      canvas.height = canvas.offsetHeight; // actual pixel height of the element
    };
    resize(); // run once immediately

    // Listen for window resize events and re-run resize() when the user
    // resizes their browser window, so the canvas always fits correctly.
    window.addEventListener("resize", resize);

    // draw() is our animation loop — it runs every frame (~60fps).
    // Each frame it: clears the canvas, draws the grid, draws the scanline,
    // increments offset, then schedules itself to run again next frame.
    const draw = () => {
      // Clear the entire canvas before drawing the next frame.
      // Without this, every frame would draw ON TOP of the previous one.
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Draw the grid lines ──────────────────────────────────────────────
      // strokeStyle sets the color of lines. rgba() = red, green, blue, alpha(opacity).
      // 0.04 alpha means very faint — you barely see it, but it adds texture.
      ctx.strokeStyle = "rgba(104, 216, 214, 0.05)";
      ctx.lineWidth = 1;

      const spacing = 48; // pixels between each grid line

      // Draw vertical lines — loop from left to right across the canvas
      for (let x = 0; x < canvas.width + spacing; x += spacing) {
        ctx.beginPath(); // start a new line path
        ctx.moveTo(x, 0); // start at top
        ctx.lineTo(x, canvas.height); // draw to bottom
        ctx.stroke(); // actually render the line
      }

      // Draw horizontal lines — loop from top to bottom.
      // "offset % spacing" makes the lines shift downward as offset increases,
      // creating the scrolling effect. The modulo (%) keeps it within one spacing
      // cycle so it loops seamlessly.
      for (
        let y = -spacing + (offset % spacing);
        y < canvas.height + spacing;
        y += spacing
      ) {
        ctx.beginPath();
        ctx.moveTo(0, y); // start at left
        ctx.lineTo(canvas.width, y); // draw to right
        ctx.stroke();
      }

      // ── Draw the scanline (moving glow band) ────────────────────────────
      // A linear gradient that goes from transparent → faint cyan → transparent.
      // This creates a soft glowing horizontal band that drifts down the screen.
      // "offset % canvas.height" makes the band loop from top to bottom continuously.
      const grad = ctx.createLinearGradient(
        0,
        (offset % canvas.height) - 40, // gradient starts 40px above the center point
        0,
        (offset % canvas.height) + 40, // gradient ends 40px below the center point
      );
      grad.addColorStop(0, "rgba(104, 216, 214, 0)"); // fully transparent at top
      grad.addColorStop(0.5, "rgba(104, 216, 214, 0.04)"); // very faint teal at center
      grad.addColorStop(1, "rgba(104, 216, 214, 0)"); // fully transparent at bottom

      ctx.fillStyle = grad;
      // Draw a rectangle spanning the full width, 80px tall, centered on offset position
      ctx.fillRect(0, (offset % canvas.height) - 40, canvas.width, 80);

      // Increment offset each frame to move the scanline downward
      offset += 0.4;

      // requestAnimationFrame tells the browser to call draw() again before the next repaint.
      // This creates the animation loop — runs ~60 times per second.
      // We store the returned ID so we can cancel it in the cleanup function below.
      animFrameId = requestAnimationFrame(draw);
    };

    draw(); // kick off the animation loop

    // ── Cleanup function ────────────────────────────────────────────────────
    // This return function runs when the component is removed from the page.
    // Without cleanup, the animation and event listener would keep running
    // even after the component is gone, wasting memory and causing bugs.
    return () => {
      cancelAnimationFrame(animFrameId); // stop the animation loop
      window.removeEventListener("resize", resize); // remove the resize listener
    };
  }, []); // empty array = run this effect once, on first render only

  // ─── SCROLL HANDLER ───────────────────────────────────────────────────────
  // When the CTA button is clicked, smoothly scroll to the estimate form.
  // document.getElementById finds an element by its id attribute.
  // scrollIntoView with behavior: "smooth" animates the scroll instead of jumping.
  // The ?. is "optional chaining" — if getElementById returns null (element not found),
  // it just does nothing instead of crashing with an error.
  const scrollToForm = () => {
    document
      .getElementById("estimate-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // ─── ANIMATION VARIANTS ───────────────────────────────────────────────────
  // Framer Motion uses "variants" — named animation states you define once
  // and reuse across multiple elements.
  // Instead of writing full animation props on every element, you define
  // the states here and reference them by name (initial="hidden" animate="visible").
  // ": Variants" explicitly tells TypeScript this object follows Framer Motion's
  // Variants type definition — this is what fixes the error.
  // The root cause: TypeScript saw "ease: [0.22, 1, 0.36, 1]" and typed it as
  // number[] (array of numbers). But Framer Motion's Variants type expects the
  // cubic bezier to be typed as [number, number, number, number] — a tuple
  // (fixed-length array). Adding ": Variants" gives TypeScript enough context
  // to accept the cubic bezier array without complaining.
  const fadeUp: Variants = {
    // "hidden" is the starting state — invisible and shifted down 28px
    hidden: { opacity: 0, y: 28 },

    // "visible" is the end state — fully visible at normal position.
    // This is a function that takes "i" (a custom number we pass to each element).
    // The "i" value controls the delay — each element gets a slightly later start,
    // creating a natural staggered cascade where content flows in top to bottom.
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.13, // element 0: 0ms, element 1: 130ms, etc.
        duration: 0.65, // animation takes 0.65 seconds
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // typed as a tuple, not number[]
      },
    }),
  };

  // ─── STATIC DATA ──────────────────────────────────────────────────────────
  // Storing the stats in an array so we can loop over them with .map() below.
  // This is cleaner than copy-pasting three separate JSX blocks.
  // Each object has a "value" and "label" property we'll reference in the JSX.
  const stats = [
    { value: settings.stats.installs, label: "Systems Installed" },
    { value: settings.stats.years, label: "In The Field" },
    { value: settings.stats.satisfaction, label: "Client Satisfaction" },
  ];

  // ─── JSX (THE UI) ─────────────────────────────────────────────────────────
  // Everything inside return() is JSX — looks like HTML but it's JavaScript.
  // Key differences from HTML:
  //   - Use className instead of class (class is a reserved word in JS)
  //   - Self-closing tags need a slash: <br /> not <br>
  //   - JavaScript expressions go inside curly braces: {variable}
  //   - Inline styles use objects with camelCase: style={{ backgroundColor: "red" }}
  //   - Comments inside JSX use {/* this syntax */}
  return (
    // <section> is the outermost wrapper for the entire hero area.
    // "relative" — establishes a positioning context so children can use absolute positioning.
    // "min-h-screen" — at least 100% of the viewport height (fills the screen).
    // "overflow-hidden" — clips children that extend beyond the edges (like the blurred orb)
    //   so they don't create unwanted scrollbars.
    // "flex flex-col justify-center" — centers the main content vertically.
    // "bg-[#050d1a]" — custom dark navy color (square brackets let you use any CSS value).
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050d1a] pt-20">
      {/* ── BACKGROUND LAYER 1: Radial glow ──────────────────────────────────
          A decorative div with no visible content — just a background gradient effect.
          "pointer-events-none" — this element won't block any mouse clicks or touch events.
          "absolute inset-0" — covers the entire parent section (top:0, right:0, bottom:0, left:0).
          The inline style creates a soft radial gradient: a faint blue glow centered
          at the top-center of the section, fading to fully transparent.
          This makes the headline area feel like it has a light source behind it.
      */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(8, 124, 167, 0.06) 0%, transparent 70%)",
        }}
      />
      {/* ── BACKGROUND LAYER 2: Animated canvas grid ─────────────────────────
          The <canvas> element is where the browser lets you draw with JavaScript.
          ref={canvasRef} links this element to our canvasRef variable above —
          so our useEffect can find it and draw the grid/scanline animation on it.
          "pointer-events-none" — decorative, shouldn't block interactions.
          "absolute inset-0 w-full h-full" — stretches to fill the entire section.
          aria-hidden="true" — tells screen readers to skip this (it's decorative).
      */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full"
        aria-hidden
      />
      {/* ── BACKGROUND LAYER 3: Accent orb ───────────────────────────────────
          A large blurred circle in the bottom-left corner, partially off-screen.
          "-bottom-32 -left-32" uses negative positioning to push it off the edge.
          "w-96 h-96" = 384x384px circle. "rounded-full" makes it perfectly round.
          "opacity-20" = 20% visible — very subtle, just a hint of color.
          The inline filter: blur(48px) turns the hard circle into a soft glow.
          Combined with the other layers, this adds warmth and depth to the corner.
      */}
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #087ca7 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      {/* ── MAIN CONTENT AREA ─────────────────────────────────────────────────
          This div contains everything the user actually reads.
          "relative z-10" — keeps it above the background layers (z-index 10).
          "flex flex-col items-center text-center" — stacks children vertically, centered.
          "px-6 md:px-16" — horizontal padding: tighter on mobile, wider on desktop.
          "pt-24 pb-16" — top padding clears the navbar; bottom padding adds breathing room.
          "max-w-5xl mx-auto w-full" — caps width at 1024px and centers horizontally.
      */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-16 pt-24 pb-16 max-w-5xl mx-auto w-full">
        {/* ── EYEBROW BADGE ───────────────────────────────────────────────────
            A small label above the headline — common pattern on landing pages.
            Establishes credibility before the user even reads the headline.
            motion.div uses our fadeUp variant:
              custom={0} → delay = 0 * 0.13 = 0ms (animates in first, immediately)
              variants={fadeUp} → references our animation definition above
              initial="hidden" → start in the hidden state
              animate="visible" → animate to the visible state
        */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#087ca7]/30 bg-[#087ca7]/8 text-[#9ceaef] text-xs uppercase tracking-widest"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          {/* Pulsing dot — w-1.5 h-1.5 = 6x6px circle, animate-pulse is a
              Tailwind built-in that repeatedly fades opacity in and out. */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#9ceaef] animate-pulse" />
          Licensed & Insured · Residential & Commercial
        </motion.div>

        {/* ── HEADLINE ────────────────────────────────────────────────────────
            custom={1} → delay = 1 * 0.13 = 130ms (animates in second)
            "text-5xl md:text-7xl" — responsive size: 48px mobile, 72px desktop.
            "leading-[1.06]" — tight line height (square brackets = exact value).
            "tracking-tight" — slightly reduced letter spacing for large text.
        */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold text-white leading-[1.06] tracking-tight mb-6"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Security Systems
          <br />
          {/* Gradient text technique:
              1. Set a gradient as the background of this span
              2. WebkitBackgroundClip: "text" clips the background to the text shape only
              3. WebkitTextFillColor: "transparent" makes the text itself see-through
              Result: the gradient shows through the text shape — looks like colored text
              but is actually a background gradient underneath transparent text. */}
          <span
            className="relative inline-block"
            style={{
              background:
                "linear-gradient(90deg, #087ca7 0%, #68d8d6 70%, #fa8334 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Built to Protect.
          </span>
        </motion.h1>

        {/* ── SUBHEADLINE ─────────────────────────────────────────────────────
            custom={2} → delay = 2 * 0.13 = 260ms (animates in third)
            "text-slate-400" — muted grey, creates visual hierarchy below headline.
            "max-w-2xl" — caps width at 672px so text doesn't stretch too wide.
            "leading-relaxed" — looser line height (1.625) for paragraph readability.
        */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          From cameras and access control to full alarm systems — we design,
          install, and support security solutions that give you real peace of
          mind.
        </motion.p>

        {/* ── CTA BUTTONS ─────────────────────────────────────────────────────
            custom={3} → delay = 3 * 0.13 = 390ms (animates in fourth)
            "flex flex-col sm:flex-row" — stacked on mobile, side by side on 640px+.
            "items-center gap-4" — vertically centered, 16px gap between them.
        */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary CTA — solid filled button.
              "group" is a Tailwind feature: when you add "group" to a parent,
              child elements can respond to the parent's hover state using "group-hover:".
              hover:bg-white changes background on hover.
              transition-colors duration-200 = smooth 200ms color transition. */}
          <button
            onClick={scrollToForm}
            className="group flex items-center gap-3 bg-[#FA8334] text-[#050d1a] font-bold px-8 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Get a Free Estimate
            {/* Arrow icon with group-hover micro-interaction.
                "group-hover:translate-x-1" moves the arrow 4px right when the
                PARENT BUTTON is hovered — this works because of the "group" class above.
                transition-transform duration-200 = smooth 200ms movement. */}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>

          {/* Secondary option — plain text link, not a button.
              href="tel:+15550000000" makes this a phone link.
              On mobile devices, tapping it opens the phone dialer automatically. */}
          <a
            href={siteConfig.phoneHref}
            className="text-slate-400 hover:text-white text-sm tracking-wide transition-colors duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            or call{" "}
            <span className="text-white font-medium">{settings.phone}</span>
          </a>
        </motion.div>

        {/* ── STATS ROW ───────────────────────────────────────────────────────
            custom={4} → delay = 4 * 0.13 = 520ms (animates in last)
            "grid grid-cols-3" — a 3-column CSS grid.
            "gap-8 md:gap-16" — 32px gap on mobile, 64px on desktop.
            "mt-20" — large top margin to visually separate from the buttons.
        */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-3 gap-8 md:gap-16 w-full max-w-xl"
        >
          {/* .map() loops over the stats array and returns JSX for each item.
              Think of it as: "for each stat, give me this piece of UI."
              The function receives each array item as "s" (we named it that — could be anything).
              "key" prop is REQUIRED by React when rendering lists.
              It helps React track which items changed, were added, or removed.
              We use s.label as the key since each label is unique. */}
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              {/* {s.value} and {s.label} are JSX expressions — curly braces let you
                  drop JavaScript values into your JSX markup. */}
              <span
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                {s.value}
              </span>
              <span
                className="text-xs text-slate-500 uppercase tracking-widest text-center"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>{" "}
      {/* end main content div */}
      {/* ── SCROLL CUE ────────────────────────────────────────────────────────
          A small "Scroll" label + bouncing chevron at the bottom of the section.
          Signals to the user there's more content below.
          "absolute bottom-8" — 32px from the bottom of the section.
          "left-1/2 -translate-x-1/2" — a common centering trick:
            left-1/2 moves the LEFT EDGE to the center,
            -translate-x-1/2 shifts it back left by half its own width,
            result: the element is perfectly centered horizontally.
          This one doesn't use our fadeUp variant — it has its own simple animation
          with a long delay (1.4s) so it appears after everything else has loaded.
          "animate-bounce" is a Tailwind built-in CSS keyframe animation.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 z-10"
      >
        <span
          className="text-[10px] uppercase tracking-widest"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Scroll
        </span>
        <ChevronDown size={14} className="animate-bounce" />
      </motion.div>
      {/* ── BOTTOM DIVIDER LINE ───────────────────────────────────────────────
          A 1px horizontal line at the very bottom of the section.
          "absolute bottom-0 left-0 right-0" pins it to the bottom edge.
          "h-px" = height of 1 pixel.
          "bg-gradient-to-r from-transparent via-[#EF6B4D]/20 to-transparent"
          creates a gradient that goes:
            transparent → faint cyan (20% opacity) → transparent
          So it looks like a glowing line that fades out at both ends.
          This subtly separates the hero from the next section.
      */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#68d8d6]/20 to-transparent" />
      {/* ── GOOGLE FONTS ──────────────────────────────────────────────────────
          This loads our two custom fonts from Google Fonts.
          Rajdhani — display/heading font (geometric, technical, sharp)
          DM Sans — body font (clean, modern, highly readable)
          The @import goes inside a <style> tag injected into the page.
          NOTE: In a production project, move this @import into app/globals.css
          so the fonts load once globally, not inside each component.
          We're keeping it here for now so this component is fully self-contained
          and works without any changes to other files.
      */}
    </section>
  );
}
