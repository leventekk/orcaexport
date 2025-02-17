import type { PropsWithChildren } from "react";
import styles from "./tooltip.module.css";

interface Props {
  title: string;
}

export function Tooltip(props: PropsWithChildren<Props>) {
  return (
    <div className={styles.root} data-tooltip={props.title}>
      {props.children}
    </div>
  );
}
