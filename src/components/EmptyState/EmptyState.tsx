import styles from "./empty-state.module.css";

export function EmptyState() {
  return (
    <div className={styles.root}>
      <p>Hey, seems like you don't have any stuff here.</p>
    </div>
  );
}
