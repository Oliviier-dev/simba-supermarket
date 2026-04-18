"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();

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
        className={`cart-panel fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-stone-900 shadow-2xl flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800">
          <div>
            <h2 className="font-serif text-lg font-bold text-stone-100">Your Cart</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {items.length === 0 ? "Empty" : `${items.reduce((s, i) => s + i.quantity, 0)} items`}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
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
              <div className="w-16 h-16 rounded-2xl bg-stone-800 flex items-center justify-center">
                <svg className="w-8 h-8 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <div>
                <p className="text-stone-300 font-medium text-sm">Your cart is empty</p>
                <p className="text-stone-600 text-xs mt-1">Add products to get started</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 px-5 py-2 bg-orange text-white text-sm font-medium rounded-xl hover:bg-orange-hover transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3">
                {/* Color swatch instead of broken placeholder */}
                <div className="w-14 h-14 rounded-xl bg-stone-800 flex-shrink-0 overflow-hidden flex items-center justify-center">
                  <span className="text-stone-500 text-xs text-center px-1 leading-tight line-clamp-2">
                    {item.category.split(" ")[0]}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-stone-200 text-sm font-medium leading-tight line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-orange text-sm font-bold mt-1">
                    {formatPrice(item.price)}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 bg-stone-800 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-700 transition-colors text-sm font-bold"
                      >−</button>
                      <span className="w-7 text-center text-stone-200 text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-700 transition-colors text-sm font-bold"
                      >+</button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-stone-600 hover:text-red-400 transition-colors"
                      aria-label="Remove"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>

                    <span className="ml-auto text-stone-400 text-xs">
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
          <div className="px-5 py-5 border-t border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-sm">Subtotal</span>
              <span className="text-stone-100 text-base font-bold">
                {formatPrice(totalPrice())}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center w-full h-12 bg-orange hover:bg-orange-hover text-white font-semibold rounded-xl transition-colors text-sm"
            >
              Proceed to Checkout →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
