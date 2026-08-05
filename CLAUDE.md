# High Horse — Website

Search Marketing Agency site. Sells business outcomes (leads/sales/revenue), not marketing activity. Full brand rules, voice, and copy constraints live in `HIGH_HORSE_BRAND.md` — read it before writing any user-facing copy.

## Stack
- Next.js (App Router, TypeScript), Tailwind CSS
- Supabase (Postgres + RLS, no admin auth needed)
- Cloudflare R2 (media storage, S3-compatible SDK)
- Vercel (deploys from `main`; PRs get preview URLs)

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`

## Data layer
- Server Supabase client (service role key) — Route Handlers / Server Actions only. Never expose to client code.
- Client Supabase client (anon key) — Client Components only.
- Core tables: `services`, `portfolio_items`, `case_studies`, `blog_posts`, `job_openings`, `job_applications`, `form_submissions`
- RLS: public read on published content, no public write

## Media
- All images/media live in R2, resolved to public URLs, rendered via `next/image`
- Never commit binary assets to the repo

## Copy rules (enforced, not optional)
- Never invent stats, case studies, guarantees, or client results
- Follow approved/prohibited phrase lists in `HIGH_HORSE_BRAND.md`
- Lead with business outcomes (leads, sales, revenue), not deliverables (rankings, traffic, reports)
- Unconfirmed claims get hedged: "may", "appears", "worth investigating"
- Mark anything not yet finalized as `[TO BE VALIDATED]`

## Conventions
- ES modules only, no CommonJS
- Server Components by default; `"use client"` only when the component needs interactivity/state
- Forms: React Hook Form + Zod validation, submissions written to Supabase
- Env vars in `.env.local` — never commit, never log

## Workflow status
Build phase checklist: see `website-workflow.md`. No auth/admin system — content is managed directly via Supabase.