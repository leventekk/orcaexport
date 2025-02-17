import { invoke } from "@tauri-apps/api/core";
import { desktopDir, join } from "@tauri-apps/api/path";
import { useCallback, useContext } from "react";
import { ExporterContext, type ProfileDefinition } from "../context";
import { formatDate } from "../utils/formatDate";

export function useExporter() {
  const { state, dispatch } = useContext(ExporterContext);

  const downloadFiles = useCallback(async () => {
    const desktopPath = await desktopDir();
    const fileName = `${formatDate(new Date())}-export.zip`;
    const pathToExport = await join(desktopPath, fileName);

    await invoke("export_files", {
      pathToExport,
      filesToExport: state.files.map((f) => f.path),
    });
  }, [state.files]);

  const addFile = useCallback(
    (file: ProfileDefinition) => {
      dispatch({ type: "ADD_FILE", payload: { file } });
    },
    [dispatch],
  );

  const removeFile = useCallback(
    (file: ProfileDefinition) => {
      dispatch({ type: "REMOVE_FILE", payload: { file } });
    },
    [dispatch],
  );

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  return {
    files: state.files,
    removeFile,
    addFile,
    reset,
    downloadFiles,
  };
}
