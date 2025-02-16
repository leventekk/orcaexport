import type { ExporterAction, ExporterState } from "./context";

export function exporterReducer(
	state: ExporterState,
	action: ExporterAction,
): ExporterState {
	switch (action.type) {
		case "ADD_FILE":
			return { ...state, files: [...state.files, action.payload.file] };
		case "REMOVE_FILE": {
			const { file } = action.payload;

			return {
				...state,
				files: state.files.filter((f) => f.name !== file.name),
			};
		}
		case "RESET":
			return {
				...state,
				files: [],
			};
		default:
			return state;
	}
}
