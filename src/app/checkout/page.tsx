"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { formatPrice, CATEGORY_IMAGES } from "@/lib/products";
import { useLanguage } from "@/components/providers/LanguageProvider";

const DELIVERY_FEE = 1000;

const RWANDA_DISTRICTS = [
  "Gasabo", "Kicukiro", "Nyarugenge",
  "Burera", "Gakenke", "Gicumbi", "Musanze", "Rulindo",
  "Gisagara", "Huye", "Kamonyi", "Muhanga", "Nyamagabe", "Nyanza", "Nyaruguru", "Ruhango",
  "Bugesera", "Gatsibo", "Kayonza", "Kirehe", "Ngoma", "Nyagatare", "Rwamagana",
  "Karongi", "Ngororero", "Nyabihu", "Nyamasheke", "Rubavu", "Rutsiro", "Rusizi",
];

interface DeliveryForm {
  fullName: string;
  phone: string;
  address: string;
  district: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  address?: string;
  district?: string;
}

function StepIndicator({ current, labels }: { current: number; labels: string[] }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {labels.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i < current
                  ? "bg-orange text-white"
                  : i === current
                  ? "bg-orange text-white ring-4 ring-orange/20"
                  : "bg-[var(--border)] text-[var(--muted)]"
              }`}
            >
              {i < current ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-xs font-medium ${i === current ? "text-orange" : "text-[var(--muted)]"}`}>
              {label}
            </span>
          </div>
          {i < labels.length - 1 && (
            <div className={`w-16 sm:w-24 h-px mx-2 mb-5 transition-colors ${i < current ? "bg-orange" : "bg-[var(--border)]"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CheckoutPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState<DeliveryForm>({
    fullName: "",
    phone: "",
    address: "",
    district: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "cod">("momo");

  const subtotal = totalPrice();
  const total = subtotal + DELIVERY_FEE;
  const stepLabels = [t("checkout.step.cart"), t("checkout.step.delivery"), t("checkout.step.payment")];

  const validateDelivery = (): boolean => {
    const e: FormErrors = {};
    if (!delivery.fullName.trim()) e.fullName = t("checkout.error.fullNameRequired");
    if (!delivery.phone.trim()) e.phone = t("checkout.error.phoneRequired");
    else if (!/^\d{10}$/.test(delivery.phone.replace(/\D/g, "")))
      e.phone = t("checkout.error.phoneDigits");
    if (!delivery.address.trim()) e.address = t("checkout.error.addressRequired");
    if (!delivery.district) e.district = t("checkout.error.districtRequired");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "simba-order",
        JSON.stringify({ items, delivery, subtotal, deliveryFee: DELIVERY_FEE, total })
      );
    }
    router.push(`/checkout/payment?method=${paymentMethod}`);
  };

  if (items.length === 0 && step === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-6xl">🛒</div>
        <h1 className="font-serif text-3xl font-bold text-[var(--fg)]">{t("cart.emptyTitle")}</h1>
        <p className="text-[var(--muted)] text-center">{t("checkout.emptyDesc")}</p>
        <Link
          href="/products"
          className="bg-orange text-white px-6 h-12 rounded-xl font-semibold flex items-center hover:bg-orange-hover transition-colors"
        >
          {t("cart.browse")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/products" className="text-sm text-[var(--muted)] hover:text-orange transition-colors">
            ← {t("checkout.continueShopping")}
          </Link>
          <h1 className="font-serif text-3xl font-bold text-[var(--fg)] mt-2">{t("checkout.title")}</h1>
        </div>

        <StepIndicator current={step} labels={stepLabels} />

        {/* Step 0: Cart Review */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--border)]">
                <h2 className="font-semibold text-[var(--fg)]">
                  {t("checkout.yourItems")} ({items.reduce((s, i) => s + i.quantity, 0)})
                </h2>
              </div>

              <ul className="divide-y divide-[var(--border)]">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0">
                      <Image
                        src={item.image || CATEGORY_IMAGES[item.category] || ""}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--fg)] line-clamp-2">{item.name}</p>
                      <p className="text-xs text-[var(--muted)] mt-0.5">{item.unit}</p>
                      <p className="text-sm font-bold text-orange mt-1">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center border border-[var(--border)] rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[var(--muted)] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-[var(--fg)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[var(--muted)] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-[var(--muted)] hover:text-red-500 transition-colors"
                        aria-label={t("cart.remove")}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-sm font-bold text-[var(--fg)] w-24 text-right flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order summary */}
            <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-6 space-y-3">
              <h2 className="font-semibold text-[var(--fg)] mb-4">{t("checkout.orderSummary")}</h2>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">{t("cart.subtotal")}</span>
                <span className="font-medium text-[var(--fg)]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">{t("checkout.deliveryFee")}</span>
                <span className="font-medium text-[var(--fg)]">{formatPrice(DELIVERY_FEE)}</span>
              </div>
              <div className="h-px bg-[var(--border)]" />
              <div className="flex justify-between">
                <span className="font-bold text-[var(--fg)]">{t("checkout.total")}</span>
                <span className="font-bold text-xl text-orange">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full h-12 bg-orange text-white rounded-xl font-semibold hover:bg-orange-hover active:scale-[0.99] transition-all"
            >
              {t("checkout.continueDelivery")}
            </button>
          </div>
        )}

        {/* Step 1: Delivery Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-6 space-y-5">
              <h2 className="font-semibold text-[var(--fg)]">{t("checkout.deliveryDetails")}</h2>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-[var(--fg)] mb-1.5">
                  {t("checkout.fullName")}
                </label>
                <input
                  type="text"
                  value={delivery.fullName}
                  onChange={(e) => {
                    setDelivery((d) => ({ ...d, fullName: e.target.value }));
                    if (errors.fullName) setErrors((e) => ({ ...e, fullName: undefined }));
                  }}
                  placeholder={t("checkout.fullNamePlaceholder")}
                  className={`w-full h-11 px-4 rounded-xl border bg-[var(--bg)] text-[var(--fg)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-orange/40 transition-all ${
                    errors.fullName ? "border-red-500" : "border-[var(--border)]"
                  }`}
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-[var(--fg)] mb-1.5">
                  {t("checkout.phone")}
                </label>
                <input
                  type="tel"
                  value={delivery.phone}
                  onChange={(e) => {
                    setDelivery((d) => ({ ...d, phone: e.target.value }));
                    if (errors.phone) setErrors((e) => ({ ...e, phone: undefined }));
                  }}
                  placeholder={t("checkout.phonePlaceholder")}
                  className={`w-full h-11 px-4 rounded-xl border bg-[var(--bg)] text-[var(--fg)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-orange/40 transition-all ${
                    errors.phone ? "border-red-500" : "border-[var(--border)]"
                  }`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-[var(--fg)] mb-1.5">
                  {t("checkout.district")}
                </label>
                <select
                  value={delivery.district}
                  onChange={(e) => {
                    setDelivery((d) => ({ ...d, district: e.target.value }));
                    if (errors.district) setErrors((e) => ({ ...e, district: undefined }));
                  }}
                  className={`w-full h-11 px-4 rounded-xl border bg-[var(--bg)] text-[var(--fg)] text-sm focus:outline-none focus:ring-2 focus:ring-orange/40 transition-all appearance-none ${
                    errors.district ? "border-red-500" : "border-[var(--border)]"
                  }`}
                >
                  <option value="">{t("checkout.selectDistrict")}</option>
                  {RWANDA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.district && <p className="text-xs text-red-500 mt-1">{errors.district}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-[var(--fg)] mb-1.5">
                  {t("checkout.address")}
                </label>
                <textarea
                  value={delivery.address}
                  onChange={(e) => {
                    setDelivery((d) => ({ ...d, address: e.target.value }));
                    if (errors.address) setErrors((e) => ({ ...e, address: undefined }));
                  }}
                  placeholder={t("checkout.addressPlaceholder")}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border bg-[var(--bg)] text-[var(--fg)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-orange/40 transition-all resize-none ${
                    errors.address ? "border-red-500" : "border-[var(--border)]"
                  }`}
                />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(0)}
                className="flex-1 h-12 border border-[var(--border)] text-[var(--fg)] rounded-xl font-semibold hover:border-orange hover:text-orange transition-colors"
              >
                {t("checkout.back")}
              </button>
              <button
                onClick={() => { if (validateDelivery()) setStep(2); }}
                className="flex-1 h-12 bg-orange text-white rounded-xl font-semibold hover:bg-orange-hover active:scale-[0.99] transition-all"
              >
                {t("checkout.continuePayment")}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-6 space-y-4">
              <h2 className="font-semibold text-[var(--fg)]">{t("checkout.choosePayment")}</h2>

              {/* MoMo option */}
              <button
                onClick={() => setPaymentMethod("momo")}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  paymentMethod === "momo"
                    ? "border-orange bg-orange/5"
                    : "border-[var(--border)] hover:border-stone-300 dark:hover:border-stone-600"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-black text-yellow-900">M</span>
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-[var(--fg)]">{t("checkout.momo")}</p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{t("checkout.momoDesc")}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  paymentMethod === "momo" ? "border-orange" : "border-[var(--border)]"
                }`}>
                  {paymentMethod === "momo" && <div className="w-2.5 h-2.5 rounded-full bg-orange" />}
                </div>
              </button>

              {/* COD option */}
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  paymentMethod === "cod"
                    ? "border-orange bg-orange/5"
                    : "border-[var(--border)] hover:border-stone-300 dark:hover:border-stone-600"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-[var(--fg)]">{t("checkout.cod")}</p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{t("checkout.codDesc")}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  paymentMethod === "cod" ? "border-orange" : "border-[var(--border)]"
                }`}>
                  {paymentMethod === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-orange" />}
                </div>
              </button>
            </div>

            {/* Order recap */}
            <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-6 space-y-3">
              <h2 className="font-semibold text-[var(--fg)] mb-3">{t("checkout.orderRecap")}</h2>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">{t("checkout.items")} ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span className="font-medium text-[var(--fg)]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">{t("checkout.deliveryTo")} {delivery.district}</span>
                <span className="font-medium text-[var(--fg)]">{formatPrice(DELIVERY_FEE)}</span>
              </div>
              <div className="h-px bg-[var(--border)]" />
              <div className="flex justify-between">
                <span className="font-bold text-[var(--fg)]">{t("checkout.total")}</span>
                <span className="font-bold text-xl text-orange">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 h-12 border border-[var(--border)] text-[var(--fg)] rounded-xl font-semibold hover:border-orange hover:text-orange transition-colors"
              >
                {t("checkout.back")}
              </button>
              <button
                onClick={handlePlaceOrder}
                className="flex-1 h-12 bg-orange text-white rounded-xl font-semibold hover:bg-orange-hover active:scale-[0.99] transition-all"
              >
                {t("checkout.placeOrder")} →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
