"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/products";

function generateOrderId(): string {
  return "SMB-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

type MomoStep = "phone" | "push" | "pin" | "processing" | "success";
type CodStep = "processing" | "success";

interface OrderData {
  items: Array<{ name: string; quantity: number; price: number }>;
  delivery: { fullName: string; phone: string; address: string; district: string };
  subtotal: number;
  deliveryFee: number;
  total: number;
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);
  const method = searchParams.get("method") as "momo" | "cod" | null;

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [orderId] = useState(generateOrderId);
  const [momoStep, setMomoStep] = useState<MomoStep>("phone");
  const [codStep, setCodStep] = useState<CodStep>("processing");
  const [momoPhone, setMomoPhone] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [phoneError, setPhoneError] = useState("");
  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    const raw = sessionStorage.getItem("simba-order");
    if (raw) {
      try { setOrderData(JSON.parse(raw)); } catch {}
    }
  }, []);

  // COD auto-flow: processing → success
  useEffect(() => {
    if (method === "cod" && codStep === "processing") {
      const t = setTimeout(() => {
        setCodStep("success");
        clearCart();
        sessionStorage.removeItem("simba-order");
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [method, codStep, clearCart]);

  const handleMomoPhone = () => {
    const clean = momoPhone.replace(/\D/g, "");
    if (!/^\d{10}$/.test(clean)) {
      setPhoneError("MoMo number must be exactly 10 digits (e.g. 0791787414)");
      return;
    }
    setPhoneError("");
    setMomoStep("push");
    setTimeout(() => setMomoStep("pin"), 3000);
  };

  const handlePinInput = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...pin];
    next[index] = value;
    setPin(next);
    if (value && index < 3) pinRefs[index + 1].current?.focus();
    if (next.every((d) => d !== "") && index === 3) {
      setTimeout(() => {
        setMomoStep("processing");
        setTimeout(() => {
          setMomoStep("success");
          clearCart();
          sessionStorage.removeItem("simba-order");
        }, 2000);
      }, 400);
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      pinRefs[index - 1].current?.focus();
    }
  };

  const estimatedDelivery = () => {
    const now = new Date();
    now.setHours(now.getHours() + 3);
    return now.toLocaleTimeString("en-RW", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const isSuccess =
    (method === "momo" && momoStep === "success") ||
    (method === "cod" && codStep === "success");

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-6">
          {/* Animated checkmark */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-24 h-24">
              <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-[ping_0.6s_ease-out_forwards]" />
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <h1 className="font-serif text-3xl font-bold text-[var(--fg)]">Order Placed!</h1>
              <p className="text-[var(--muted)] mt-1">
                {method === "momo" ? "Payment confirmed via MoMo." : "We'll collect payment on delivery."}
              </p>
            </div>
          </div>

          {/* Order card */}
          <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Order ID</span>
              <span className="font-mono font-bold text-orange text-sm">{orderId}</span>
            </div>

            {orderData && (
              <>
                <div className="h-px bg-[var(--border)]" />
                <div className="space-y-2">
                  {orderData.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-[var(--muted)] line-clamp-1 flex-1 mr-4">{item.name} ×{item.quantity}</span>
                      <span className="font-medium text-[var(--fg)] flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  {orderData.items.length > 3 && (
                    <p className="text-xs text-[var(--muted)]">+{orderData.items.length - 3} more items</p>
                  )}
                </div>
                <div className="h-px bg-[var(--border)]" />
                <div className="flex justify-between">
                  <span className="font-bold text-[var(--fg)]">Total Paid</span>
                  <span className="font-bold text-orange">{formatPrice(orderData.total)}</span>
                </div>
                <div className="h-px bg-[var(--border)]" />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Delivering to</span>
                    <span className="font-medium text-[var(--fg)]">{orderData.delivery.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">District</span>
                    <span className="font-medium text-[var(--fg)]">{orderData.delivery.district}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Est. delivery</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{estimatedDelivery()} today</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <Link
            href="/"
            className="block w-full h-12 bg-orange text-white rounded-xl font-semibold flex items-center justify-center hover:bg-orange-hover transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // COD processing
  if (method === "cod") {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-4 gap-6">
        <div className="w-16 h-16 rounded-full border-4 border-orange border-t-transparent animate-spin" />
        <p className="font-serif text-2xl font-bold text-[var(--fg)]">Confirming your order...</p>
        <p className="text-[var(--muted)] text-sm">Just a moment</p>
      </div>
    );
  }

  // MoMo flow
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-sm w-full">
        {/* MoMo Phone Entry */}
        {momoStep === "phone" && (
          <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center">
                <span className="text-xl font-black text-yellow-900">M</span>
              </div>
              <div>
                <p className="font-bold text-[var(--fg)]">MTN Mobile Money</p>
                <p className="text-xs text-[var(--muted)]">Enter your MoMo number</p>
              </div>
            </div>

            {orderData && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4">
                <p className="text-xs text-yellow-700 dark:text-yellow-300 font-medium">Amount to pay</p>
                <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mt-1">{formatPrice(orderData.total)}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[var(--fg)] mb-1.5">MoMo Phone Number</label>
              <input
                type="tel"
                value={momoPhone}
                onChange={(e) => { setMomoPhone(e.target.value); setPhoneError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleMomoPhone()}
                placeholder="0791787414"
                className={`w-full h-12 px-4 rounded-xl border bg-[var(--bg)] text-[var(--fg)] text-base placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-orange/40 transition-all ${
                  phoneError ? "border-red-500" : "border-[var(--border)]"
                }`}
                autoFocus
              />
              {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
            </div>

            <button
              onClick={handleMomoPhone}
              className="w-full h-12 bg-yellow-400 text-yellow-900 rounded-xl font-bold hover:bg-yellow-300 active:scale-[0.99] transition-all"
            >
              Send Payment Request
            </button>
          </div>
        )}

        {/* Push Notification Sent */}
        {momoStep === "push" && (
          <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-8 space-y-6 text-center">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />
            </div>
            <div>
              <p className="font-bold text-[var(--fg)] text-lg">Push notification sent!</p>
              <p className="text-sm text-[var(--muted)] mt-2">
                Check your phone <span className="font-medium text-[var(--fg)]">{momoPhone}</span> and approve the MoMo request.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <p className="text-xs text-yellow-700 dark:text-yellow-300">Waiting for approval...</p>
            </div>
          </div>
        )}

        {/* PIN Entry */}
        {momoStep === "pin" && (
          <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-8 space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-yellow-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <p className="font-bold text-[var(--fg)] text-lg">Enter MoMo PIN</p>
              <p className="text-xs text-[var(--muted)] mt-1">Enter your 4-digit MoMo PIN to authorize</p>
            </div>

            <div className="flex justify-center gap-3">
              {pin.map((digit, i) => (
                <input
                  key={i}
                  ref={pinRefs[i]}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinInput(i, e.target.value)}
                  onKeyDown={(e) => handlePinKeyDown(i, e)}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:border-yellow-400 transition-colors"
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <p className="text-center text-xs text-[var(--muted)]">
              Auto-submits when all 4 digits entered
            </p>
          </div>
        )}

        {/* Processing */}
        {momoStep === "processing" && (
          <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-8 space-y-6 text-center">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />
            </div>
            <div>
              <p className="font-bold text-[var(--fg)] text-lg">Processing payment...</p>
              <p className="text-sm text-[var(--muted)] mt-1">Do not close this window</p>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-[var(--muted)] mt-6">
          Secured by MTN Rwanda &middot; Simba Supermarket
        </p>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-orange border-t-transparent animate-spin" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
