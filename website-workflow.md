# Website Build Workflow (Corrected)

Status legend: ✅ Done · 🔧 Do next · ⬜ Later

---

## Phase 0 — Planning & Project Setup
**Goal:** Prepare the development environment and project foundation.

- [x] ✅ GitHub repository created
- [x] ✅ Vercel project connected
- [x] ✅ Supabase project created
- [x] ✅ Cloudflare storage (R2) created
- [ ] 🔧 Review UI designs (Figma/Framer)
- [ ] 🔧 Review content and creative assets
- [ ] 🔧 Define project folder structure
- [ ] 🔧 Configure Git Flow (main, develop, feature/*)
- [ ] 🔧 Create Next.js project (TypeScript, App Router)
- [ ] 🔧 Configure Tailwind CSS
- [ ] 🔧 Configure ESLint, Prettier, Husky, Commitlint, lint-staged
- [ ] 🔧 Configure environment variables (Supabase keys + R2 keys, local `.env`)
- [ ] 🔧 Set up GitHub Actions for lint/typecheck/build on every PR *(added — was missing)*

**Deliverables:** Dev environment ready, project architecture established, CI running on PRs.

---

## Phase 0.5 — Backend Schema *(new phase — was missing entirely)*
**Goal:** Design the data layer before anything tries to render dynamic content.

- [ ] Design Supabase tables: `services`, `portfolio_items`, `case_studies`, `blog_posts`, `job_openings`, `job_applications`, `form_submissions`
- [ ] Define relationships (e.g. case study → portfolio item)
- [ ] Write Row Level Security (RLS) policies (public read on published content, no public write)
- [ ] Create server-side Supabase client (service role key, used only in Route Handlers/Server Actions)
- [ ] Create client-side Supabase client (anon key, safe for Client Components)
- [ ] Generate TypeScript types from schema (`supabase gen types`)

**Deliverables:** Database schema live, typed client ready to query.

---

## Phase 0.6 — Storage Pipeline *(new phase — Cloudflare wasn't referenced anywhere)*
**Goal:** Wire up image/media handling before any component needs to display an image.

- [ ] Server-side R2 client (S3-compatible SDK)
- [ ] Upload helper (buffer → R2, returns public URL)
- [ ] Signed URL helper for direct browser → R2 uploads (avoids proxying large files through your server)
- [ ] Image component that resolves R2 keys to public URLs, wired into `next/image`

**Deliverables:** Working upload → store → display pipeline for portfolio/blog/case-study images.

---

## Phase 1 — Design System
- [ ] Color palette · Typography system · Spacing scale · Border radius · Shadows
- [ ] Buttons · Form styles · Global animations · Responsive breakpoints · Theme tokens

**Deliverables:** Complete design system (as CSS tokens, not hardcoded values).

---

## Phase 2 — Core Layout
- [ ] Root layout · Header · Navigation · Mobile navigation · Footer
- [ ] Section wrapper · Container · Grid system · Breadcrumb · Loading states

**Deliverables:** Website layout completed.

---

## Phase 3 — Reusable Components
- [ ] Buttons · Cards · Inputs · Textareas · Selects · Dropdowns
- [ ] Modals · Accordions · Tabs · Badges · Avatars
- [ ] Pagination · Toasts · Skeleton loaders · Empty states

**Deliverables:** Reusable UI library.

---

## Phase 4 — Homepage
- [ ] Hero · About preview · Services · Portfolio preview · Process
- [ ] Testimonials · Client logos · Statistics · CTA · FAQ · Newsletter · Footer

**Deliverables:** Homepage completed.

---

## Phase 5 — Internal Pages
- [ ] About · Services · Portfolio · Case Studies · Blog · Contact
- [ ] Careers · Privacy Policy · Terms & Conditions · 404 Page

**Deliverables:** Static pages completed.

---

## Phase 6 — Dynamic Content Integration
*(renamed from "CMS Integration" — you're using Supabase directly, not a third-party CMS)*

- [ ] Dynamic page rendering from Supabase
- [ ] Blog integration · Portfolio integration · Service content
- [ ] SEO fields pulled from schema
- [ ] Image loading via R2 pipeline (Phase 0.6)
- [ ] Content seeding — populate real services/portfolio/blog rows *(added — was missing)*

**Deliverables:** Dynamic content working end-to-end (DB → frontend).

---

## Phase 7 — Forms & User Interaction
- [ ] Contact form · Quote request form · Newsletter subscription · Career application
- [ ] Validation with React Hook Form + Zod
- [ ] Submissions written to Supabase (`form_submissions`, `job_applications`)
- [ ] Success/error states
- [ ] Spam protection (Turnstile/reCAPTCHA)

**Deliverables:** Forms functional and persisted to the database.

---

## Phase 8 — Animations
- [ ] Hero animations · Scroll animations · Navigation interactions · Section reveals
- [ ] Card hover effects · Image reveals · Counter animations · Page transitions · Micro-interactions

**Deliverables:** Fully animated website.

---

## Phase 9 — SEO
- [ ] Metadata · Dynamic titles/descriptions · Open Graph · Twitter Cards
- [ ] Structured data / Schema markup · Robots.txt · Sitemap · Canonical URLs

**Deliverables:** SEO-ready website.

---

## Phase 10 — Performance Optimization
- [ ] Optimize images · Font optimization · Lazy loading
- [ ] Code splitting · Bundle optimization · Caching · Route prefetching

**Deliverables:** High Lighthouse scores.

---

## Phase 11 — Analytics & Monitoring
- [ ] Google Analytics 4 · Google Search Console · Microsoft Clarity
- [ ] Sentry · Vercel Analytics

**Deliverables:** Analytics configured.

---

## Phase 12 — Testing
*(note: don't wait until this phase for everything — test forms, responsiveness, and accessibility incrementally as each phase ships, not only here)*

- [ ] Responsive testing · Cross-browser testing · Accessibility testing
- [ ] Performance testing · SEO validation · Form testing · Animation testing

**Deliverables:** QA completed.

---

## Phase 13 — Deployment
- [ ] Production build · Configure production environment variables
- [ ] Connect GitHub to Vercel (production branch) · Configure domain · SSL verification
- [ ] Final deployment

**Deliverables:** Live website.

---

## Phase 14 — Post-Launch
- [ ] Bug fixes · Performance monitoring · Content updates
- [ ] SEO monitoring · Security updates · Dependency updates · Feature improvements

**Deliverables:** Stable production website.

---

## What changed vs. the original workflow

1. Added **Phase 0.5 (Backend Schema)** — the old "CMS Integration" phase assumed a CMS existed with no phase to actually design it.
2. Added **Phase 0.6 (Storage Pipeline)** — Cloudflare storage wasn't mentioned anywhere in the original plan.
3. Renamed Phase 6 from "CMS Integration" to **"Dynamic Content Integration"** and added a content-seeding step.
4. Added **CI (GitHub Actions)** to Phase 0 — previously only manual deployment existed.
5. Added a note to **Phase 12** that testing should happen incrementally per phase, not only at the end.
6. Confirmed: **no auth phase added**, since you don't need an admin login.

## Updated flow

```
Setup + Backend Schema + Storage Pipeline
        │
        ▼
Design System → Core Layout → Reusable Components
        │
        ▼
Homepage → Internal Pages
        │
        ▼
Dynamic Content Integration (Supabase + R2)
        │
        ▼
Forms & Interaction → Animations
        │
        ▼
SEO → Performance → Analytics
        │
        ▼
Testing → Deployment → Post-Launch
```
