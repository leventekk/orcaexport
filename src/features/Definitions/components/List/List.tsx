import { PlusIcon } from "@component/Icons/Plus";
import { XMarkIcon } from "@component/Icons/XMark";
import { Tooltip } from "@component/Tooltip/Tooptip";
import cn from "classnames";
import type { FileEntry } from "../../context";
import styles from "./list.module.css";

interface StatefulFileEntry extends Omit<FileEntry, "type"> {
  selected: boolean;
}

interface Props {
  entries: StatefulFileEntry[];

  onAdd: (entry: StatefulFileEntry) => void;
  onRemove: (entry: StatefulFileEntry) => void;
}

export function List(props: Props) {
  const { entries, onAdd, onRemove } = props;

  return (
    <ul className={styles.root}>
      {entries.map((entry) => (
        <li
          key={entry.name}
          className={cn(styles.entry, {
            [styles.entrySelected]: entry.selected,
          })}
        >
          <span>{entry.name}</span>

          <Tooltip title={entry.selected ? "Remove" : "Add"}>
            <button
              type="button"
              className={cn(styles.button, {
                [styles.buttonSelected]: entry.selected,
                [styles.buttonDefault]: !entry.selected,
              })}
              onClick={() => (entry.selected ? onRemove(entry) : onAdd(entry))}
            >
              {entry.selected ? <XMarkIcon /> : <PlusIcon />}
            </button>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}
