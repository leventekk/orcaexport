import { useDefinitions } from "@feature/Definitions/hooks/use-definitions";
import { formatTitle } from "@feature/Definitions/utils/format-title";
import { useExporter } from "@feature/Exporter/hooks/use-exporter";
import { toConfigType } from "@util/to-config-type";
import { useCallback, useEffect, useMemo } from "react";

export function useHome() {
	const { files: definitions, collect } = useDefinitions();
	const { files } = useExporter();

	const hasSelected = useCallback(
		<T>(type: T) => files.some((f) => f.type === type),
		[files],
	);

	const enrichedDefinitions = useMemo(
		() =>
			Object.entries(definitions).map(([_type, entries]) => {
				const type = toConfigType(_type);
				return {
					title: formatTitle(type),
					type: type,
					hasSelected: hasSelected(type),
					entries: entries.map((entry) => ({
						...entry,
						selected: files.some((file) => file.path === entry.path),
					})),
				};
			}),
		[files, definitions, hasSelected],
	);

	useEffect(() => {
		void collect();
	}, [collect]);

	return { definitions: enrichedDefinitions };
}
