import { Button } from "@component/Button/Button";
import { IconButton } from "@component/IconButton/IconButton";
import { XMarkIcon } from "@component/Icons/XMark";
import { useDropdownList } from "@feature/Definitions/hooks/use-dropdown-list";
import { useExporter } from "@feature/Exporter/hooks/use-exporter";
import styles from "./dropdown-list.module.css";

interface Props {
  onClose: () => void;
}

export function DropdownList(props: Props) {
  const { hasFiles, files, handleExport, handleReset } = useDropdownList(props);
  const { removeFile } = useExporter();

  if (!hasFiles) {
    return (
      <div className={styles.feedback}>No files has been selected yet!</div>
    );
  }

  return (
    <>
      <ul className={styles.root}>
        {files.map(({ title, type, name, path }) => (
          <li className={styles.entry} key={name + type}>
            <div>
              <div className={styles.title}>{name}</div>
              <div className={styles.subTitle}>{title}</div>
            </div>
            <IconButton
              onClick={() => removeFile({ type, name, path })}
              variant="danger"
            >
              <XMarkIcon />
            </IconButton>
          </li>
        ))}
      </ul>
      {hasFiles && (
        <div className={styles.footer}>
          <Button onClick={handleReset} variant="danger">
            Reset
          </Button>
          <Button onClick={handleExport}>Export</Button>
        </div>
      )}
    </>
  );
}
