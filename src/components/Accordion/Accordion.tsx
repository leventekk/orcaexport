import { PropsWithChildren } from "react";
import styles from "./accordion.module.css";

interface Props {
	title: string;
}

export function Accordion(props: PropsWithChildren<Props>) {
	const { title, children } = props;

	return (
		<details className={styles.root}>
			<summary className={styles.title}>{title}</summary>
			<div className={styles.content}>{children}</div>
		</details>
	);
}
