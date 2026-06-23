# Zoomx Frontend

Marketing site for **Zoomx** — built on Next.js 16 (App Router), React 19, Tailwind v4, shadcn/ui, and Framer Motion.

---

## Tech Stack

| Layer        | Tool                                         |
| ------------ | -------------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI runtime   | React 19                                     |
| Styling      | Tailwind CSS v4                              |
| Components   | shadcn/ui (Radix primitives)                 |
| Animation    | Framer Motion 12                             |
| Icons        | lucide-react                                 |
| Lottie       | lottie-react                                 |
| Number ticks | @number-flow/react                           |
| Language     | TypeScript                                   |

---

## Getting Started

```bash
# install
npm install

# dev (runs on http://localhost:4002)
npm run dev

# production build
npm run build
npm run start

# lint
npm run lint
```

### Requirements

- Node.js 20+
- npm 10+

---

## Project Structure

```
src/
├── app/
│   ├── (root)/              # route group: home, blog, case-study pages
│   ├── globals.css          # Tailwind + design tokens + .app-container
│   └── layout.tsx           # root layout, fonts, metadata
├── components/
│   ├── card/                # reusable card components (BlogCard, CaseStudyCard)
│   ├── pages/               # page-specific sections (home/, blog/, case-study/)
│   ├── shared/              # cross-page primitives (PageHero, CtaSection, Image, Pagination)
│   └── ui/                  # shadcn primitives (Button, Input)
├── data/                    # static JSON content (blog.json, case-study.json)
├── hooks/                   # custom React hooks
└── lib/                     # utilities (cn, embed-url, etc.)
public/
├── images/                  # static images
├── video/                   # static videos
├── lottie/                  # lottie animations
└── footer/                  # footer assets
```

---

## Conventions

### Layout container

Use the global `.app-container` class for centered, padded sections:

```tsx
<div className="app-container">…</div>
```

It already includes `mx-auto`, `width: 100%`, `max-width: 1100px`, and responsive horizontal padding (10px mobile → 32px ≥ 768px). Don't add `mx-auto`/`px-*` on top.

### Buttons

Use the shared `Button` from `@/components/ui/button` with the `brand` / `brandOutline` variants and `cta` size for CTAs:

```tsx
<Button href="/contact" variant="brand" size="cta">
  Book A Call
  <ArrowUpRight />
</Button>
```

`href` makes it render as an `<a>`. Icon is optional — just include any lucide icon as a child.

### Images

Always use the shared `Image` component (`@/components/shared/Image`) instead of `<img>` — it wraps `next/image` with sensible defaults.

```tsx
<div className="relative h-11 w-11 overflow-hidden rounded-full">
  <Image src={avatarUrl} alt={name} sizes="44px" />
</div>
```

Add the image host to `next.config.ts → images.remotePatterns` before referencing a new external domain.

### Data

Page content lives in JSON under `src/data/`. Pages import these and pass them to components, so copy edits don't require code changes.

---

## Important: Next.js 16

This project uses Next.js 16, which has breaking changes from earlier versions. Before writing new framework code, consult the bundled docs:

```
node_modules/next/dist/docs/01-app/
```

Don't assume APIs and conventions from older Next.js versions still apply.

---

## Deployment

The build outputs static pages where possible (`○ (Static)`):

```
Route (app)
├ ○ /
├ ○ /blog
└ ○ /case-study
```

Deploy to Vercel or any host that runs `next start`.
