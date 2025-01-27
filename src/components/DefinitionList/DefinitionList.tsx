import styles from "./definition-list.module.css"

interface FileEntry {
	name: string;
	path: string;
}

interface Props {
	entries: FileEntry[];
}

export function DefinitionList(props: Props) {
	const { entries } = props;

	return (
		<ul className={styles.root}>
			{entries.map(({ name, path }) => (
				<li key={name}>
					<label className={styles.label}>
						<input className={styles.checker} type="checkbox" name="file[]" value={path} />
						<span>{name}</span>
					</label>
				</li>
			))}
		</ul>
	);
}
