import { useExporter } from "@feature/Exporter/hooks/use-exporter";
import { toConfigType } from "@util/to-config-type";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { formatTitle } from "../utils/format-title";

interface Props {
  onClose: () => void;
}

export function useDropdownList(props: Props) {
  const { files: filesToExport, downloadFiles, reset } = useExporter();

  const files = useMemo(() => {
    const list = Object.groupBy(filesToExport, (file) => file.type);

    return Object.entries(list).map(([_type, entries]) => {
      const type = toConfigType(_type);
      return {
        title: formatTitle(type),
        type,
        entries,
      };
    });
  }, [filesToExport]);

  const handleExport = useCallback(async () => {
    toast.dismiss();

    if (filesToExport.length === 0) {
      return toast.error("Please select at least one file to export.");
    }

    toast.promise(
      async () => {
        await downloadFiles();
        props.onClose();
      },
      {
        loading: "Processing files...",
        success: "Files exported successfully!",
        error: "Failed to export files",
      },
    );
  }, [downloadFiles, filesToExport, props.onClose]);

  const handleReset = useCallback(() => {
    reset();
    props.onClose();
  }, [props.onClose, reset]);

  const hasFiles = filesToExport.length > 0;

  return {
    handleExport,
    handleReset,
    files,
    hasFiles,
  };
}
