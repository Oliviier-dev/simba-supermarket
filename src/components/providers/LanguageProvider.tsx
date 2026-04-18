"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AppLanguage } from "@/lib/i18n";
import { translate } from "@/lib/i18n";

interface LanguageContextValue {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "simba-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as AppLanguage | null;
    if (saved === "en" || saved === "fr" || saved === "kin") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: string) => translate(language, key),
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
