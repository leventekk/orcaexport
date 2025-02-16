import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ExporterProvider } from "./features/Exporter/Provider";
import { DefinitionsProvider } from "./features/Definitions/Provider";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<DefinitionsProvider>
			<ExporterProvider>
				<App />
			</ExporterProvider>
		</DefinitionsProvider>
	</StrictMode>,
);
