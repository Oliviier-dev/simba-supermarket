"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";

export function CartIcon() {
  const openCart = useCartStore((s) => s.openCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const [count, setCount] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const next = totalItems();
    if (next > count && count >= 0) {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }
    setCount(next);
  }, [totalItems()]);

  return (
    <button
      onClick={openCart}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[var(--muted)] hover:text-[var(--fg)] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      aria-label="Open cart"
    >
      <svg
        className={`w-5 h-5 transition-transform duration-200 ${pulse ? "scale-125" : "scale-100"}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
      {count > 0 && (
        <span
          className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center transition-transform ${pulse ? "scale-125" : "scale-100"}`}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
