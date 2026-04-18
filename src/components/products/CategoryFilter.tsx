"use client";

import { getAllCategories } from "@/lib/products";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const { t } = useLanguage();
  const categories = getAllCategories();

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
      <Pill
        label={t("filter.all")}
        count={categories.reduce((s, c) => s + c.count, 0)}
        active={selected === ""}
        onClick={() => onChange("")}
      />
      {categories
        .sort((a, b) => b.count - a.count)
        .map((cat) => (
          <Pill
            key={cat.name}
            label={cat.name}
            count={cat.count}
            active={selected === cat.name}
            onClick={() => onChange(cat.name)}
          />
        ))}
    </div>
  );
}

function Pill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 flex items-center gap-1.5 px-4 h-9 rounded-full text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-orange text-white shadow-sm"
          : "bg-[var(--surface)] border border-[var(--border)] text-[var(--fg)] hover:border-orange hover:text-orange"
      }`}
    >
      {label}
      <span
        className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
          active ? "bg-white/20 text-white" : "bg-stone-100 dark:bg-stone-800 text-[var(--muted)]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
