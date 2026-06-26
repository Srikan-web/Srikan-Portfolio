# PRD — Srikan Dewasumithra Portfolio

## Original Problem Statement
Premium personal portfolio for Civil Engineer & Construction Management professional Manameldura Srikan D. Dewasumithra. White/navy/grey palette, Apple/Foster+Partners quality. Pages: Home, About, Featured Projects (5), Research, Skills, Resume, Contact. Extras: responsive, dark mode toggle, smooth scrolling, animated career timeline, interactive world map (Maldives/Kenya/Uganda/Myanmar), image gallery, SEO, sticky nav, footer with social links.

## User Choices
- Contact form: store in DB + simple admin view
- CV: placeholder PDF button
- Images: professional stock photos
- Default theme: Light (dark mode toggle)
- Contact details: professional placeholders (editable in /app/frontend/src/data/portfolio.js)

## Architecture
- Frontend: React 19 + Tailwind + shadcn/ui + framer-motion + Lenis (smooth scroll). Fonts: Outfit (heading) + Manrope (body). Theme via custom ThemeProvider (localStorage `srikan-theme`).
- Backend: FastAPI + Motor/MongoDB. Routes under /api. Contact submissions in `contact_messages`. Admin protected by `X-Admin-Key` header (ADMIN_KEY in backend/.env).
- Content is static in `/app/frontend/src/data/portfolio.js`.

## Implemented (2026-06-26)
- Single-scroll Home: Hero, About+stats, animated Timeline, Featured Projects (Tetris grid), interactive World Map (dotted, equirectangular markers + tooltips), Research, animated Skills (12), Gallery (masonry), Contact form.
- Project detail pages /projects/:id (overview, responsibilities, challenges, achievements, gallery, next-project).
- Admin /admin: key-gated message list, mark-read, delete.
- Placeholder CV PDF at /cv-srikan-dewasumithra.pdf, SEO meta tags, dark mode, sticky glass navbar, footer with social links.
- Verified end-to-end (backend 9/9 pytest, frontend flows pass).

## Backlog
- P1: Wire real contact email (Resend/SendGrid) in addition to DB.
- P1: Replace placeholders (email, phone, LinkedIn, CV PDF) with real details.
- P2: Per-project dedicated hero galleries/lightbox; blog/news section; analytics.
- P2: Rate-limiting on public /api/contact.

## Next Tasks
- Await user feedback; collect real contact info & CV to finalize.
