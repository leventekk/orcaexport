import cn from "classnames";
import type { SVGAttributes } from "react";
import styles from "./icon.module.css";

export function MessageListIcon(props: SVGAttributes<SVGElement>) {
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
        d="M8 10h8m-8 4h8m5.004-2a9 9 0 0 1-9 9h-9s1.56-3.744.936-5a9 9 0 1 1 17.064-4Z"
      />
    </svg>
  );
}
