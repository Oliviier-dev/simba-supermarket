"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun, ShoppingCart, Menu, X } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useCartStore } from "@/store/cart";
import { LANG_LABELS, type AppLanguage } from "@/lib/i18n";
import { useLanguage } from "@/components/providers/LanguageProvider";

const NAV_LINKS = [
  { href: "/", key: "nav.home" },
  { href: "/products", key: "nav.shop" },
  { href: "/checkout", key: "nav.checkout" },
] as const;

const LANGS: AppLanguage[] = ["en", "fr", "kin"];

export function Nav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const openCart = useCartStore((s) => s.openCart);
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const isSolid = !isHome || scrolled || mobileOpen;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const activeLink = useMemo(() => {
    if (pathname.startsWith("/products")) return "/products";
    if (pathname.startsWith("/checkout")) return "/checkout";
    return "/";
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isSolid
            ? "border-b border-stone-200/70 bg-white/80 shadow-sm backdrop-blur-md dark:border-stone-700/70 dark:bg-stone-900/70"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6">
          <Link
            href="/"
            className="font-serif text-base uppercase tracking-[0.22em] text-white transition-colors sm:text-lg"
          >
            <span className={`${isSolid ? "text-[var(--fg)] dark:text-stone-100" : "text-white"}`}>Simba</span>
            <em className="font-light not-italic text-orange">Market</em>
          </Link>

          <nav className="ml-10 hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = activeLink === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors ${
                    isSolid
                      ? "text-[var(--muted)] hover:text-[var(--fg)] dark:hover:text-stone-100"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-orange"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span
                    className={
                      active
                        ? isSolid
                          ? "text-[var(--fg)] dark:text-stone-100"
                          : "text-white"
                        : ""
                    }
                  >
                    {t(link.key)}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
              {LANGS.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`h-8 rounded-full px-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    language === lang
                      ? "bg-orange text-white"
                      : "text-[var(--muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {LANG_LABELS[lang]}
                </button>
              ))}
            </div>

            <Link
              href="/products"
              className="inline-flex h-11 items-center rounded-full bg-orange px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-orange-hover"
            >
              {t("nav.shopNow")}
            </Link>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
                  isSolid
                    ? "border-stone-200 text-[var(--muted)] hover:text-[var(--fg)] dark:border-stone-700"
                    : "border-white/25 text-white/80 hover:text-white"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}

            <button
              onClick={openCart}
              className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
                isSolid
                  ? "border-stone-200 text-[var(--muted)] hover:text-[var(--fg)] dark:border-stone-700"
                  : "border-white/25 text-white/80 hover:text-white"
              }`}
              aria-label="Open cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-orange px-1 text-[10px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <button
              onClick={openCart}
              className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border ${
                isSolid
                  ? "border-stone-200 text-[var(--muted)] dark:border-stone-700"
                  : "border-white/25 text-white/80"
              }`}
              aria-label="Open cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-orange px-1 text-[10px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${
                isSolid
                  ? "border-stone-200 text-[var(--muted)] dark:border-stone-700"
                  : "border-white/25 text-white/80"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {!isHome && <div className="h-20" />}

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu backdrop"
              className="fixed inset-0 z-40 bg-stone-950/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-screen w-[85vw] max-w-sm flex-col bg-[var(--surface)] p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="mb-10 flex items-center justify-between">
                <p className="font-serif text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{t("nav.navigation")}</p>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)]"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ delay: 0.04 * index }}
                  >
                    <Link
                      href={link.href}
                      className={`block rounded-2xl border px-5 py-4 text-sm uppercase tracking-[0.2em] transition-colors ${
                        activeLink === link.href
                          ? "border-orange/40 bg-orange/10 text-orange"
                          : "border-[var(--border)] text-[var(--fg)] hover:border-orange/30"
                      }`}
                    >
                      {t(link.key)}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto space-y-3">
                <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
                  {LANGS.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`h-9 flex-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                        language === lang
                          ? "bg-orange text-white"
                          : "text-[var(--muted)] hover:text-[var(--fg)]"
                      }`}
                    >
                      {LANG_LABELS[lang]}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--fg)]"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {t("nav.toggleTheme")}
                </button>

                <Link
                  href="/products"
                  className="flex h-12 items-center justify-center rounded-full bg-orange text-sm font-semibold uppercase tracking-[0.2em] text-white"
                >
                  {t("nav.shopNow")}
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
