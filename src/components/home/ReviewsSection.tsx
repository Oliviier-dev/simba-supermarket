"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const REVIEWS = [
  {
    nameKey: "home.testimonials.r1Name",
    locationKey: "home.testimonials.r1Location",
    rating: 5,
    textKey: "home.testimonials.r1Text",
    avatar: "/avatar-claire.png",
  },
  {
    nameKey: "home.testimonials.r2Name",
    locationKey: "home.testimonials.r2Location",
    rating: 5,
    textKey: "home.testimonials.r2Text",
    avatar: "/avatar-amina.png",
  },
  {
    nameKey: "home.testimonials.r3Name",
    locationKey: "home.testimonials.r3Location",
    rating: 5,
    textKey: "home.testimonials.r3Text",
    avatar: "/avatar-thierry.png",
  },
];

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -40 : 40 }),
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? "fill-orange text-orange" : "fill-stone-300 text-stone-300"}`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const { t } = useLanguage();
  const [[index, direction], setActive] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive(([current]) => [(current + 1) % REVIEWS.length, 1]);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const goTo = (nextIndex: number) => {
    const normalized = (nextIndex + REVIEWS.length) % REVIEWS.length;
    setActive([normalized, normalized > index ? 1 : -1]);
  };

  const activeReview = REVIEWS[index];

  return (
    <section className="overflow-hidden bg-stone-200/60 py-18 dark:bg-stone-950 sm:py-22">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-9 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-2.5 text-orange">
              <span className="h-px w-8 bg-orange/60" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">{t("home.testimonials.eyebrow")}</span>
            </div>

            <h2 className="font-serif text-[clamp(1.8rem,4.3vw,3.2rem)] font-light leading-[0.95] tracking-tight text-stone-950 dark:text-stone-100">
              {t("home.testimonials.titleStart")}
              <em className="font-semibold not-italic text-orange"> {t("home.testimonials.titleEm")}</em>
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start rounded-full border border-stone-300 bg-stone-50 px-5 py-2 dark:border-stone-700 dark:bg-stone-900">
            <Stars count={5} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-700 dark:text-stone-300">{t("home.testimonials.average")}</span>
          </div>
        </motion.div>

        <div className="rounded-3xl border border-stone-300 bg-stone-50 p-6 dark:border-stone-700 dark:bg-stone-900 sm:p-8">
          <AnimatePresence custom={direction} mode="wait">
            <motion.article
              key={activeReview.nameKey}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid gap-7 md:grid-cols-[1fr_auto] md:items-end"
            >
              <div>
                <Quote className="mb-4 h-8 w-8 text-orange/60" />
                <Stars count={activeReview.rating} />
                <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-stone-900 dark:text-stone-100 sm:text-2xl">
                  {t(activeReview.textKey)}
                </p>
              </div>

              <div className="md:text-right">
                <div className="mb-3 flex items-center gap-3 md:justify-end">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full border border-stone-300 bg-stone-100 dark:border-stone-700 dark:bg-stone-800">
                    <Image
                      src={activeReview.avatar}
                      alt={t(activeReview.nameKey)}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="font-semibold uppercase tracking-[0.15em] text-stone-900 dark:text-stone-100">{t(activeReview.nameKey)}</p>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{t(activeReview.locationKey)}</p>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-stone-300 pt-5 dark:border-stone-700">
            <div className="flex items-center gap-2">
              {REVIEWS.map((review, reviewIndex) => (
                <button
                  key={review.nameKey}
                  onClick={() => goTo(reviewIndex)}
                  className={`h-2.5 rounded-full transition-all ${reviewIndex === index ? "w-8 bg-orange" : "w-2.5 bg-stone-300 dark:bg-stone-600"}`}
                  aria-label={`${t("home.testimonials.goTo")} ${reviewIndex + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goTo(index - 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-colors hover:border-orange/40 hover:text-orange dark:border-stone-600 dark:text-stone-300"
                aria-label={t("home.testimonials.prev")}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={() => goTo(index + 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-colors hover:border-orange/40 hover:text-orange dark:border-stone-600 dark:text-stone-300"
                aria-label={t("home.testimonials.next")}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
