import { createContext, FC } from "react";
//react-query
import { useQuery, useMutation } from "@tanstack/react-query";
//instance
import { useAxios } from "../../hooks";
//types
import {
  AuthContextType,
  AuthProviderProps,
  CredentialsProps,
} from "./interface";
import { getAccessTokens } from "../../helpers";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const api = useAxios();
  const { accessToken } = getAccessTokens();

  const userDetails = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get(`/auth/me`);
      return response.data;
    },
    enabled: false,
  });

  const logIn = useMutation(
    async (credentials: CredentialsProps) => {
      const response = await api.post("/auth/login", { ...credentials });

      const tokens = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };

      localStorage.setItem("authTokens", JSON.stringify(tokens));

      return response.data;
    },
    {
      onSuccess: () => {
        userDetails.refetch();
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );

  const onLogOut = () => {
    localStorage.removeItem("authTokens");
    window.location.href = "/login";
  };

  const value: AuthContextType = {
    onLogOut,
    error: logIn.error,
    isAuth: !!accessToken,
    user: userDetails.data,
    loading: logIn.isLoading,
    onLogin: logIn.mutateAsync,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
