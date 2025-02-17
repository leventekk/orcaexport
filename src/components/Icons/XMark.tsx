import cn from "classnames";
import type { SVGAttributes } from "react";
import styles from "./icon.module.css";

export function XMarkIcon(props: SVGAttributes<SVGElement>) {
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
        d="m6 6 12 12m0-12L6 18"
      />
    </svg>
  );
}
