import { useState, useEffect } from "react";
//other-libs
import { useNavigate } from "react-router-dom";
//providers
import { useLanguage, useAuth } from "../../../providers";
//helpers
import { getAccessTokens } from "../../../helpers";
//styles
import "../styles.css";

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
  const navigate = useNavigate();
  const { handleLogIn, loading, error } = useAuth();
  const { access } = getAccessTokens();
  const [state, setState] = useState<LoginStateProps>(INITIAL_STATE);

  useEffect(() => {
    if (access) {
      navigate("/dashboard");
    }
  }, [access, navigate]);

  const submitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await handleLogIn(state.username, state.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleCredentials = (key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (access) return;

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submitForm}>
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

export default Login;
