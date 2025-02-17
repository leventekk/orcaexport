import { useDefinitions } from "@feature/Definitions/hooks/use-definitions";
import { formatTitle } from "@feature/Definitions/utils/format-title";
import { useExporter } from "@feature/Exporter/hooks/use-exporter";
import { toConfigType } from "@util/to-config-type";
import { useEffect, useMemo } from "react";

export function useHome() {
  const { files: definitions, collect } = useDefinitions();
  const { files } = useExporter();

  const tabMenus = useMemo(
    () => Object.keys(definitions).map((key) => formatTitle(toConfigType(key))),
    [definitions],
  );

  const enrichedDefinitions = useMemo(
    () =>
      Object.entries(definitions).map(([_type, entries]) => {
        const type = toConfigType(_type);

        return {
          type: type,
          entries: entries.map((entry) => ({
            ...entry,
            selected: files.some((file) => file.path === entry.path),
          })),
        };
      }),
    [files, definitions],
  );

  useEffect(() => {
    void collect();
  }, [collect]);

  return {
    tabMenus,
    definitions: enrichedDefinitions,
  };
}
