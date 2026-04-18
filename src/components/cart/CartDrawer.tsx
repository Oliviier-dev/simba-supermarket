"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/products";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-overlay fixed inset-0 z-50 bg-black/40 backdrop-blur-sm ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Panel */}
      <div
        className={`cart-panel fixed top-0 right-0 z-50 h-full w-full max-w-sm shadow-2xl flex flex-col ${
          isDark ? "bg-stone-900" : "bg-white"
        } ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between border-b px-5 py-4 ${isDark ? "border-stone-800" : "border-stone-200"}`}>
          <div>
            <h2 className={`font-serif text-lg font-bold ${isDark ? "text-stone-100" : "text-stone-900"}`}>{t("cart.title")}</h2>
            <p className={`mt-0.5 text-xs ${isDark ? "text-stone-400" : "text-stone-500"}`}>
              {items.length === 0 ? t("cart.empty") : `${items.reduce((s, i) => s + i.quantity, 0)} ${t("cart.items")}`}
            </p>
          </div>
          <button
            onClick={closeCart}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
              isDark
                ? "text-stone-400 hover:bg-stone-800 hover:text-stone-100"
                : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 dark:bg-stone-800">
                <svg className="h-8 w-8 text-stone-500 dark:text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? "text-stone-100" : "text-stone-900"}`}>{t("cart.emptyTitle")}</p>
                <p className={`mt-1 text-xs ${isDark ? "text-stone-500" : "text-stone-500"}`}>{t("cart.emptyDesc")}</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 px-5 py-2 bg-orange text-white text-sm font-medium rounded-xl hover:bg-orange-hover transition-colors"
              >
                {t("cart.browse")}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3">
                {/* Color swatch instead of broken placeholder */}
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800">
                  <span className="line-clamp-2 px-1 text-center text-xs leading-tight text-stone-500 dark:text-stone-400">
                    {item.category.split(" ")[0]}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`line-clamp-2 text-sm font-medium leading-tight ${isDark ? "text-stone-100" : "text-stone-900"}`}>
                    {item.name}
                  </p>
                  <p className="text-orange text-sm font-bold mt-1">
                    {formatPrice(item.price)}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 rounded-lg bg-stone-100 p-0.5 dark:bg-stone-800">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={`flex h-6 w-6 items-center justify-center rounded-md text-sm font-bold transition-colors ${
                          isDark
                            ? "text-stone-400 hover:bg-stone-700 hover:text-stone-100"
                            : "text-stone-500 hover:bg-stone-200 hover:text-stone-900"
                        }`}
                      >−</button>
                      <span className={`w-7 text-center text-sm font-medium ${isDark ? "text-stone-100" : "text-stone-900"}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className={`flex h-6 w-6 items-center justify-center rounded-md text-sm font-bold transition-colors ${
                          isDark
                            ? "text-stone-400 hover:bg-stone-700 hover:text-stone-100"
                            : "text-stone-500 hover:bg-stone-200 hover:text-stone-900"
                        }`}
                      >+</button>
                    </div>

                    <button onClick={() => removeItem(item.id)} className="text-stone-500 transition-colors hover:text-red-500" aria-label={t("cart.remove")}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>

                    <span className={`ml-auto text-xs ${isDark ? "text-stone-400" : "text-stone-500"}`}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={`space-y-4 border-t px-5 py-5 ${isDark ? "border-stone-800" : "border-stone-200"}`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDark ? "text-stone-400" : "text-stone-500"}`}>{t("cart.subtotal")}</span>
              <span className={`text-base font-bold ${isDark ? "text-stone-100" : "text-stone-900"}`}>
                {formatPrice(totalPrice())}
              </span>
            </div>
            <div className={`flex items-center justify-between text-xs ${isDark ? "text-stone-500" : "text-stone-500"}`}>
              <span>{t("cart.delivery")}</span>
              <span>{t("cart.deliveryCalc")}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center w-full h-12 bg-orange hover:bg-orange-hover text-white font-semibold rounded-xl transition-colors text-sm"
            >
              {t("cart.proceed")} →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
