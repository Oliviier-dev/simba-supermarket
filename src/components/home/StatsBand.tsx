"use client";

import { motion } from "framer-motion";
import { Clock3, ShieldCheck, Star, Truck } from "lucide-react";

const PROMISES = [
  {
    title: "Fast Kigali Delivery",
    description: "Track every order and get same-day delivery on most baskets.",
    icon: Truck,
  },
  {
    title: "Trusted Product Quality",
    description: "We stock only verified products sourced from trusted distributors.",
    icon: ShieldCheck,
  },
  {
    title: "Top-Rated Experience",
    description: "Families across Kigali consistently rate Simba for reliability and speed.",
    icon: Star,
  },
  {
    title: "Always On Time",
    description: "Reliable fulfillment windows so your household plans stay smooth.",
    icon: Clock3,
  },
];

export function StatsBand() {
  return (
    <section className="bg-stone-100 py-18 dark:bg-stone-900 sm:py-22">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5"
          >
            <div className="mb-3 flex items-center gap-2.5 text-orange">
              <span className="h-px w-8 bg-orange/60" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">Our Promise</span>
            </div>

            <h2 className="font-serif text-[clamp(1.8rem,4.2vw,3rem)] font-light leading-[0.95] tracking-tight text-stone-950 dark:text-stone-100">
              Why families trust
              <em className="font-semibold not-italic text-orange"> Simba</em>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base">
              We designed Simba to feel as dependable as your neighborhood store, then made it faster, clearer, and easier for mobile-first shoppers.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {PROMISES.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-2xl border border-stone-300 bg-stone-50 p-6 transition-transform duration-300 hover:-translate-y-0.5 dark:border-stone-700 dark:bg-stone-800/80"
                >
                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange/12 text-orange">
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
