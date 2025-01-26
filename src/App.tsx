import { FormEvent, useEffect, useState } from "react";
import { readDir, BaseDirectory, DirEntry } from "@tauri-apps/plugin-fs";
import { configDir } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/core";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

interface FileEntry {
	name: string;
	path: string;
}

interface FileDefinition {
	title: string;
	type: "machine" | "filament";
	entries: FileEntry[];
}

const USER_PATH = "OrcaSlicer/user/default";

function filterEntry(entry: DirEntry) {
	return entry.isFile && entry.name.endsWith(".json");
}

function filterUnique(acc: DirEntry[], curr: DirEntry) {
	if (acc.some((item) => item.name === curr.name)) {
		return acc;
	}

	acc.push(curr);

	return acc;
}

function removeExtension(name: string) {
	const parts = name.split(".");

	if (parts.length > 1) {
		parts.pop();
	}

	return parts.join(".");
}

function expandPath(...paths: string[]) {
	return function (entry: DirEntry) {
		return {
			name: removeExtension(entry.name),
			path: [...paths, entry.name].join("/"),
		};
	};
}

function App() {
	const [entries, setEntries] = useState<FileDefinition[]>([]);

	async function collect() {
		const [machines, filaments] = await Promise.all(
			["machine", "filament"].reduce<Promise<DirEntry[]>[]>((acc, dir) => {
				const request = readDir(`${USER_PATH}/${dir}`, {
					baseDir: BaseDirectory.Config,
				});

				acc.push(request);

				return acc;
			}, []),
		);

		const configDirPath = await configDir();

		setEntries([
			{
				title: "Machines",
				type: "machine",
				entries: machines
					.filter(filterEntry)
					.reduce(filterUnique, [])
					.map(expandPath(configDirPath, USER_PATH, "machine")),
			},
			{
				title: "Filaments",
				type: "filament",
				entries: filaments
					.filter(filterEntry)
					.reduce(filterUnique, [])
					.map(expandPath(configDirPath, USER_PATH, "filament")),
			},
		]);
	}

	async function handleExport(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		toast.dismiss();

		const formData = new FormData(event.currentTarget);

		const type = formData.get("type") as string;
		const files = formData.getAll("file[]").map((file) => file.toString());

		if (files.length === 0) {
			return toast.error("Please select at least one file to export.");
		}

		async function prepareFiles(target: HTMLFormElement) {
			try {
				const response = await invoke("export_files", {
					name: `${type}-${new Date().toUTCString()}-export.zip`,
					files,
				});

				console.log("exporting files ", response);
				target.reset();
			} catch (error) {
				console.error("failed to export", error);

				throw new Error("Failed to export files");
			}
		}

		toast.promise(() => prepareFiles(event.currentTarget), {
			loading: "Processing files...",
			success: "Files exported successfully!",
			error: "Failed to export files",
		});
	}

	useEffect(() => {
		void collect();
	}, []);

	return (
		<main className="container">
			<h1>OrcaExport</h1>

			<div className="content">
				{entries.map(({ title, type, entries }) => (
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
