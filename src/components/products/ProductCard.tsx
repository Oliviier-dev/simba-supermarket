"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { formatPrice, CATEGORY_IMAGES } from "@/lib/products";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const imageSrc = product.image || CATEGORY_IMAGES[product.category] || "";

  return (
    <div className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col hover:shadow-lg hover:shadow-stone-200/60 dark:hover:shadow-stone-900/60 hover:border-orange/30 transition-all duration-300">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-stone-100 dark:bg-stone-800">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 bg-white dark:bg-stone-900 px-3 py-1 rounded-full">
              Out of stock
            </span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <span className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
          {product.category}
        </span>
        <Link href={`/products/${product.id}`}>
          <p className="text-[var(--fg)] text-sm font-medium leading-snug line-clamp-2 hover:text-orange transition-colors min-h-[2.6rem]">
            {product.name}
          </p>
        </Link>
        <p className="text-xs text-[var(--muted)] mt-1">{product.unit}</p>

        <div className="flex items-center justify-between mt-auto pt-3 gap-2">
          <span className="text-orange font-bold text-base">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-3 h-8 rounded-xl text-xs font-semibold transition-all duration-200 ${
              added
                ? "bg-green-500 text-white"
                : "bg-orange/10 text-orange hover:bg-orange hover:text-white active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            }`}
          >
            {added ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
