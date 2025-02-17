import cn from "classnames";
import type { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger";
}

export function Button(props: Props) {
  return (
    <button
      className={cn(styles.root, {
        [styles.primary]: !props.variant || props.variant === "primary",
        [styles.danger]: props.variant === "danger",
      })}
      {...props}
    />
  );
}
