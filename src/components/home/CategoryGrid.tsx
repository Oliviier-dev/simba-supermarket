"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { Category } from "@/types";

const CATEGORY_GROUPS = [
  {
    key: "all",
    label: "All",
    names: null,
  },
  {
    key: "essentials",
    label: "Essentials",
    names: ["Food Products", "Cleaning & Sanitary", "General"],
  },
  {
    key: "lifestyle",
    label: "Lifestyle",
    names: [
      "Cosmetics & Personal Care",
      "Sports & Fitness",
      "Sports & Wellness",
      "Stationery",
      "Pet Care",
    ],
  },
  {
    key: "home",
    label: "Home",
    names: [
      "Kitchenware & Electronics",
      "Kitchen Storage",
      "Baby Products",
      "Alcoholic Drinks",
    ],
  },
] as const;

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const [activeGroup, setActiveGroup] = useState<(typeof CATEGORY_GROUPS)[number]["key"]>("all");

  const visible = useMemo(() => {
    const selected = CATEGORY_GROUPS.find((group) => group.key === activeGroup);
    const filtered = selected?.names
      ? categories.filter((category) => (selected.names as readonly string[]).includes(category.name))
      : categories;

    return [...filtered].sort((a, b) => b.count - a.count);
  }, [activeGroup, categories]);

  const [a, b, c, d, e] = visible;

  return (
    <section className="bg-stone-200/60 py-18 dark:bg-stone-950 sm:py-22">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-2.5 text-orange">
              <span className="h-px w-8 bg-orange/60" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">Shop By Category</span>
            </div>

            <h2 className="font-serif text-[clamp(1.8rem,4.3vw,3.2rem)] font-light leading-[0.95] tracking-tight text-stone-950 dark:text-stone-100">
              Find your essentials by
              <em className="font-semibold not-italic text-orange"> lifestyle</em>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORY_GROUPS.map((group) => {
              const active = activeGroup === group.key;
              return (
                <button
                  key={group.key}
                  onClick={() => setActiveGroup(group.key)}
                  className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                    active
                      ? "border-orange/40 bg-orange/12 text-orange"
                      : "border-stone-300 bg-stone-50 text-stone-700 hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
                  }`}
                >
                  {group.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="space-y-3">
          <div className="grid gap-3 lg:grid-cols-3">
            {a && <Tile category={a} className="lg:col-span-2" height="h-[260px] sm:h-[320px]" index={0} />}
            {b && <Tile category={b} className="lg:col-span-1" height="h-[260px] sm:h-[320px]" index={1} />}
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {c && <Tile category={c} className="lg:col-span-1" height="h-[220px] sm:h-[260px]" index={2} />}
            {d && <Tile category={d} className="lg:col-span-2" height="h-[220px] sm:h-[260px]" index={3} />}
          </div>

          {e && (
            <div className="grid gap-3 lg:grid-cols-3">
              <Tile category={e} className="lg:col-span-3" height="h-[200px] sm:h-[220px]" index={4} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Tile({
  category,
  className,
  height,
  index,
}: {
  category: Category;
  className: string;
  height: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={className}
    >
      <Link
        href={`/products?category=${encodeURIComponent(category.name)}`}
        className={`group relative block overflow-hidden rounded-xl ${height}`}
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/30 to-stone-900/8" />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="font-serif text-2xl font-medium text-white">{category.name}</h3>
          <p className="mt-1 text-sm text-white/70">{category.count} products</p>

          <p className="mt-5 inline-flex translate-y-2 items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Shop
            <ArrowRight className="h-4 w-4" />
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
