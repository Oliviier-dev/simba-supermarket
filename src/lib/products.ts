import productsData from "@/data/products.json";
import type { Product, Category } from "@/types";

const allProducts = (productsData as { store: unknown; products: Product[] }).products;

export const CATEGORY_IMAGES: Record<string, string> = {
  "Cosmetics & Personal Care":
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800",
  "Alcoholic Drinks":
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800",
  "Food Products":
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800",
  "Kitchenware & Electronics":
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800",
  "Cleaning & Sanitary":
    "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800",
  General:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
  "Sports & Fitness":
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
  "Sports & Wellness":
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
  Stationery:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
  "Kitchen Storage":
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800",
  "Pet Care":
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
  "Baby Products":
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800",
};

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600";

export function getAllProducts(): Product[] {
  return allProducts;
}

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return allProducts;
  return allProducts.filter((p) => p.name.toLowerCase().includes(q));
}

export function getProductById(id: number): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProductDescription(product: Product): string {
  if (product.description && product.description.trim()) {
    return product.description.trim();
  }

  return `${product.name} is part of our ${product.category} selection and is sold per ${product.unit.toLowerCase()}. We source trusted everyday products for reliable quality and convenient same-day delivery in Kigali.`;
}

export function getAllCategories(): Category[] {
  const counts: Record<string, number> = {};
  for (const p of allProducts) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  }
  return Object.entries(counts).map(([name, count]) => ({
    name,
    count,
    image: CATEGORY_IMAGES[name] ?? HERO_IMAGE,
  }));
}

export function getFeaturedProducts(count = 8): Product[] {
  const categories = [...new Set(allProducts.map((p) => p.category))];
  const result: Product[] = [];
  for (const cat of categories) {
    const catProducts = allProducts.filter((p) => p.category === cat);
    result.push(catProducts[0]);
    if (result.length >= count) break;
  }
  return result.slice(0, count);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("en-RW") + " RWF";
}
