import { BaseDirectory, configDir, join } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/plugin-fs";
import { toConfigType } from "@util/to-config-type";
import { useCallback, useContext, useMemo } from "react";
import { DEFAULT_PROFILE_PATH, DEFINITION_FOLDERS } from "../config";
import { DefinitionsContext, type FileEntry } from "../context";
import { filterEntry, filterUnique } from "../utils/filters";
import { removeExtension } from "../utils/path";

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
  }, [dispatch]);

  return {
    files,
    collect,
  };
}
