import { createContext, FC, useState, useEffect } from "react";
//instance
import { useAxios } from "../../hooks";
//types
import {
  AuthContextType,
  AuthProviderProps,
  USER_INITIAL_STATE,
  UserStateProps,
} from "./interface";
//helpers
import { getAccessTokens } from "../../helpers";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const api = useAxios();
  const { access } = getAccessTokens();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserStateProps>(USER_INITIAL_STATE);

  useEffect(() => {
    if (!access) return;
    getUserDetails();
  }, [access]);

  const handleLogIn = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });
      const accessTokens = {
        access: response.data.token,
        refresh: response.data.refreshToken,
      };

      localStorage.setItem("accessTokens", JSON.stringify(accessTokens));
      getUserDetails();
      setLoading(false);
    } catch (error: any) {
      setError(error.response.data.message);
      console.log("An unexpected error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("accessTokens");
    setUser(USER_INITIAL_STATE);
  };

  const getUserDetails = async () => {
    try {
      const { data } = await api.get(`/auth/me`);
      setUser(data);
    } catch (error: any) {
      console.log("An unexpected error occurred");
    }
  };

  const value: AuthContextType = {
    user,
    error,
    loading,
    setUser,
    handleLogIn,
    handleLogOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
