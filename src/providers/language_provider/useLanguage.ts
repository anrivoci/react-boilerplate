import { useContext } from "react";
//provider
import { LanguageContext } from "./provider";
//types
import { LanguageContextType } from "./interface";

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
