import { useContext } from "react";
//provider
import { AuthContext } from "./provider";
//types
import { AuthContextType } from "./interface";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
