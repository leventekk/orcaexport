import styles from "./empty-state.module.css";

export function EmptyState() {
  return (
    <div className={styles.root}>
      <p>No definitions found.</p>
    </div>
  );
}
