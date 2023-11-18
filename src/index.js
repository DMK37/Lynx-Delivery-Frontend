import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import CourierApp from "./CourierApp";
import { Auth0ProviderWithNavigate } from "./auth/auth0-provider-with-navigate";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <CourierApp />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
