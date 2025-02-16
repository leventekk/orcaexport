import cn from "classnames";
import { useCallback } from "react";
import type { FileEntry } from "../../context";
import styles from "./list.module.css";

interface StatefulFileEntry extends Omit<FileEntry, "type"> {
	selected: boolean;
}

interface Props {
	entries: StatefulFileEntry[];

	onAdd: (entry: StatefulFileEntry) => void;
	onRemove: (entry: StatefulFileEntry) => void;
}

export function List(props: Props) {
	const { entries, onAdd, onRemove } = props;

	const handleChange = useCallback(
		(entry: StatefulFileEntry) => () => {
			if (entry.selected) {
				onRemove(entry);
			} else {
				onAdd(entry);
			}
		},
		[onAdd, onRemove],
	);

	return (
		<ul className={styles.root}>
			{entries.map((entry) => (
				<li key={entry.name}>
					<button
						type="button"
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
