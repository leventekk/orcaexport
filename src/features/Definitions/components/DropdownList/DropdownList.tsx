import { useDropdownList } from "@feature/Definitions/hooks/use-dropdown-list";
import styles from "./dropdown-list.module.css";
import { useExporter } from "@feature/Exporter/hooks/use-exporter";
import { Button } from "@component/Button/Button";

interface Props {
	onClose: () => void;
}

export function DropdownList(props: Props) {
	const { hasFiles, files, handleExport, handleReset } = useDropdownList(props);
	const { removeFile } = useExporter();

	if (!hasFiles) {
		return (
			<div className={styles.feedback}>No files has been selected yet!</div>
		);
	}

	return (
		<>
			<div className={styles.root}>
				{files.map(({ title, type, entries }) => (
					<dl className={styles.list} key={type}>
						<dt className={styles.title}>{title}</dt>
						{entries.map((entry) => (
							<dd className={styles.entry} key={entry.path}>
								<button
									className={styles.remove}
									onClick={() => removeFile(entry)}
								>
									{entry.name}
								</button>
							</dd>
						))}
					</dl>
				))}
			</div>
			{hasFiles && (
				<div className={styles.footer}>
					<Button onClick={handleReset} variant="danger">
						Reset
					</Button>
					<Button onClick={handleExport}>Export</Button>
				</div>
			)}
		</>
	);
}
