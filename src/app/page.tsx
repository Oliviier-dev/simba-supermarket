import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { StatsBand } from "@/components/home/StatsBand";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { getAllCategories, getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(6);
  const categories = getAllCategories();

  return (
    <>
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <CategoryGrid categories={categories} />
      <StatsBand />
      <ReviewsSection />
      <CtaSection />
    </>
  );
}
