import { useCallback, useContext, useMemo } from "react";
import { readDir } from "@tauri-apps/plugin-fs";
import { BaseDirectory, configDir, join } from "@tauri-apps/api/path";
import { DefinitionsContext, FileEntry } from "../context";
import { DEFINITION_FOLDERS, DEFAULT_PROFILE_PATH } from "../config";
import { filterEntry, filterUnique } from "../utils/filters";
import { removeExtension } from "../utils/path";
import { toConfigType } from "@util/to-config-type";

export function useDefinitions() {
	const { state, dispatch } = useContext(DefinitionsContext);
	const files = useMemo(
		() => Object.groupBy(state.files, (entry) => entry.type),
		[state.files],
	);

	const collect = useCallback(async () => {
		const configDirPath = await configDir();

		const collection = (
			await Promise.all(
				DEFINITION_FOLDERS.map(async (dir) => {
					const fullPath = await join(configDirPath, DEFAULT_PROFILE_PATH, dir);
					const list = await readDir(fullPath, {
						baseDir: BaseDirectory.Config,
					});

					const files = await Promise.all(
						list
							.filter(filterEntry)
							.reduce(filterUnique, [])
							.sort((a, b) => a.name.localeCompare(b.name))
							.map(async (entry) => {
								const name = removeExtension(entry.name);
								const path = await join(fullPath, entry.name);

								return {
									name,
									type: toConfigType(dir),
									path,
								} satisfies FileEntry;
							}),
					);

					return files;
				}, []),
			)
		).flat();

		dispatch({ type: "SYNC", payload: { files: collection } });

		return collection;
	}, []);

	return {
		files,
		collect,
	};
}
