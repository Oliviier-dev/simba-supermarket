# Simba Supermarket

Modern e-commerce web app for Simba Supermarket (Rwanda), built with Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, and Zustand.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Zustand
- next-themes
- lucide-react

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open http://localhost:3000

## Quality Checks

Run TypeScript check:

```bash
npm exec tsc -- --noEmit
```

Run lint:

```bash
npm run lint
```

## GitHub

Repository:

- https://github.com/Oliviier-dev/simba-supermarket

Push flow:

```bash
git add .
git commit -m "your message"
git push
```

## Deploy to Vercel

### Option A: Vercel Dashboard (recommended)

1. Go to https://vercel.com/new
2. Import `Oliviier-dev/simba-supermarket`
3. Keep defaults:
- Framework Preset: `Next.js`
- Build Command: `next build`
- Install Command: `npm install`
4. Click Deploy

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

## Notes

- The app does not require environment variables for core functionality.
- Theme is class-based and controlled via `next-themes` (`light` / `dark`).
- Product data lives in `src/data/products.json`.
