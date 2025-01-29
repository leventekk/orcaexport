import { useCallback, useEffect, useState } from "react";
import { readDir, BaseDirectory, DirEntry } from "@tauri-apps/plugin-fs";
import { configDir, join } from "@tauri-apps/api/path";
import { ConfigType } from "../utils/to-config-type";

interface FileEntry {
	name: string;
	path: string;
}

interface FileDefinition {
	title: string;
	type: ConfigType;
	entries: FileEntry[];
}

const USER_PATH = "OrcaSlicer/user/default";

const SETTING_DIRECTORIES: ConfigType[] = ["machine", "filament"];

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

	const collect = useCallback(async () => {
		const [machines, filaments] = await Promise.all(
			SETTING_DIRECTORIES.map(
				async (dir) =>
					readDir(await join(USER_PATH, dir), {
						baseDir: BaseDirectory.Config,
					}),
				[],
			),
		);

		// TODO: refactor this path and move to the collection step
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
					.sort((a, b) => a.name.localeCompare(b.name))
					.map(expandPath(machinesPath)),
			},
			{
				title: "Filaments",
				type: "filament",
				entries: filaments
					.filter(filterEntry)
					.reduce(filterUnique, [])
					.sort((a, b) => a.name.localeCompare(b.name))
					.map(expandPath(filamentsPath)),
			},
		]);
	}, [setDefinitions]);

	useEffect(() => {
		void collect();
	}, [collect]);

	return { definitions } as const;
}
