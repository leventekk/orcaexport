import type { DefinitionsActions, DefinitionsState } from "./context";

export function definitionsReducer(
	state: DefinitionsState,
	action: DefinitionsActions,
) {
	switch (action.type) {
		case "SYNC":
			return {
				...state,
				files: action.payload.files,
			};

		default:
			return state;
	}
}
