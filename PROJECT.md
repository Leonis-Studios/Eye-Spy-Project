# Project Definition Template

Copy this to your repo root as `PROJECT.md` after initial discovery. Update as scope changes.

```markdown
# Eye Spy Project

## Business Context

**Project Goal:**
Design a modern website with a blog and contact page for a security install company. Focus on SEO and analytics.

Example: "Fake stock market simulator for iOS/Android targeting realistic trading app aesthetics (Robinhood-style). Allows users to trade simulated stocks and currencies with live price updates."

**Target Audience:**
Customers for a home or corporate security installation.

Example: "Beginner investors aged 18-35 learning stock market mechanics without financial risk."

**Core Features (MVP):**

- CMS and SEO focus.
- [Feature 2]
- [Feature 3]
- [Feature 4]
- [Feature 5]

Example:

- Market list with real-time price simulation
- Portfolio management and transaction history
- Candlestick charts for price trends
- Buy/sell order execution
- Settings and profile management

**Launch Constraints:**

- Target Launch Date: "TBD"
- Team Size: 1 person
- Budget: self-funded
- Timeline: moderate

**Success Metrics:**

- Customer has more views on the website and emails through it.

Example:

- 500+ daily active users within 3 months
- 4.5+ star rating on app stores
- Average session duration > 10 minutes

---

## Technical Requirements

**Project Type:**

- [x] Static site (marketing, docs, blog, portfolio)
- [ ] Dynamic web app (SaaS, e-commerce, admin dashboard)
- [ ] Mobile app (iOS, Android, or cross-platform)
- [ ] Hybrid (web + mobile)

**Data Requirements:**

- Needs user authentication: No
  - If yes: OAuth (Google, GitHub) / Email / Custom
- Needs database: No
  - If yes: Type of data (users, posts, transactions, etc.)
  - Estimated data volume: [small < 1GB / medium 1-10GB / large > 10GB]
- Real-time features: [Chat, notifications, live updates, collaborative editing, price tickers]
  - If yes: WebSockets or polling?

**Performance Targets:**

- First Contentful Paint (FCP): [target ms]
- Largest Contentful Paint (LCP): [target ms]
- Cumulative Layout Shift (CLS): [target score]
- Page load time: 1 second

Example for SaaS:

- FCP < 2.5s
- LCP < 2.5s
- CLS < 0.1

**Accessibility & Compliance:**

- Accessibility standard: [WCAG 2.1 AA / AAA / custom / not required]
- Compliance needs: [GDPR / CCPA / HIPAA / SOC 2 / PCI-DSS / none]
- Analytics: Google Analytics
- Error tracking: [Sentry / LogRocket / custom / none]

**Browser & Device Support:**

- Supported browsers: Chrome, Firefox, Safari, Edge, IE11 (😱)
- Mobile support: iOS / Android / responsive web
- Minimum OS versions: [if mobile app]

Example for consumer app:

- Desktop: Chrome, Firefox, Safari (latest 2 versions)
- Mobile: iOS 12+ (React Native / Flutter) or responsive web

---

## Design & Branding

**Brand Identity:**

- **Colors:**
  - Primary: #[hex]
  - Accent: #[hex]
  - Neutral/Gray: #[hex]
  - (Add color references or link to brand guide)

- **Typography:**
  - Heading font: [e.g., "Inter, sans-serif"]
  - Body font: [e.g., "Work Sans, sans-serif"]
  - H1 size: [e.g., "2.5rem"]
  - Body size: [e.g., "1rem"]

- **Tone & Visual Style:**
  - Adjectives: minimal, modern
  - Design references: [link to Dribbble / Figma / competitor sites]
  - Logo: [attached / to be designed / provided]

**Design System Status:**

- [ ] Figma design system exists
- [x] Component library started
- [x] Tailwind config customized
- [x] Color palette defined
- [x] Typography scale defined
- [x] Spacing/sizing scale defined

Example:
```

Tailwind config includes:

- Primary color: #0d1117 (dark navy)
- Accent: #ff6b35 (orange)
- Neutral: #f5f7fa to #0d1117
- Spacing: xs=0.5rem, sm=1rem, md=1.5rem, lg=2rem, xl=3rem

