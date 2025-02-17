import cn from "classnames";
import type { SVGAttributes } from "react";
import styles from "./icon.module.css";

export function RefreshIcon(props: SVGAttributes<SVGElement>) {
  const { className, ...rest } = props;
  return (
    <svg
      className={cn(styles.root, className)}
      fill="none"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        className={styles.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 3v5m0 0h-5m5 0-3-2.708A9 9 0 1 0 20.777 14"
      />
    </svg>
  );
}
