import cn from "classnames";
import type { SVGAttributes } from "react";
import styles from "./icon.module.css";

export function ListIcon(props: SVGAttributes<SVGElement>) {
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
        d="m8 6 13 .001m-13 6h13m-13 6h13M3.5 6h.01m-.01 6h.01m-.01 6h.01M4 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm0 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm0 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
      />
    </svg>
  );
}
