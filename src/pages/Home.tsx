import { EmptyState } from "@component/EmptyState/EmptyState";
import { Tab } from "@component/Tab/Tab";
import { List as DefinitionList } from "@feature/Definitions/components/List/List";
import { useExporter } from "@feature/Exporter/hooks/use-exporter";
import { Fragment } from "react/jsx-runtime";
import { useHome } from "./hooks/use-home";

export function Home() {
  const { addFile, removeFile } = useExporter();
  const { definitions, tabMenus } = useHome();

  return (
    <Tab menus={tabMenus}>
      {definitions.map(({ type, entries }) => (
        <Fragment key={type}>
          {entries.length === 0 ? (
            <EmptyState />
          ) : (
            <DefinitionList
              entries={entries}
              onAdd={(props) => addFile({ ...props, type })}
              onRemove={(props) => removeFile({ ...props, type })}
            />
          )}
        </Fragment>
      ))}
    </Tab>
  );
}
