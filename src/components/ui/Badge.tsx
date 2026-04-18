interface BadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "stone" | "green";
  className?: string;
}

export function Badge({ children, variant = "orange", className = "" }: BadgeProps) {
  const variants = {
    orange: "bg-orange/10 text-orange border border-orange/20",
    stone: "bg-stone-100 text-stone-700 border border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700",
    green: "bg-green-50 text-green-700 border border-green-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
