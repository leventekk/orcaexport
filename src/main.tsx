import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { DefinitionsProvider } from "./features/Definitions/Provider";
import { ExporterProvider } from "./features/Exporter/Provider";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <DefinitionsProvider>
        <ExporterProvider>
          <App />
        </ExporterProvider>
      </DefinitionsProvider>
    </StrictMode>,
  );
}
