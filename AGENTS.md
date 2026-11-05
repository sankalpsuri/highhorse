<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Icon Badge Design Rules

All square icon/number badges sitewide use `<IconBadge>` from `components/icon-badge.tsx`.

### Sizes
- **sm** — 40 × 40 px, 10 px radius, 20 px icon
- **md** (default) — 48 × 48 px, 12 px radius, 24 px icon
- **lg** — 56 × 56 px, 14 px radius, 28 px icon

### Surface variants
- **Light** (default): bg `rgba(26,106,255,0.08)`, border `rgba(26,106,255,0.16)`, glyph `#1A6AFF`
- **Dark** (auto via `data-surface="dark"` on ancestor): bg `#FFFFFF`, border transparent, glyph `#111`

### Rules
1. Any section with a dark/black background must carry `data-surface="dark"`.
2. SVGs inside badges must use `stroke="currentColor"` (never hardcoded colors).
3. Number badges (`01`, `02`, step numbers) use the same shell and sizes.
4. Sanity schema fields `badgeColor` and `accentStyle` remain but are ignored for styling.
5. **Exemptions** (do NOT convert): third-party/client logos, Google Partner badge, footer social icons.
6. Placement: above title, left-aligned, 16 px gap to the next element.
7. Partnership page uses `variant="ink"` (black square `#0A0A0C`, white icon) by request; all other pages follow the standard blue/light rules.

## Spacing Rules

Sitewide section spacing is standardized through CSS custom properties in `app/globals.css` and a shared `SectionHeader` component in `components/section-header.tsx`.

### CSS variables (`:root`)
| Token | Desktop | 768px | 480px |
|---|---|---|---|
| `--section-pad-y` | 96px | 72px | 56px |
| `--eyebrow-to-heading` | 16px | 16px | 16px |
| `--heading-to-desc` | 16px | 14px | 14px |
| `--desc-to-content` | 40px | 32px | 28px |
| `--heading-max-w` | 720px | — | — |
| `--desc-max-w` | 680px | — | — |
| `--card-gap` | 20px | 16px | 16px |

### `.rsp-section` base class
Applies `max-width: 1280px; margin: 0 auto; padding: var(--section-pad-y) 32px;` with responsive overrides at 768px and 480px. Use on every section's inner container instead of repeating inline styles.

### `SectionHeader` component
Layouts: `stacked` (default), `split`, `inline-cta`. Handles eyebrow → heading → description spacing through `.sh-eyebrow`, `.sh-heading`, `.sh-desc` classes. Always pass eyebrow/heading/description as styled `<span>`/`<h2>`/`<p>` elements with `margin: 0` — the component's CSS classes control spacing.

### Exemptions (do NOT standardize)
- Hero sections (custom padding per page)
- Header and footer
- Sticky/fixed elements
- Logo slider and tech slider internals
- Form field spacing
- Dark callout cards (e.g. founder card) — internal spacing is card-specific
- Blog listing, case studies listing, free audit, contact form pages (maxWidth: 1140, unique layouts)
- Design-file-specific sections with intentional custom padding

### Rules
1. Section vertical padding must use `--section-pad-y` unless listed in exemptions.
2. Eyebrow-to-heading gap is always 16px (`--eyebrow-to-heading`).
3. Heading-to-description gap is 16px desktop / 14px mobile (`--heading-to-desc`).
4. Description-to-content gap is 40px / 32px / 28px (`--desc-to-content`).
5. Heading max-width defaults to 720px; description max-width to 680px.
6. Never introduce new magic-number spacing in section headers — use the variables.
7. When adding a new section component, use `SectionHeader` + `rsp-section` unless the layout genuinely can't fit.

### Bullets
All bulleted lists use the shared circular bullet style (`.hh-bullet` in `globals.css`): 6px diameter, `border-radius: 50%`, brand blue `#1A6AFF` by default; never square. Sections may override the color (e.g. orange `#FF9D2E` on dark/accent sections) but must keep the 6px circle shape. Numbered lists, check/tick lists, icon badge squares, and decorative connector dots are not bullets and are exempt.