```

---

## Technical Stack (Chosen)

**Frontend:**
- Framework: Next.js
- UI Library: React + lucide
- Styling: Tailwind CSS
- Component Library: [shadcn/ui / Headless UI / custom / none]
- State: [Zustand / Context / Jotai / Redux / other]

**Backend:**
- Framework: Next.js API routes
- Language: TypeScript
- API Design: [REST / GraphQL / tRPC]

**Database:**
- Type: [PostgreSQL / MySQL / SQLite / NoSQL]
- Hosting: [Supabase / Vercel Postgres / Railway / AWS RDS / self-hosted]
- ORM: [Prisma / Drizzle / SQLAlchemy / none]

**Authentication:**
- Provider: NextAuth.js
- Strategies: [OAuth: Google, GitHub, etc. / Email / credentials]

**Hosting & Deployment:**
- Frontend: Vercel
- Backend: Vercel
- Database: [Supabase / Vercel Postgres / Railway / AWS]
- CI/CD: [GitHub Actions / GitLab CI / Jenkins / manual]

**Real-Time (if applicable):**
- Technology: [Socket.io / Supabase Realtime / WebSockets / polling]
- Hosting: [Railway / Render / AWS / self-hosted]

**Optional Services:**
- File storage: [Vercel Blob / AWS S3 / Cloudinary]
- Email: Resend
- Payments: [Stripe / PayPal]
- Analytics: Google Analytics
- Error tracking: [Sentry / LogRocket]

Example (completed):
```

Frontend: Next.js 14 + React 18 + TypeScript + Tailwind CSS
Backend: Next.js API routes
Database: Supabase (PostgreSQL)
Auth: NextAuth.js with GitHub OAuth
Hosting: Vercel
Real-time: Supabase Realtime (notifications)
Analytics: Google Analytics 4

```

---

## Deployment & Operations

**Production Environment:**

- Primary hosting region: us-east
- Multi-region: No
- Backup strategy: weekly
- Disaster recovery: [RTO hours / RPO hours]

**Monitoring & Observability:**

- Uptime monitoring: nice-to-have
- Performance monitoring: required
- Error tracking: [required / nice-to-have]
- Logging level: [production / development / verbose]

**Secrets & Environment Variables:**

- Where stored: Vercel dashboard + .env.local
- Rotation policy: [annual / quarterly / never]
- Access control: [only leads / whole team / automated]

Example:
```

Stored in Vercel dashboard and GitHub repo secrets

- DATABASE_URL
- NEXTAUTH_SECRET
- STRIPE_SECRET_KEY
- GITHUB_OAUTH_ID/SECRET
  Rotation: Annual review, manual updates only

```

---

## Known Constraints & Decisions

**Technical Debt (if any):**
- [Outstanding issue or workaround that should be addressed]
- [...]

**Deferred Features:**
- [Feature planned but out of scope for MVP]
- [...]

**Assumptions:**
- [Business or technical assumption that could change]
- [...]

Example:
```

Technical Debt:

- Image optimization not yet implemented (using raw JPEGs)
- Database indexes need performance review (added for "quick win" MVP)

Deferred Features:

- Advanced search/filtering (Phase 2)
- Recommendation engine (Phase 3)
- Dark mode (nice-to-have)

Assumptions:

- Assume < 10k DAU for initial launch (no horizontal scaling needed yet)
- Assume team has TypeScript knowledge (no ramp-up time budgeted)

```

---

## Contacts & Resources

**Key People:**
- Product lead: [name / email]
- Design lead: [name / email]
- Tech lead: [name / email]

**Resources:**
- Figma design file: [link]
- Roadmap / issue tracker: [link]
- Documentation: [link]
- Deployment credentials: [where stored / who has access]

---

## Last Updated

- **Updated:** [date]
- **By:** [name]
- **Changes:** [what changed]
```

---

## How to Use This Template

1. **Copy to your repo root:** `PROJECT.md` (not in a subdirectory)
2. **Fill out on project start:** Complete all sections once during discovery
3. **Reference in Claude sessions:** When starting work, Claude will read this to avoid re-asking questions
4. **Update as scope changes:** Keep this file current; don't let it drift from reality
5. **Share with team:** This becomes your shared source of truth

## Template Usage in Workflow

When Claude starts a session on your project:

1. Read `PROJECT.md` first
2. Check `ARCHITECTURE.md` for tech decisions
3. Skip discovery questions and jump to building
4. When scope changes, update `PROJECT.md` and inform Claude

This eliminates repetitive questions like:

- "What are your brand colors?" → Check PROJECT.md
- "What's your tech stack?" → Check ARCHITECTURE.md
- "Do you need auth?" → Check PROJECT.md under Technical Requirements
