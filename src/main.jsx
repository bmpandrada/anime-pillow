import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router";
import { ContextProvider } from "./common/context/ContextApi.jsx";
import CookieConsent from "./common/components/CookieConsent.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
        <CookieConsent />
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
