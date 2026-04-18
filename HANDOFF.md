# Simba Supermarket — Agent Handoff Context

## What This Project Is

We are building a **modern e-commerce web app** for Simba Supermarket (Rwanda's most popular online supermarket) as part of a competition. The goal is to rebuild their outdated site as a fast, beautiful, fully functional shopping experience — and **win the competition**.

Grading breakdown:
- Functionality: 30pts
- Product Thinking: 25pts
- UI/UX Quality: 25pts
- Code Quality: 20pts

**We are targeting 100/100. All bonus features are included.**

---

## Repository Location

```
C:\Users\yuppie\Dev\simba-app
```

---

## Tech Stack

- **Next.js 15** with App Router + TypeScript
- **Tailwind CSS v4** with custom design tokens
- **Framer Motion** — animations
- **Zustand** — cart state (persisted to localStorage)
- **lucide-react** — icons (just installed)
- **next-themes** — dark mode
- **Deployment:** Vercel (not yet deployed)

---

## Design Direction — CRITICAL

### Color Palette (DO NOT CHANGE — Simba's own palette)
```css
--color-orange: #f97316       /* primary accent */
--color-orange-hover: #ea6c0a
--bg light: #fafaf9
--bg dark: #1c1917
--fg light: #1c1917
--fg dark: #f5f5f4
--surface light: #ffffff
--surface dark: #292524
--muted light: #78716c
--muted dark: #a8a29e
--border light: #e7e5e4
--border dark: #44403c
/* stone scale used throughout */
```

### Fonts
- Headings: `Playfair Display` via `--font-playfair` / `.font-serif`
- Body: `Plus Jakarta Sans` via `--font-jakarta` / `font-sans`

### UI Design Language — AMEKI MEUBLES STYLE
The entire UI should be redesigned to match the aesthetic of **https://ameki-meubles.vercel.app/en** but keeping Simba's own color palette above.

Reference source: `C:\Users\yuppie\Dev\meubles\ameki-meubles\src`

Key ameki patterns to adopt (substituting their walnut/gold/cream with our orange/stone):
- **Nav**: transparent on hero → frosted glass on scroll (`bg-white/80 backdrop-blur-md`), uppercase tracking-widest text links, animated underline indicator, rounded-full "Shop Now" CTA, full-screen mobile slide-in drawer with Framer Motion
- **Section eyebrows**: `<span class="h-px w-8 bg-orange/60" /> LABEL` uppercase tiny text before headings
- **Headlines**: `text-[clamp(X,Yvw,Z)] font-light tracking-tight` with `<em class="font-semibold not-italic">` emphasis
- **Hero**: full-viewport (`min-h-screen`), full-bleed image, dark gradient overlay, eyebrow + clamp h1 + stats row with orange left-border
- **Product cards**: `rounded-md bg-white shadow-sm hover:shadow-md`, `aspect-4/3` image, price in orange, "See details" link with ChevronRight
- **Category mosaic**: `lg:col-span-2` wide tiles + `lg:col-span-1` narrow tiles, dark gradient overlay on image, hover-reveal "Shop" text in orange + ArrowRight
- **Promise cards**: `rounded-2xl border bg-white/85 p-6 hover:-translate-y-0.5`, icon in orange circle, title + description
- **Testimonials**: AnimatePresence slideVariants carousel, Quote icon, star ratings, dot pills + arrow buttons
- **CTA section**: `bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900`, radial glow, orange gold accent badges, two rounded-full buttons
- **Footer**: `bg-stone-900` (charcoal), `Simba<em class="text-orange">Market</em>` logo, multi-column links, contact info with lucide icons, social icon circles

---

## Current State — What Is Built (Phases 1 & 2 COMPLETE)

### Phase 1 — Foundation ✅
All files exist and work:

| File | Status |
|------|--------|
| `src/app/layout.tsx` | ✅ Done |
| `src/app/globals.css` | ✅ Done (Tailwind v4 @theme tokens) |
| `src/types/index.ts` | ✅ Done (`Product`, `CartItem`, `Category`) |
| `src/data/products.json` | ✅ Done (552 products, 9 categories) |
| `src/lib/products.ts` | ✅ Done (all utility fns + `CATEGORY_IMAGES` + `formatPrice`) |
| `src/store/cart.ts` | ✅ Done (Zustand, persisted) |
| `src/components/providers/ThemeProvider.tsx` | ✅ Done |
| `src/components/ui/Button.tsx` | ✅ Done |
| `src/components/ui/Badge.tsx` | ✅ Done |
| `src/components/layout/Nav.tsx` | ⚠️ **NEEDS REDESIGN** (see below) |
| `src/components/layout/Footer.tsx` | ⚠️ **NEEDS REDESIGN** (see below) |
| `src/components/layout/CartIcon.tsx` | ✅ Done |
| `src/components/cart/CartDrawer.tsx` | ✅ Done |
| `src/components/home/Hero.tsx` | ⚠️ **NEEDS REDESIGN** (see below) |
| `src/components/home/CategoryGrid.tsx` | ⚠️ **NEEDS REDESIGN** (see below) |
| `src/components/home/FeaturedProducts.tsx` | ⚠️ **NEEDS REDESIGN** (see below) |
| `src/components/home/ReviewsSection.tsx` | ⚠️ **NEEDS REDESIGN** (see below) |
| `src/components/home/StatsBand.tsx` | ⚠️ **NEEDS REDESIGN** (see below) |
| `src/components/products/ProductCard.tsx` | ✅ Done (minor style update welcome) |
| `src/components/products/CategoryFilter.tsx` | ✅ Done |
| `src/components/products/SortControls.tsx` | ✅ Done |
| `src/app/page.tsx` | ⚠️ **NEEDS REDESIGN** (home page sections) |
| `src/app/products/page.tsx` | ✅ Done |
| `src/app/products/ProductsClient.tsx` | ✅ Done |

### Phase 2 — Product Detail + Checkout ✅
All files exist and are complete:

| File | Status |
|------|--------|
| `src/app/products/[id]/page.tsx` | ✅ Done (server component, `generateStaticParams`) |
| `src/app/products/[id]/AddToCartSection.tsx` | ✅ Done (qty selector + add to cart) |
| `src/app/checkout/page.tsx` | ✅ Done (3-step: cart review → delivery form → payment selection) |
| `src/app/checkout/payment/page.tsx` | ✅ Done (MoMo flow: phone → push → PIN → processing → success; COD path) |

---

## The Task Right Now — UI Redesign (Ameki Style)

The **current Nav and home page sections look generic**. The user wants the UI redesigned to match ameki-meubles exactly (layout, patterns, animations) while keeping Simba's colors.

### What needs to be rebuilt:

#### 1. `src/components/layout/Nav.tsx` — REPLACE ENTIRELY
Current: sticky, generic search bar nav.
Target: 
- `fixed` positioning (not sticky)
- Transparent on home hero, `bg-white/80 backdrop-blur-md` on scroll or other pages
- Logo: `Simba<em class="text-orange font-light">Market</em>` tracking-[0.22em] uppercase
- Desktop links with Framer Motion `layoutId="nav-underline"` animated indicator
- Rounded-full "Shop Now" CTA button (orange)
- Theme toggle (Sun/Moon lucide icons)
- Cart icon with badge (ShoppingCart from lucide)
- Mobile: AnimatePresence full-screen drawer from right, with staggered nav link animations

#### 2. `src/app/page.tsx` + home sections — REPLACE ENTIRELY
Current: has Hero, CategoryGrid, FeaturedProducts, ReviewsSection, StatsBand.
Target sections in order:
1. **HeroSection** — full-viewport, HERO_IMAGE background, `bg-gradient-to-r from-stone-900/88 via-stone-900/58 to-stone-900/8`, eyebrow line + label, clamp h1 with `<em>` emphasis in orange, description, two rounded-full CTAs, stats row (552+ Products, 9 Categories, Same-day Delivery) with orange left-border
2. **FeaturedProductsSection** — white bg, eyebrow, clamp h2, 3-col product cards (ameki card style: `rounded-md shadow-sm hover:shadow-md`, `aspect-4/3`, name + price in orange + "View Details" ChevronRight link), "View all" link top-right
3. **ShopByCategorySection** — stone-50 bg, mosaic grid (2+1 / 1+2 pattern with col-span), category image tiles with dark overlay, hover-reveal orange "Shop" + ArrowRight text, style filter pills at top-right
4. **WhySimbaSectionSection** — white bg, 12-col layout (5 left copy + 7 right 2×2 cards), promise cards with orange icon circles (Truck, ShieldCheck, Star, Clock from lucide), "Why families trust Simba" headline
5. **TestimonialsSection** — stone-50 bg, AnimatePresence carousel, Quote icon, star ratings (fill-orange), dot pills + ← → arrow buttons, auto-advance 6s
6. **CtaSection** — `bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900`, radial orange glow overlay, Sparkles badge, clamp h2 with orange `<em>`, two rounded-full buttons (orange primary + white outline secondary)

#### 3. `src/components/layout/Footer.tsx` — REPLACE ENTIRELY
Target:
- `bg-stone-900` background
- Logo: `Simba<em class="text-orange font-light">Market</em>`
- Left col: tagline, contact (MapPin, Phone, Mail from lucide with orange/70 icons), social circles
- Right: 3 link columns — Shop (by category), Company (About, Contact), Legal
- Bottom bar: copyright + Privacy/Terms links
- All text in `text-white/45` → hover `text-white`, border `border-white/8`

---

## Products Dataset

```
src/data/products.json
Shape: { store: {...}, products: Product[] }
Product: { id, name, price, category, subcategoryId, inStock, image, unit }
```

**Real categories** (use these exact strings):
- "Cosmetics & Personal Care"
- "Alcoholic Drinks"
- "Food Products"
- "Kitchenware & Electronics"
- "Cleaning & Sanitary"
- "General"
- "Sports & Fitness"
- "Stationery"
- "Baby Products"

Category images are in `CATEGORY_IMAGES` in `src/lib/products.ts`.
`formatPrice(n)` → `"2,500 RWF"`.
`HERO_IMAGE` → Rwandan market Unsplash URL, also in `src/lib/products.ts`.

---

## Important Notes

- **Keep Simba's color palette** — do NOT introduce walnut/cream/gold/charcoal as new CSS variables. Map ameki colors to our existing tokens: walnut→orange, charcoal→stone-900, cream→stone-50, gold→orange.
- **Mobile-first** — Rwanda context, most users on mobile.
- **No TypeScript errors** — `npx tsc --noEmit` should pass clean.
- **`layout.tsx`** adds `<Nav />` and `<Footer />` and `<CartDrawer />` globally — home page only renders the section content in `<main>`.
- **Home page `page.tsx`** is a **server component** — only the individual section components that need interactivity (carousel, add-to-cart) should be `"use client"`.
- The home `page.tsx` calls `getFeaturedProducts(6)` and `getAllCategories()` and passes data down as props.
- framer-motion `whileInView` + `viewport={{ once: true }}` for scroll-triggered animations on sections below the fold.
- Do NOT add i18n (next-intl) — the project does not use it. All strings are hardcoded in English.
- Do NOT change the checkout or product detail pages — those are done and working.

---

## Phase 3 (After UI Redesign) — Not Started

- Dark mode polish across all new components
- Framer Motion page transitions
- Mobile QA (375px, 390px, 768px)
- `next/image` `sizes` and `priority` optimization
- `generateStaticParams` already done on product detail
- Vercel deployment + GitHub push
