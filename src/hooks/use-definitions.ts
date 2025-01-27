import { useEffect, useState } from "react";
import { readDir, BaseDirectory, DirEntry } from "@tauri-apps/plugin-fs";
import { configDir, join } from "@tauri-apps/api/path";

interface FileEntry {
	name: string;
	path: string;
}

type Folder = "machine" | "filament";

interface FileDefinition {
	title: string;
	type: Folder;
	entries: FileEntry[];
}

const USER_PATH = "OrcaSlicer/user/default";

const SETTING_DIRECTORIES: Folder[] = ["machine", "filament"];

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

export function useDefinitions() {
	const [definitions, setDefinitions] = useState<FileDefinition[]>([]);

	async function collect() {
		const [machines, filaments] = await Promise.all(
			SETTING_DIRECTORIES.map(
				async (dir) =>
					readDir(await join(USER_PATH, dir), {
						baseDir: BaseDirectory.Config,
					}),
				[],
			),
		);

    // TODO: refactor this path and move tot he collection step
		const configDirPath = await configDir();
		const [machinesPath, filamentsPath] = await Promise.all(
			SETTING_DIRECTORIES.map((directory) =>
				join(configDirPath, USER_PATH, directory),
			),
		);

		setDefinitions([
			{
				title: "Machines",
				type: "machine",
				entries: machines
					.filter(filterEntry)
					.reduce(filterUnique, [])
					.map(expandPath(machinesPath)),
			},
			{
				title: "Filaments",
				type: "filament",
				entries: filaments
					.filter(filterEntry)
					.reduce(filterUnique, [])
					.map(expandPath(filamentsPath)),
			},
		]);
	}

	useEffect(() => {
		void collect();
	}, []);

	return { definitions } as const;
}
