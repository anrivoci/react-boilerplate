import React, { useState } from "react";
//react-router
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
//providers
import { useAuth, useLanguage } from "../../providers";

import "./login.css";

interface LoginStateProps {
  username: string;
  password: string;
}

const INITIAL_STATE = {
  username: "",
  password: "",
};

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate({ from: "/login" });
  const { onLogin, error, loading, isAuth } = useAuth();
  const [state, setState] = useState<LoginStateProps>(INITIAL_STATE);

  React.useEffect(() => {
    if (!isAuth) return;
    navigate({
      to: "/dashboard",
    });
  }, [isAuth]);

  const handleCredentials = (key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (isAuth) return;

  return (
    <div className="login_container">
      <form
        className="login-form"
        onSubmit={async (e) => {
          e.preventDefault();
          await onLogin({ ...state });
        }}
      >
        <h1 className="title">{t("welcome")}</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={state.username}
            onChange={(e) => handleCredentials("username", e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={state.password}
            onChange={(e) => handleCredentials("password", e.target.value)}
            required
          />
        </div>
        <div className="form-button">
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export const Route = createLazyFileRoute("/_login/login")({
  component: Login,
});
