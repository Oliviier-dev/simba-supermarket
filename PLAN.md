# Simba Supermarket — Implementation Plan

## Phase 1: Foundation & Core Shopping Experience

### 1.1 Project Setup
- Initialize Next.js 15 with App Router, TypeScript, Tailwind CSS
- Configure custom design tokens (colors, fonts, spacing) in `tailwind.config`
- Install dependencies: Framer Motion, Zustand, next-intl, next-themes
- Set up folder structure: `components/`, `lib/`, `store/`, `messages/`, `public/`

### 1.2 Data Layer
- Copy `simba_products.json` into the project
- Define TypeScript types: `Product`, `Category`, `CartItem`
- Write utility functions: `getProductsByCategory`, `searchProducts`, `getProductById`
- Group and count products per category

### 1.3 Design System
- Define CSS variables for light and dark themes (warm palette)
- Typography setup: Inter + DM Serif Display via `next/font`
- Reusable primitives: `Button`, `Badge`, `Skeleton`, `Container`
- Dark mode toggle wired to `next-themes` with localStorage persistence

### 1.4 Layout & Navigation
- Sticky top nav: logo, search bar, language switcher, dark mode toggle, cart icon with item count badge
- Mobile nav: hamburger menu with slide-in drawer
- Footer: simple, clean

### 1.5 Home Page (`/`)
- Hero section: bold headline, search CTA, background category image
- Category grid: 9 cards with curated Unsplash images per category
- "Featured Products" row: top 8 products across categories

### 1.6 Product Listing Page (`/products`)
- Category filter pills (horizontal scroll on mobile)
- Sort controls: price low→high, high→low, default
- Live client-side search (instant, no debounce delay)
- Product card grid: image, name, price in RWF, "Add to Cart" button
- Empty state for no search results

### 1.7 Cart
- Zustand store: add, remove, update quantity, clear cart
- Slide-out cart drawer from the right (accessible on every page)
- Item list with quantity controls, subtotal per item, grand total
- "Proceed to Checkout" CTA at the bottom
- Cart icon pulses animation when item is added

---

## Phase 2: Product Detail, Checkout & MoMo Payment

### 2.1 Product Detail Page (`/products/[id]`)
- Breadcrumb: Home → Category → Product name
- Large product image (category Unsplash photo as fallback)
- Product name, price in RWF (formatted with commas), category badge
- "Add to Cart" button with quantity selector
- Related products row: 4 products from same category

### 2.2 Checkout Flow (`/checkout`)
Step 1 — Cart Review
- List of cart items with quantities and prices
- Editable quantities, remove items
- Order subtotal + delivery fee (flat 1,000 RWF) + total

Step 2 — Delivery Info
- Form: Full name, phone number, delivery address, district dropdown (Rwanda districts)
- Client-side validation with inline error messages

Step 3 — Payment Selection
- Two options: MoMo (primary, highlighted) and Cash on Delivery
- "Place Order" button leads to payment screen

### 2.3 MoMo Payment Screen (`/checkout/payment`)
- Realistic MTN MoMo UI flow:
  1. Enter MoMo phone number
  2. "Push notification sent" loading state with spinner
  3. PIN entry screen (4-digit masked input)
  4. Processing animation (2s)
  5. Success screen: checkmark animation, order number, estimated delivery
- Cash on Delivery path: straight to success screen

### 2.4 Order Confirmation
- Order summary card with all items
- Delivery details recap
- Randomly generated order ID
- "Continue Shopping" button that clears cart and returns home

---

## Phase 3: i18n, Dark Mode Polish, Images & Deployment

### 3.1 Internationalisation (EN / FR / Kinyarwanda)
- Configure `next-intl` with locale routing (`/en`, `/fr`, `/rw`)
- Translation files: `messages/en.json`, `messages/fr.json`, `messages/rw.json`
- Translate all UI strings: nav, buttons, headings, form labels, error messages, checkout steps
- Language switcher in nav updates locale and persists to cookie
- Product names and prices stay as-is from the dataset

### 3.2 Dark Mode
- Warm dark palette: `#1C1917` background, `#F5F5F4` text, `#F97316` accent unchanged
- All components audited for dark mode correctness (no harsh white flashes)
- System preference respected on first load, manual toggle persists

### 3.3 Product Images
- Map curated Unsplash photos to all 9 categories:
  - Beverages → drinks/bar photo
  - Fresh Produce → market vegetables
  - Dairy → dairy shelf
  - Bakery → bread/pastries
  - Meat & Seafood → butcher/fish market
  - Household → cleaning products
  - Personal Care → bathroom shelf
  - Snacks → snack display
  - Baby & Kids → baby products
- Home page hero: vibrant Rwandan market photo
- Product cards use category image as fallback with a subtle overlay

### 3.4 Animations & Polish
- Framer Motion: page transitions, card hover lift, cart drawer slide, search expand
- Staggered product grid load animation on first render
- MoMo success screen: animated checkmark with confetti burst
- Smooth category filter transition (items animate out/in on filter change)
- Loading skeletons for any async state

### 3.5 Mobile QA
- Test all pages at 375px (iPhone SE), 390px (iPhone 14), 768px (tablet)
- Horizontal scroll check on category pills and related products row
- Touch targets minimum 44px on all interactive elements
- Keyboard navigation for accessibility

### 3.6 Performance
- `next/image` for all images with proper `sizes` and `priority` on hero
- Static generation for all product pages (`generateStaticParams`)
- Bundle size check — no unnecessary large dependencies

### 3.7 Deployment
- Push to GitHub repository
- Connect to Vercel, configure environment (none needed — all static data)
- Set default locale redirect
- Verify public URL loads correctly on mobile
- Submit URL

---

## Scoring Checklist

| Criteria | Max | Our Target |
|----------|-----|------------|
| Functionality (all requirements working) | 30 | 30 |
| Product Thinking (real UX problem solved) | 25 | 25 |
| UI/UX Quality (clean, modern, usable) | 25 | 25 |
| Code Quality (structure & AI usage) | 20 | 20 |
| **Total** | **100** | **100** |

### Bonus Features Included
- [x] Checkout flow
- [x] MoMo payment integration
- [x] 3 languages (EN, FR, Kinyarwanda)
- [x] Product detail page
- [x] Dark mode
- [x] Great product images (Unsplash/Pexels)
