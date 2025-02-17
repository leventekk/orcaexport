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
    return filesToExport.map((file) => {
      const type = toConfigType(file.type);

      return {
        title: formatTitle(type),
        ...file,
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
        props.onClose();
        await downloadFiles();
      },
      {
        loading: "Processing files...",
        success: "Files exported successfully!",
        error: "Failed to export files",
      },
    );
  }, [downloadFiles, filesToExport, props.onClose]);

  const handleReset = useCallback(() => {
    props.onClose();
    reset();
  }, [props.onClose, reset]);

  const hasFiles = filesToExport.length > 0;

  return {
    handleExport,
    handleReset,
    files,
    hasFiles,
  };
}
