import { type Dispatch, createContext } from "react";
import type { ConfigType } from "../../utils/to-config-type";

export interface ProfileDefinition {
	name: string;
	path: string;
	type: ConfigType;
}

export interface ExporterState {
	files: ProfileDefinition[];
}

export type ExporterAction =
	| CreateReducerAction<"ADD_FILE", { file: ProfileDefinition }>
	| CreateReducerAction<"REMOVE_FILE", { file: ProfileDefinition }>
	| CreateReducerAction<"RESET">;

interface ContextValue {
	state: ExporterState;
	dispatch: Dispatch<ExporterAction>;
}

export const initialState: ExporterState = {
	files: [],
};

export const ExporterContext = createContext<ContextValue>({
	state: initialState,
	dispatch: () => {},
});
