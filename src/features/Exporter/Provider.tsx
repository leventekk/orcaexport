import { type PropsWithChildren, useReducer } from "react";
import { ExporterContext, initialState } from "./context";
import { exporterReducer } from "./reducer";

export function ExporterProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(exporterReducer, initialState);
  const context = { state, dispatch };

  return (
    <ExporterContext.Provider value={context}>
      {props.children}
    </ExporterContext.Provider>
  );
}
