import { Toaster } from "react-hot-toast";
import "./App.css";
import { useDefinitions } from "./hooks/use-definitions";
import { useExport } from "./hooks/use-export";
import { Header } from "./components/Header/Header";
import { DefinitionList } from "./components/DefinitionList/DefinitionList";
import { Accordion } from "./components/Accordion/Accordion";
import { Button } from "./components/Button/Button";
import { EmptyState } from "./components/EmptyState/EmptyState";

function App() {
	const { definitions } = useDefinitions();
	const { handleExport } = useExport();

	return (
		<div className="container">
			<Header />

			<main>
				{definitions.map(({ title, type, entries }) => (
					<Accordion key={title} title={title}>
						{entries.length === 0 ? (
							<EmptyState />
						) : (
							<>
								<form onSubmit={handleExport}>
									<input type="hidden" name="type" value={type} />
									<DefinitionList entries={entries} />

									<div className="button-footer">
										<Button type="reset" variant="danger">
											Reset
										</Button>
										<Button type="submit">Export</Button>
									</div>
								</form>
							</>
						)}
					</Accordion>
				))}
				<Toaster position="bottom-right" />
			</main>
		</div>
	);
}

export default App;
