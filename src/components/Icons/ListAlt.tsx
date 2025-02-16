import type { SVGAttributes } from "react";
import styles from "./icon.module.css";

export function ListAltIcon(props: SVGAttributes<SVGElement>) {
	return (
		<svg
			className={styles.root}
			width={800}
			height={800}
			fill="none"
			viewBox="0 0 24 24"
			{...props}
		>
			<title>List Alternative</title>

			<path
				className={styles.stroke}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M8 8h12m-9 4h9m-6 4h6M4 8h.01M7 12h.01M10 16h.01"
			/>
		</svg>
	);
}
