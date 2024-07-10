import React from "react";
import ReactDOM from "react-dom/client";
//gloabl_providers
import { LanguageProvider, AuthProvider } from "./providers";
//components
import App from "./containers/App.tsx";
//global css
import "./assets/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);
