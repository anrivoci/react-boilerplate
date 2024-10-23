import { ReactNode } from "react";

export interface Translations {
  [key: string]: string;
}

export interface LanguageContextType {
  currentLang: string;
  changeLanguage: (language: string) => void;
  t: (key: string) => string;
}

export interface LanguageProviderProps {
  children: ReactNode;
}

export enum LanguageOption {
  EN = "en",
  AL = "al",
}
