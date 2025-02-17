import cn from "classnames";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./icon-button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "danger";
}

export function IconButton(props: PropsWithChildren<Props>) {
  const { variant = "default", ...rest } = props;
  return (
    <button
      type="button"
      className={cn(styles.root, {
        [styles.danger]: variant === "danger",
        [styles.default]: variant === "default",
      })}
      {...rest}
    />
  );
}
