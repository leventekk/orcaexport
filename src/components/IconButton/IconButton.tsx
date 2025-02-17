import cn from "classnames";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./icon-button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outlined" | "filled";
  color?: "default" | "success" | "danger";
}

export function IconButton(props: PropsWithChildren<Props>) {
  const { color = "default", variant = "filled", ...rest } = props;

  return (
    <button
      type="button"
      className={cn(styles.root, {
        [styles.filled]: variant === "filled",
        [styles.outlined]: variant === "outlined",
        [styles.danger]: color === "danger",
        [styles.default]: color === "default",
      })}
      {...rest}
    />
  );
}
