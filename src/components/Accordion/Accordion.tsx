import cn from "classnames";
import type { PropsWithChildren } from "react";
import styles from "./accordion.module.css";

interface Props {
  title: string;
  highlighted?: boolean;
}

export function Accordion(props: PropsWithChildren<Props>) {
  const { title, children, highlighted } = props;

  return (
    <details className={styles.root}>
      <summary
        className={cn(styles.title, { [styles.highlighted]: highlighted })}
      >
        {title}
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
