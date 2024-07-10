import { ReactNode } from "react";

export interface AuthContextType {
  error: string;
  setUser: unknown;
  loading: boolean;
  user: UserStateProps;
  handleLogIn: (username: string, password: string) => Promise<unknown>;
  handleLogOut: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface UserStateProps {
  id: number | null | undefined;
  age: number | null | undefined;
  role: string | null | undefined;
  email: string | null | undefined;
  username: string | null | undefined;
  lastName: string | null | undefined;
  firstName: string | null | undefined;
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
