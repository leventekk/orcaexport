import { Children, type PropsWithChildren } from "react";
import {
  Tab as RTab,
  TabList as RTabList,
  TabPanel as RTabPanel,
  Tabs as RTabs,
} from "react-tabs";
import styles from "./tab.module.css";

interface Props {
  menus: string[];
}
export function Tab(props: PropsWithChildren<Props>) {
  const { menus, children } = props;

  return (
    <RTabs className={styles.root}>
      <RTabList className={styles.header}>
        {menus.map((m) => (
          <RTab key={m} className={styles.tab}>
            {m}
          </RTab>
        ))}
      </RTabList>

      {Children.map(children, (child) => (
        <RTabPanel className={styles.panel}>{child}</RTabPanel>
      ))}
    </RTabs>
  );
}
