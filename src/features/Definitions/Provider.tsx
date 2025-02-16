import { PropsWithChildren, useReducer } from "react";
import { DefinitionsContext, initialState } from "./context";
import { definitionsReducer } from "./reducer";

export function DefinitionsProvider(props: PropsWithChildren) {
	const [state, dispatch] = useReducer(definitionsReducer, initialState);
	const context = { state, dispatch };

	return (
		<DefinitionsContext.Provider value={context}>
			{props.children}
		</DefinitionsContext.Provider>
	);
}
