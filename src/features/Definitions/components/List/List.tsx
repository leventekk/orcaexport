import { useCallback } from "react";
import cn from "classnames";
import styles from "./list.module.css";

interface FileEntry {
	name: string;
	path: string;
	selected: boolean;
}

interface Props {
	entries: FileEntry[];

	onAdd: (entry: FileEntry) => void;
	onRemove: (entry: FileEntry) => void;
}

export function List(props: Props) {
	const { entries, onAdd, onRemove } = props;

	const handleChange = useCallback(
		(entry: FileEntry) => () => {
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
