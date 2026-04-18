import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getProductById,
  getProductsByCategory,
  getAllProducts,
  formatPrice,
  CATEGORY_IMAGES,
  getProductDescription,
} from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { AddToCartSection } from "./AddToCartSection";

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) notFound();

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const imageSrc = product.image || CATEGORY_IMAGES[product.category] || "";
  const description = getProductDescription(product);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--muted)] mb-8 flex-wrap">
          <Link href="/" className="hover:text-orange transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-orange transition-colors">
            Products
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-orange transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[var(--fg)] font-medium line-clamp-1">{product.name}</span>
        </nav>

        {/* Product grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          {/* Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-800">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold text-lg bg-black/60 px-6 py-2 rounded-full">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center gap-6">
            {/* Category badge */}
            <span className="inline-flex w-fit items-center px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-semibold uppercase tracking-wider">
              {product.category}
            </span>

            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--fg)] leading-tight mb-3">
                {product.name}
              </h1>
              <p className="text-[var(--muted)] text-sm">{product.unit}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-orange">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Description</p>
              <p className="text-sm leading-relaxed text-[var(--fg)]">{description}</p>
            </div>

            <div className="h-px bg-[var(--border)]" />

            <AddToCartSection product={product} />

            <div className="h-px bg-[var(--border)]" />

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-[var(--surface)] rounded-2xl p-4">
                <p className="text-[var(--muted)] text-xs uppercase tracking-wider mb-1">Category</p>
                <p className="font-semibold text-[var(--fg)]">{product.category}</p>
              </div>
              <div className="bg-[var(--surface)] rounded-2xl p-4">
                <p className="text-[var(--muted)] text-xs uppercase tracking-wider mb-1">Availability</p>
                <p className={`font-semibold ${product.inStock ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
              <div className="bg-[var(--surface)] rounded-2xl p-4">
                <p className="text-[var(--muted)] text-xs uppercase tracking-wider mb-1">Unit</p>
                <p className="font-semibold text-[var(--fg)]">{product.unit}</p>
              </div>
              <div className="bg-[var(--surface)] rounded-2xl p-4">
                <p className="text-[var(--muted)] text-xs uppercase tracking-wider mb-1">Delivery</p>
                <p className="font-semibold text-[var(--fg)]">Same day</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-[var(--fg)]">
                More from {product.category}
              </h2>
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-sm text-orange hover:underline font-medium"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
