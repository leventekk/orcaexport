import { Accordion } from "@component/Accordion/Accordion";
import { EmptyState } from "@component/EmptyState/EmptyState";
import { List as DefinitionList } from "@feature/Definitions/components/List/List";
import { useExporter } from "@feature/Exporter/hooks/use-exporter";
import { useHome } from "./hooks/use-home";

export function Home() {
	const { addFile, removeFile } = useExporter();
	const { definitions } = useHome();

	return (
		<>
			{definitions.map(({ title, type, entries, hasSelected }) => (
				<Accordion key={title} title={title} highlighted={hasSelected}>
					{entries.length === 0 ? (
						<EmptyState />
					) : (
						<DefinitionList
							entries={entries}
							onAdd={(props) => addFile({ ...props, type })}
							onRemove={(props) => removeFile({ ...props, type })}
						/>
					)}
				</Accordion>
			))}
		</>
	);
}
