import { createContext, useState, useEffect, FC } from "react";
//types
import {
  Translations,
  LanguageOption,
  LanguageContextType,
  LanguageProviderProps,
} from "./interface";

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const loadTranslations = async (language: string): Promise<Translations> => {
  try {
    const translations = await import(
      `../../assets/languages/${language}.json`
    );
    return translations.default;
  } catch (error) {
    console.error(`Could not load translations for ${language}:`, error);
    return {};
  }
};

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<string>(() => {
    return localStorage.getItem("language") || LanguageOption.EN;
  });
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const fetchTranslations = async () => {
      const loadedTranslations = await loadTranslations(currentLang);
      setTranslations(loadedTranslations);
    };

    fetchTranslations();
  }, [currentLang]);

  const changeLanguage = (language: string) => {
    setCurrentLang(language);
    localStorage.setItem("language", language);
  };

  const t = (key: string): string => {
    return translations[key] || key;
  };

  const value: LanguageContextType = {
    t,
    changeLanguage,
    currentLang,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
