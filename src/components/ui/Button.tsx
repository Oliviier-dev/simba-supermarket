import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variants = {
      primary:
        "bg-orange text-white hover:bg-orange-hover active:scale-[0.98] shadow-sm",
      ghost:
        "bg-transparent text-[var(--fg)] hover:bg-stone-100 dark:hover:bg-stone-800",
      outline:
        "border border-[var(--border)] bg-transparent text-[var(--fg)] hover:border-orange hover:text-orange",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm rounded-lg gap-1.5",
      md: "h-10 px-5 text-sm rounded-xl gap-2",
      lg: "h-12 px-7 text-base rounded-xl gap-2",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
