"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { SortControls, type SortOption } from "@/components/products/SortControls";
import type { Product } from "@/types";

const PAGE_SIZE = 20;

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const initialCategory = searchParams.get("category") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortOption>("default");
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    setPage(1);
  }, [query, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, filtered.length);
  const paginated = filtered.slice(startIndex, endIndex);

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

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
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <p className="text-xs text-[var(--muted)] sm:text-sm">
                Showing <span className="font-semibold text-[var(--fg)]">{startIndex + 1}</span>
                {" "}to <span className="font-semibold text-[var(--fg)]">{endIndex}</span>
                {" "}of <span className="font-semibold text-[var(--fg)]">{filtered.length}</span>
              </p>

              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-9 rounded-lg border border-[var(--border)] px-3 text-xs font-medium text-[var(--fg)] transition-colors hover:border-orange hover:text-orange disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Prev
                  </button>

                  {pageNumbers[0] > 1 && (
                    <>
                      <button
                        onClick={() => setPage(1)}
                        className="h-9 min-w-9 rounded-lg border border-[var(--border)] px-2 text-xs font-medium text-[var(--fg)] transition-colors hover:border-orange hover:text-orange"
                      >
                        1
                      </button>
                      {pageNumbers[0] > 2 && <span className="px-1 text-[var(--muted)]">...</span>}
                    </>
                  )}

                  {pageNumbers.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`h-9 min-w-9 rounded-lg px-2 text-xs font-semibold transition-colors ${
                        p === currentPage
                          ? "bg-orange text-white"
                          : "border border-[var(--border)] text-[var(--fg)] hover:border-orange hover:text-orange"
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  {pageNumbers[pageNumbers.length - 1] < totalPages && (
                    <>
                      {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className="px-1 text-[var(--muted)]">...</span>}
                      <button
                        onClick={() => setPage(totalPages)}
                        className="h-9 min-w-9 rounded-lg border border-[var(--border)] px-2 text-xs font-medium text-[var(--fg)] transition-colors hover:border-orange hover:text-orange"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="h-9 rounded-lg border border-[var(--border)] px-3 text-xs font-medium text-[var(--fg)] transition-colors hover:border-orange hover:text-orange disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
