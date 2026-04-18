import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsClient />
    </Suspense>
  );
}

function ProductsSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <div className="h-4 w-24 bg-stone-200 dark:bg-stone-700 rounded mb-3 animate-pulse" />
          <div className="h-10 w-48 bg-stone-200 dark:bg-stone-700 rounded animate-pulse" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-stone-100 dark:bg-stone-800 animate-pulse aspect-square" />
          ))}
        </div>
      </div>
    </div>
  );
}
