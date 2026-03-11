import { type ReactNode, createElement } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured: boolean;
  content: ReactNode;
}

// ─── CONTENT HELPERS ──────────────────────────────────────────────────────────
// Use these instead of writing raw JSX for every paragraph and heading.
// p("text") renders a <p> tag, h("text") renders a styled <h2> tag.
// This makes writing articles feel more like writing a document.

export const p = (text: string): ReactNode =>
  createElement("p", { style: { marginBottom: 0 } }, text);

export const h = (text: string): ReactNode =>
  createElement(
    "h2",
    {
      style: {
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "1.75rem",
        fontWeight: 700,
        color: "white",
        marginTop: "2rem",
        marginBottom: "0.75rem",
      },
    },
    text,
  );

// Tip/callout box — use for pro tips, warnings, or highlighted points
export const tip = (title: string, text: string): ReactNode =>
  createElement(
    "div",
    {
      style: {
        border: "1px solid rgba(0,200,255,0.2)",
        background: "rgba(0,200,255,0.05)",
        borderRadius: "2px",
        padding: "1.25rem",
      },
    },
    createElement(
      "p",
      {
        style: {
          color: "#00c8ff",
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "0.4rem",
          fontFamily: "'Rajdhani', sans-serif",
        },
      },
      title,
    ),
    createElement("p", { style: { margin: 0, color: "#94a3b8" } }, text),
  );

// Bullet list — pass an array of strings
export const ul = (...items: string[]): ReactNode =>
  createElement(
    "ul",
    {
      style: {
        paddingLeft: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      },
    },
    ...items.map((item, i) =>
      createElement("li", { key: i, style: { color: "#94a3b8" } }, item),
    ),
  );

// ─── POSTS ────────────────────────────────────────────────────────────────────
// Add new posts at the TOP of this array — newest first.
// Only one post should have featured: true at a time.
//
// CHECKLIST FOR A NEW POST:
//   1. slug        — lowercase, hyphens, no special chars (becomes the URL)
//   2. title       — full display title
//   3. excerpt     — 1–2 sentence summary shown on the index card
//   4. category    — must be one of: "Buyer's Guide" | "Security Tips" | "Commercial"
//                    or add a new string to create a new filter category
//   5. readTime    — estimate manually, e.g. "4 min read"
//   6. date        — "Month YYYY" format
//   7. featured    — set to true for hero card, set previous featured post to false
//   8. content     — full article using p(), h(), tip(), ul() helpers below
//
// TEMPLATE — copy this and fill in:
//
// {
//   slug: "your-post-slug-here",
//   title: "Your Post Title Here",
//   excerpt: "One or two sentence summary of the article.",
//   category: "Security Tips",
//   readTime: "4 min read",
//   date: "March 2026",
//   featured: false,
//   content: createElement("div", { style: { display: "flex", flexDirection: "column", gap: "1.5rem" } },
//     p("Opening paragraph..."),
//     h("First Section"),
//     p("Section content..."),
//   ),
// },

