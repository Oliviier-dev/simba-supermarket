"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200 py-18 text-stone-950 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 dark:text-white sm:py-22">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.22),transparent_52%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.32),transparent_52%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange">
            <Sparkles className="h-4 w-4" />
            Ready For Your Next Basket
          </p>

          <h2 className="font-serif text-[clamp(1.8rem,4.8vw,3.8rem)] font-light leading-[0.95] tracking-tight">
            Upgrade your weekly shopping with
            <em className="font-semibold not-italic text-orange"> Simba convenience</em>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base">
            Discover a premium supermarket experience built for mobile-first households in Rwanda, with trusted products and beautifully simple checkout.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex h-12 items-center rounded-full bg-orange px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-orange-hover"
            >
              Shop Now
            </Link>

            <Link
              href="/checkout"
              className="inline-flex h-12 items-center rounded-full border border-stone-400 bg-stone-50 px-8 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 transition-colors hover:bg-white dark:border-white/30 dark:bg-transparent dark:text-white dark:hover:bg-white/8"
            >
              Go To Checkout
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