## Service Page Template

The SEO page (`/search-engine-optimization-seo-growth-services`, Sanity ID `servicePage-seo`) is the approved structural template for all service pages. Converting a page must **never remove content** — every string, image, icon, link, button, FAQ must remain visible. Only layout order, component variants, and style props change.

### Template section order

| Slot | Component | Key variant/style props |
|------|-----------|------------------------|
| 1 | `heroSection` | `badgeStyle="partner"`, `eyebrowText` (pill w/ colored dot), `headlineHighlights`, CTA button, hero image below text, `textAlign="left"` |
| 2 | `textImageSection` | Eyebrow, heading, body, `imagePosition="right"`, bullets (divider style), no CTA |
| 3 | `challengeGridSection` | `headerLayout="inline-cta"`, `cardStyle="compact"`, `background="white"`, CTA right of heading |
| 4 | `cardGridSection` | `style="dark"`, `data-surface="dark"`, IconBadge + divider line + number per card |
| 5 | `textImageSection` | Eyebrow, heading, body, `imagePosition="left"` |
| 6 | `cardGridSection` | `style="clean"`, `headerLayout="split"`, `background="cream"`, `columns=4`, IconBadge per card |
| 7 | `statsSection` | `layout="split"`, eyebrow, heading + body left, stat cards right (3-col grid) |
| 8 | `ctaSection` | `variant="blue"`, heading + body left, CTA button right, grid background |
| 9 | `processStepsSection` | `headerLayout="split"`, `containerStyle="unified"`, eyebrow, IconBadge step numbers |
| 10 | `caseStudyCardsSection` | `headerLayout="split"`, eyebrow, chart images + bullet results |
| 11 | FAQ (hardcoded in `service-page.tsx`) | `faqEyebrow`, two-column: heading + "All questions →" link left, `FaqAccordion` right |

### Design tokens used across all slots

- **SectionHeader** component: layouts `stacked`, `split`, `inline-cta`; handles eyebrow→heading→desc spacing
- **IconBadge** component: sm/md/lg sizes; light-blue default, white on `[data-surface="dark"]`
- **Eyebrow style**: Montserrat 600, 11.5px, letter-spacing 0.1em, uppercase, `#1A6AFF`
- **Bullets**: 6px circles — `#1A6AFF` for divider style, `#FF9D2E` for stacked style
- **Spacing**: `rsp-section` base, CSS variables `--section-pad-y`, `--heading-to-desc`, `--desc-to-content`
- **Brand**: primary `#1A6AFF`, text `#111111`, muted `#5c5c5c`, bg `#F5F5F4`, borders `#E4E4E4`
- **Section backgrounds**: default `#F5F5F4`, cream `#FDF8F0`, white `#fff`, dark `#0A0A0C`
- **accentStyle**: `"brand"` (monochrome blue badges) is default; `"multi"` (multi-color badges) only on ChatGPT Ads

### Mapping rules (non-negotiable)

1. Reorder sections to follow the slot order above where the page has matching content.
2. Use the same component variant and style props as the SEO page for each slot.
3. Extra sections the SEO page doesn't have stay — placed at nearest sensible position.
4. Missing slots (page has no content for a template slot) are simply skipped — never invent copy, stats, or placeholders.
5. Page-specific sections keep their unique rendering; only surrounding header/spacing are restyled: ChatGPT Ads sponsored-placement widget + dark formats grid with orange accents, Visual Ads video showcase, Website Dev / Marketplace tech sliders.
6. All existing images, icons, charts, highlighted headline words, badge text, FAQ links, and "Talk to ... Expert" labels are preserved exactly.
7. Eyebrow and heading text are Sanity content — don't invent new eyebrows, only change style props.
8. Don't change Sanity content fields (text, images, FAQs, case studies). Only change layout/style fields (`headerLayout`, `style`, `background`, `columns`, `containerStyle`, `cardStyle`, `variant`, `tintStyle`, `layout`, `theme`, `textAlign`) and section order in `pageBuilder`.
