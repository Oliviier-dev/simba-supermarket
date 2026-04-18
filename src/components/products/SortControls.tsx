"use client";

export type SortOption = "default" | "price-asc" | "price-desc";

interface SortControlsProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  count: number;
}

export function SortControls({ value, onChange, count }: SortControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-[var(--muted)]">
        <span className="font-semibold text-[var(--fg)]">{count}</span> products
      </p>

      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--muted)] hidden sm:block">Sort:</span>
        <div className="flex gap-1.5">
          {(
            [
              { value: "default", label: "Default" },
              { value: "price-asc", label: "Price ↑" },
              { value: "price-desc", label: "Price ↓" },
            ] as { value: SortOption; label: string }[]
          ).map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`h-8 px-3 rounded-lg text-xs font-medium transition-all ${
                value === opt.value
                  ? "bg-orange text-white"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--fg)] hover:border-orange hover:text-orange"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
