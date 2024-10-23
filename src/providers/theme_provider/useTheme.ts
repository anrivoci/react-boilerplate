import { useContext } from "react";
//provider
import { ThemeContext } from "./provider";
//types
import { ThemeContextType } from "./interface";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
