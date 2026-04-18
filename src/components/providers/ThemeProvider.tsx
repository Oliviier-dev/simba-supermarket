"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: ThemeMode;
  setTheme: (value: ThemeMode) => void;
}

const THEME_STORAGE_KEY = "simba-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeToDom(theme: ThemeMode) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initial: ThemeMode = stored === "dark" ? "dark" : "light";
    setThemeState(initial);
    applyThemeToDom(initial);
  }, []);

  const setTheme = (value: ThemeMode) => {
    setThemeState(value);
    window.localStorage.setItem(THEME_STORAGE_KEY, value);
    applyThemeToDom(value);
  };

  const contextValue = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme: theme, setTheme }),
    [theme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
