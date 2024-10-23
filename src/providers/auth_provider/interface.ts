import { ReactNode } from "react";

export interface UserTypes {
  id: number;
  age: number;
  role: string;
  email: string;
  username: string;
  lastName: string;
  firstName: string;
}

export interface AuthContextType {
  user: UserTypes;
  loading: boolean;
  isAuth: boolean;
  error: string;
  onLogin: (args: { username: string; password: string }) => Promise<unknown>;
  onLogOut: () => void;
}

export interface CredentialsProps {
  username: string;
  password: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export const USER_INITIAL_STATE = {
  id: null,
  age: null,
  role: "",
  email: "",
  username: "",
  lastName: "",
  firstName: "",
};
