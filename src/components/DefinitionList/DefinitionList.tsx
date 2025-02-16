import { useCallback } from "react";
import cn from "classnames";
import { useExporter } from "../../features/Exporter/hooks/use-exporter";
import styles from "./definition-list.module.css";
import { ConfigType } from "../../utils/to-config-type";

interface FileEntry {
	name: string;
	path: string;
	selected: boolean;
}

interface Props {
	entries: FileEntry[];
	type: ConfigType;
}

export function DefinitionList(props: Props) {
	const { entries, type } = props;
	const { addFile, removeFile } = useExporter();

	const handleChange = useCallback(
		(entry: FileEntry) => () => {
			if (entry.selected) {
				removeFile({ ...entry, type });
			} else {
				addFile({ ...entry, type });
			}
		},
		[addFile, removeFile, type],
	);

	return (
		<ul className={styles.root}>
			{entries.map((entry) => (
				<li key={entry.name}>
					<button
						onClick={handleChange(entry)}
						className={cn(styles.button, {
							[styles.selected]: entry.selected,
						})}
					>
						<span>{entry.name}</span>
					</button>
				</li>
			))}
		</ul>
	);
}
