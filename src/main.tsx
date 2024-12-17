import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import { StockProvider } from "./context/StockContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <StockProvider>
      <App />
    </StockProvider>
  </AuthProvider>
);
