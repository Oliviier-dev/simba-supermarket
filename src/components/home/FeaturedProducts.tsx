"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CATEGORY_IMAGES, formatPrice } from "@/lib/products";
import type { Product } from "@/types";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const { t } = useLanguage();

  return (
    <section className="bg-stone-100 py-18 dark:bg-stone-900 sm:py-22">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2.5 text-orange">
              <span className="h-px w-8 bg-orange/60" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">{t("home.featured.eyebrow")}</span>
            </div>
            <h2 className="font-serif text-[clamp(1.8rem,4.5vw,3.45rem)] font-light leading-[0.95] tracking-tight text-stone-950 dark:text-stone-100">
              {t("home.featured.titleStart")}
              <em className="font-semibold not-italic text-orange"> {t("home.featured.titleEm")}</em>
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700 transition-colors hover:text-orange dark:text-stone-400"
          >
            {t("home.featured.viewAll")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { t } = useLanguage();
  const categoryImage = CATEGORY_IMAGES[product.category] ?? "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800";

  return (
    <article className="group overflow-hidden rounded-md border border-stone-300 bg-stone-50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-stone-700 dark:bg-stone-800/90 dark:shadow-none">
      <Link href={`/products/${product.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={categoryImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="space-y-2 p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-stone-950 transition-colors group-hover:text-stone-700 dark:text-stone-100 dark:group-hover:text-stone-300">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between text-sm">
          <p className="font-semibold text-orange">{formatPrice(product.price)}</p>
          <p className="text-xs text-stone-500 dark:text-stone-400">{product.unit}</p>
        </div>

        <Link href={`/products/${product.id}`} className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700 transition-colors group-hover:text-orange dark:text-stone-300">
          {t("home.featured.viewDetails")}
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
