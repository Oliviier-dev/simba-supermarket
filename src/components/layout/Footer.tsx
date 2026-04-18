import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-300 bg-stone-100 dark:border-white/8 dark:bg-stone-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <h2 className="font-serif text-xl uppercase tracking-[0.18em] text-stone-900 dark:text-white sm:text-2xl">
              Simba<em className="font-light not-italic text-orange">Market</em>
            </h2>

            <p className="max-w-md text-sm leading-relaxed text-stone-700 dark:text-white/45">
              Rwanda's most trusted online supermarket, delivering everyday essentials and premium finds to families across Kigali.
            </p>

            <div className="space-y-3 text-sm text-stone-700 dark:text-white/45">
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-orange/70" />
                KG 7 Ave, Kigali, Rwanda
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-orange/70" />
                +250 788 000 000
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-orange/70" />
                hello@simbamarket.rw
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[
                { label: "IG", aria: "Instagram" },
                { label: "FB", aria: "Facebook" },
                { label: "X", aria: "X" },
              ].map((social) => (
                <a
                  key={social.aria}
                  href="#"
                  aria-label={social.aria}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-400 text-[11px] font-semibold tracking-[0.12em] text-stone-600 transition-colors hover:border-orange/40 hover:text-stone-950 dark:border-white/10 dark:text-white/45 dark:hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-3">
            <FooterColumn
              title="Shop"
              links={[
                { href: "/products?category=Food%20Products", label: "Food Products" },
                { href: "/products?category=Cosmetics%20%26%20Personal%20Care", label: "Cosmetics" },
                { href: "/products?category=Kitchenware%20%26%20Electronics", label: "Kitchenware" },
                { href: "/products?category=Baby%20Products", label: "Baby Products" },
              ]}
            />

            <FooterColumn
              title="Company"
              links={[
                { href: "/", label: "About Simba" },
                { href: "/", label: "How Delivery Works" },
                { href: "/", label: "Contact" },
                { href: "/", label: "Careers" },
              ]}
            />

            <FooterColumn
              title="Legal"
              links={[
                { href: "/", label: "Privacy Policy" },
                { href: "/", label: "Terms of Service" },
                { href: "/", label: "Refund Policy" },
                { href: "/", label: "Cookie Policy" },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-stone-300 pt-6 text-xs text-stone-700 dark:border-white/8 dark:text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Simba Supermarket. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link href="/" className="transition-colors hover:text-stone-900 dark:hover:text-white">
              Privacy
            </Link>
            <Link href="/" className="transition-colors hover:text-stone-900 dark:hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 dark:text-white/80">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-stone-700 transition-colors hover:text-stone-950 dark:text-white/45 dark:hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
