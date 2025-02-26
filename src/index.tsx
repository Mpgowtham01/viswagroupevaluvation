import React from "react";
import { createRoot } from "react-dom/client";

import { ModuleRegistry } from "ag-grid-community";
import { AllEnterpriseModule, LicenseManager } from "ag-grid-enterprise";

import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";

ModuleRegistry.registerModules([AllEnterpriseModule]);

LicenseManager.setLicenseKey("your License Key");

const rootElement = document.getElementById("app");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  console.error("Root element #app not found!");
}
