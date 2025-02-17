import { Actions } from "./Actions";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.root}>
      <h1 className={styles.title}>OrcaExport</h1>

      <Actions />
    </header>
  );
}
