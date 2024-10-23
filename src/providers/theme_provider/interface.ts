import { ReactNode } from "react";

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void
}

export interface ThemeProviderProps {
  children: ReactNode;
}
