import { MessageIcon } from "@component/Icons/Message";
import { MessageListIcon } from "@component/Icons/MessageList";
import { RefreshIcon } from "@component/Icons/Refresh";
import { DropdownList } from "@feature/Definitions/components/DropdownList/DropdownList";
import styles from "./actions.module.css";
import { useActions } from "./hooks/use-actions";

export function Actions() {
  const { hasFiles, handleClose, dropdownRef, inputRef, refresh } =
    useActions();

  return (
    <div className={styles.root} ref={dropdownRef}>
      <button type="button" className={styles.icon} onClick={refresh}>
        <RefreshIcon />
      </button>
      <label className={styles.icon}>
        {hasFiles ? <MessageListIcon /> : <MessageIcon />}
        <input className={styles.input} type="checkbox" ref={inputRef} />
      </label>

      <div className={styles.popup}>
        <DropdownList onClose={handleClose} />
      </div>
    </div>
  );
}
