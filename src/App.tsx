import { Toaster } from "react-hot-toast";
import "./App.css";
import { useDefinitions } from "./hooks/use-definitions";
import { useExport } from "./hooks/use-export";

function App() {
	const { definitions } = useDefinitions();
	const { handleExport } = useExport();

	return (
		<main className="container">
			<h1>OrcaExport</h1>

			<div className="content">
				{definitions.map(({ title, type, entries }) => (
					<form key={title} onSubmit={handleExport}>
						<input type="hidden" name="type" value={type} />
						<details className="row">
							<summary>{title}</summary>
							<ul>
								{entries.map(({ name, path }) => (
									<li key={name}>
										<label>
											<input type="checkbox" name="file[]" value={path} />
											<span>{name}</span>
										</label>
									</li>
								))}
							</ul>

							<button>export it!</button>
						</details>
					</form>
				))}
			</div>
			<Toaster position="bottom-right" />
		</main>
	);
}

export default App;
