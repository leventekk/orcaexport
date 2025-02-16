import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { DefinitionsProvider } from "./features/Definitions/Provider";
import { ExporterProvider } from "./features/Exporter/Provider";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<DefinitionsProvider>
			<ExporterProvider>
				<App />
			</ExporterProvider>
		</DefinitionsProvider>
	</StrictMode>,
);
