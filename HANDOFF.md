# Handoff — High Horse Website

Read this first. Then read `CLAUDE.md` (stack/conventions) and `HIGH_HORSE_BRAND.md` (copy/brand rules) before writing any code or copy.

## Status

**Done**
- GitHub repo created, employee has collaborator access
- Next.js project scaffolded (App Router, TypeScript, Tailwind)
- Vercel connected to GitHub `main` — auto-deploys on push, PR previews working
- Supabase project created (manual dashboard setup, not CLI-linked)
- `CLAUDE.md`, `.claudeignore`, `HIGH_HORSE_BRAND.md` added to repo root

**Not started yet**
- Supabase schema (tables: `services`, `portfolio_items`, `case_studies`, `blog_posts`, `job_openings`, `job_applications`, `form_submissions` — not yet created)
- Cloudflare R2 storage pipeline (bucket created, no upload/serve code yet)
- Design system, layout, components, homepage — nothing built past scaffold

## Next task

[Fill in: the specific next task, e.g. "Build the Supabase schema for `services` and `portfolio_items` per website-workflow.md Phase 0.5"]

## Known issues / gotchas

- Vercel Framework Preset must stay set to **Next.js** — it got set to "Other" once and caused a 404 on the whole site.
- `.env.local` is not in the repo — get values from [you], never request/share them in plain chat.
- No admin/auth system planned — content is managed directly via Supabase dashboard, not a custom CMS.
- `SUPABASE_SERVICE_ROLE_KEY` must never appear in client-side code or `NEXT_PUBLIC_*` vars.

## Access checklist for employee

- [ ] GitHub collaborator — done
- [ ] Supabase org invite (Developer role, not Owner/Admin) — [pending/done]
- [ ] `.env.local` values shared securely — [pending/done]
- [ ] Vercel dashboard access — **not needed**, PR previews cover it

## Where to find things

- Build phase checklist: `website-workflow.md`
- Stack, commands, conventions: `CLAUDE.md`
- Brand voice, approved/prohibited language, ICP: `HIGH_HORSE_BRAND.md`