"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { SortControls, type SortOption } from "@/components/products/SortControls";
import type { Product } from "@/types";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const initialCategory = searchParams.get("category") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortOption>("default");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    setCategory(searchParams.get("category") ?? "");
  }, [searchParams]);

  const all = getAllProducts();

  const filtered = useMemo(() => {
    let result: Product[] = all;

    if (category) result = result.filter((p) => p.category === category);

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [all, query, category, sort]);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-px bg-orange" />
            <span className="text-orange text-xs font-semibold tracking-widest uppercase">
              Our Products
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--fg)]">
            {category || "All Products"}
          </h1>
          {query && (
            <p className="text-[var(--muted)] text-sm mt-1">
              Results for &ldquo;<span className="text-[var(--fg)] font-medium">{query}</span>&rdquo;
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Search bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search within products..."
              className="w-full h-10 pl-10 pr-4 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-xl outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 text-[var(--fg)] placeholder:text-[var(--muted)] transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--fg)]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-6">
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        {/* Sort + count */}
        <div className="mb-6">
          <SortControls value={sort} onChange={setSort} count={filtered.length} />
        </div>

        {/* Grid or empty state */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </div>
            <div>
              <p className="text-[var(--fg)] font-semibold">No products found</p>
              <p className="text-[var(--muted)] text-sm mt-1">Try a different search term or category</p>
            </div>
            <button
              onClick={() => { setQuery(""); setCategory(""); }}
              className="mt-2 px-5 py-2 bg-orange text-white text-sm font-medium rounded-xl hover:bg-orange-hover transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
