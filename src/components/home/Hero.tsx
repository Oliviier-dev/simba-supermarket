import Link from "next/link";
import Image from "next/image";
import { HERO_IMAGE } from "@/lib/products";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Fresh produce at a Kigali market"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/88 via-stone-900/58 to-stone-900/8" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:pt-36">
        <div className="max-w-3xl">
          <div className="mb-7 flex items-center gap-3 text-orange">
            <span className="h-px w-8 bg-orange/60" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em]">Rwanda's Finest Online Market</p>
          </div>

          <h1 className="font-serif text-[clamp(2.25rem,6.4vw,5.9rem)] font-light leading-[0.95] tracking-tight text-white">
            Shop essentials,
            <br />
            <em className="font-semibold not-italic text-orange">fast delivery.</em>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-200 sm:text-lg">
            From fresh pantry staples to household must-haves, Simba brings 552+ trusted products to your doorstep with a premium digital shopping experience.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="inline-flex h-12 items-center rounded-full bg-orange px-7 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-orange-hover"
            >
              Shop Products
            </Link>

            <Link
              href="/products?category=Food%20Products"
              className="inline-flex h-12 items-center rounded-full border border-white/25 bg-white/5 px-7 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Explore Food
            </Link>
          </div>

          <div className="mt-11 grid max-w-2xl grid-cols-1 gap-4 border-l-2 border-orange/60 pl-5 text-stone-100 sm:grid-cols-3 sm:gap-6">
            {[
              { value: "552+", label: "Products" },
              { value: "9", label: "Categories" },
              { value: "Same-day", label: "Delivery" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-serif text-xl font-semibold leading-none">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