export const posts: BlogPost[] = [
  // ── POST 1 ────────────────────────────────────────────────────────────────
  {
    slug: "how-to-choose-a-security-camera-system",
    title: "How to Choose the Right Security Camera System for Your Home",
    excerpt:
      "With hundreds of options on the market, choosing the right security camera system can feel overwhelming. Here's what actually matters and what you can ignore.",
    category: "Buyer's Guide",
    readTime: "6 min read",
    date: "March 2026",
    featured: true,
    content: createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "1.5rem" } },
      p(
        "Walk into any big box store and you'll find dozens of security camera options ranging from $30 to $3,000. The marketing on every box says roughly the same thing. So how do you actually choose?",
      ),
      p(
        "After 15 years of installing security systems, we've learned that most homeowners are choosing between options that are either overkill or not quite enough. Here's the framework we use when advising customers.",
      ),
      h("1. Start With Coverage, Not Cameras"),
      p(
        "The first question isn't 'how many cameras do I need?' It's 'what do I need to cover?' Walk the perimeter of your property and identify the key entry points — front door, back door, garage, side gates. That gives you a baseline count.",
      ),
      tip(
        "Pro Tip",
        "Most single-family homes need 4–6 cameras for solid coverage. Don't let anyone sell you 12 cameras for a 3-bedroom house.",
      ),
      h("2. Resolution Matters, But Not As Much As Placement"),
      p(
        "A 4K camera pointed at the wrong angle is less useful than a 1080p camera positioned correctly. Resolution matters for identifying faces and plates — but placement determines whether you capture the right angles in the first place.",
      ),
      p(
        "Our recommendation: 2MP (1080p) minimum for general coverage, 4MP or higher for entry points and driveways where you need plate or face recognition.",
      ),
      h("3. Wired vs Wireless"),
      p(
        "Wireless cameras are easier to install and more flexible to position. Wired cameras are more reliable and don't depend on Wi-Fi. For most homes, a hybrid approach works well — wired at permanent positions, wireless for supplemental coverage.",
      ),
      h("4. Storage: Local vs Cloud"),
      p(
        "Cloud storage means footage is accessible anywhere but comes with monthly fees. Local storage (NVR/DVR) is a one-time cost but requires physical access to review footage. For most residential customers we recommend local storage with optional cloud backup for critical cameras.",
      ),
      h("The Bottom Line"),
      p(
        "Don't buy cameras based on brand names or marketing specs. Start with your coverage needs, get the right resolution for each position, and choose a storage solution that fits your budget and lifestyle. When in doubt, get a professional assessment — most reputable installers offer free site surveys.",
      ),
    ),
  },

  // ── POST 2 ────────────────────────────────────────────────────────────────
  {
    slug: "alarm-system-myths-debunked",
    title: "5 Alarm System Myths That Could Be Leaving You Vulnerable",
    excerpt:
      "From 'my neighborhood is safe enough' to 'monitored alarms aren't worth the cost' — we break down the most common misconceptions about home security.",
    category: "Security Tips",
    readTime: "4 min read",
    date: "February 2026",
    featured: false,
    content: createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "1.5rem" } },
      p(
        "We hear the same misconceptions about alarm systems over and over. Some of them are harmless. Others are genuinely leaving homes and businesses exposed. Here are the five we hear most often.",
      ),
      h('Myth 1: "My neighborhood is safe"'),
      p(
        "Burglars don't choose neighborhoods based on crime statistics — they choose targets based on opportunity. An unlocked door in a quiet suburb is more attractive than a locked door in a high-crime area. Safety is about layers of deterrence, not location.",
      ),
      h('Myth 2: "Alarm signs are enough"'),
      p(
        "Yard signs and window stickers have some deterrent value. But experienced burglars know that signs don't always mean active monitoring. An actual installed and monitored system is significantly more effective.",
      ),
      h('Myth 3: "Smart locks replace alarm systems"'),
      p(
        "Smart locks are great for convenience and access management. They're not a replacement for an alarm system. A determined intruder can bypass a smart lock in seconds — an alarm system creates a chain of responses that makes completion of a break-in much harder.",
      ),
      h('Myth 4: "Monitored alarms aren\'t worth the monthly cost"'),
      p(
        "A basic monitoring plan costs less than most streaming subscriptions. What it buys you is a live response to any triggered alarm — including fire, carbon monoxide, and medical alerts, not just intrusions. For most families the peace of mind alone justifies the cost.",
      ),
      h('Myth 5: "I\'ll install it myself"'),
      p(
        "DIY systems have their place. But professional installation ensures correct sensor placement, proper calibration, and a system that won't trigger false alarms or miss real ones. If something goes wrong with a DIY install, you're on your own.",
      ),
      tip(
        "Bottom Line",
        "Professional installation paired with active monitoring is still the gold standard for home and business security. The cost is lower than most people assume.",
      ),
    ),
  },

  // ── POST 3 ────────────────────────────────────────────────────────────────
  {
    slug: "access-control-for-small-business",
    title: "Access Control for Small Businesses: What You Need to Know",
    excerpt:
      "Key fobs, PIN pads, or biometrics? This guide breaks down the most practical access control options for small and medium businesses.",
    category: "Commercial",
    readTime: "5 min read",
    date: "February 2026",
    featured: false,
    content: createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "1.5rem" } },
      p(
        "Access control is one of the most overlooked aspects of small business security. Most owners focus on cameras and alarms — but controlling who can enter which areas of your building is equally important.",
      ),
      h("The Three Main Options"),
      p(
        "Key fobs and cards are the most common choice for small businesses. They're easy to manage, easy to deactivate if lost, and work reliably in most environments.",
      ),
      p(
        "PIN pads are lower cost and require no physical credential — but codes get shared, and there's no way to know who entered using a shared code.",
      ),
      p(
        "Biometric systems (fingerprint, facial recognition) offer the highest security and the clearest audit trail, but come at a higher upfront cost. Best suited for server rooms, pharmacies, or anywhere with genuinely sensitive access requirements.",
      ),
      h("What Most Small Businesses Actually Need"),
      p(
        "For most offices and retail spaces, a key fob system on the main entrance and any sensitive back areas is the right call. It's affordable, manageable, and gives you a clear log of who entered when.",
      ),
      tip(
        "Key Consideration",
        "Always choose a system that lets you instantly deactivate a credential remotely — especially important when an employee leaves the company.",
      ),
      h("Integration With Your Existing System"),
      p(
        "Modern access control systems integrate directly with camera systems — so every entry event is paired with a video clip. This is particularly useful for after-hours access or investigating incidents.",
      ),
      ul(
        "Instant credential deactivation when staff leave",
        "Full audit log of who entered and when",
        "Integration with camera footage for incident review",
        "Remote management from your phone or computer",
      ),
    ),
  },

  // ── POST 4 ────────────────────────────────────────────────────────────────
  {
    slug: "wired-vs-wireless-security-systems",
    title: "Wired vs Wireless Security Systems: Which Is Right for You?",
    excerpt:
      "Both have real advantages. The right choice depends on your property type, budget, and how permanent you want the installation to be.",
    category: "Buyer's Guide",
    readTime: "5 min read",
    date: "January 2026",
    featured: false,
    content: createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "1.5rem" } },
      p(
        "One of the most common questions we get during site surveys is whether to go wired or wireless. The honest answer is that both have genuine advantages — the right choice depends on your specific situation.",
      ),
      h("Wired Systems"),
      p(
        "Wired cameras and sensors run a physical cable from each device back to a central recorder or panel. This means no batteries to replace, no Wi-Fi dependency, and a more stable connection overall.",
      ),
      p(
        "The tradeoff is installation complexity. Running cables through walls and ceilings takes time and is harder to change once installed. Best for new construction or properties where running cable is straightforward.",
      ),
      h("Wireless Systems"),
      p(
        "Wireless devices communicate over Wi-Fi or a dedicated radio frequency. They're faster to install, easier to reposition, and don't require drilling through walls. Ideal for renters, older buildings, or properties where cable runs would be disruptive.",
      ),
      p(
        "The tradeoffs: batteries need replacing every 1–3 years, Wi-Fi interference can occasionally cause issues, and a strong enough Wi-Fi jammer can theoretically disrupt the system.",
      ),
      h("The Hybrid Approach"),
      p(
        "Most of our installations use a mix — wired for permanent fixed positions like entrances and parking areas, wireless for supplemental coverage in harder-to-reach spots. This gives you the reliability of wired where it counts and the flexibility of wireless everywhere else.",
      ),
      tip(
        "Our Recommendation",
        "Unless you have a specific reason to go all-wired or all-wireless, a hybrid system gives you the best of both. We'll advise on the right split during your free site survey.",
      ),
    ),
  },

  // ── POST 5 ────────────────────────────────────────────────────────────────
  {
    slug: "home-security-tips-when-travelling",
    title: "10 Home Security Tips Before You Leave for Vacation",
    excerpt:
      "Most break-ins happen when homeowners are away. These simple steps significantly reduce your risk without requiring any new equipment.",
    category: "Security Tips",
    readTime: "3 min read",
    date: "January 2026",
    featured: false,
    content: createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "1.5rem" } },
      p(
        "Summer and holiday periods see a consistent spike in residential break-ins. Most of them are opportunistic — a house that looks empty and unmonitored is an easy target. These steps make your home look occupied and significantly harder to approach undetected.",
      ),
      h("Before You Leave"),
      ul(
        "Put interior lights on smart plugs or timers set to realistic on/off times",
        "Ask a neighbor to collect mail and packages daily",
        "Don't post travel plans on social media until after you return",
        "Bring any hidden spare keys inside",
        "Slide a cut-down wooden dowel in sliding door tracks",
      ),
      h("Secure Every Entry Point"),
      p(
        "Lock every window and door including the garage. Most garage door openers have a vacation lock mode — use it. If you have a smart lock, check the access log before you leave and revoke any codes you don't actively need.",
      ),
      h("Make Your Security Visible"),
      p(
        "Make sure any cameras are clearly visible from the street. Visible cameras are one of the strongest deterrents available. If you have a monitored alarm, make sure the yard sign and window stickers are visible and current.",
      ),
      h("While You're Away"),
      p(
        "Set up motion alerts on your cameras so you get a notification if anything triggers. Make sure someone you trust has a way to check on the property if something looks wrong.",
      ),
      tip(
        "Best Protection",
        "A professionally monitored alarm system handles all of this automatically and alerts emergency services on your behalf — no need to rely on neighbors or check your phone while on vacation.",
      ),
    ),
  },
];
