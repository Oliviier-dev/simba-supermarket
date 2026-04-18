"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";

export function AddToCartSection({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const items = useCartStore((s) => s.items);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const cartItem = items.find((i) => i.id === product.id);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="space-y-4">
      {cartItem && (
        <p className="text-sm text-[var(--muted)]">
          Already in cart:{" "}
          <span className="font-semibold text-orange">{cartItem.quantity}</span>
        </p>
      )}

      <div className="flex items-center gap-3">
        <div className="flex items-center border border-[var(--border)] rounded-xl overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-[var(--muted)] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          </button>
          <span className="w-10 text-center text-sm font-semibold text-[var(--fg)]">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-[var(--muted)] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${
            added
              ? "bg-green-500 text-white"
              : "bg-orange text-white hover:bg-orange-hover"
          }`}
        >
          {added ? "Added to cart!" : product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>

      {cartItem && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
            className="text-xs text-[var(--muted)] hover:text-red-500 transition-colors"
          >
            Remove one from cart
          </button>
        </div>
      )}
    </div>
  );
}
