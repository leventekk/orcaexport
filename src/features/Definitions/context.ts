import { type Dispatch, createContext } from "react";
import type { ConfigType } from "../../utils/to-config-type";

export interface FileEntry {
  name: string;
  path: string;
  type: ConfigType;
}

export interface DefinitionsState {
  files: FileEntry[];
}

export const initialState: DefinitionsState = {
  files: [],
};

export type DefinitionsActions = CreateReducerAction<
  "SYNC",
  { files: FileEntry[] }
>;

interface ContextValue {
  state: DefinitionsState;
  dispatch: Dispatch<DefinitionsActions>;
}

export const DefinitionsContext = createContext<ContextValue>({
  state: initialState,
  dispatch: () => {},
});
