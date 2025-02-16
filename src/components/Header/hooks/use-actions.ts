import { useDefinitions } from "@feature/Definitions/hooks/use-definitions";
import { useExporter } from "@feature/Exporter/hooks/use-exporter";
import { useClickAway } from "@uidotdev/usehooks";
import { useCallback, useRef } from "react";
import toast from "react-hot-toast";

export function useActions() {
	const { collect } = useDefinitions();
	const { files } = useExporter();

	const inputRef = useRef<HTMLInputElement>(null);

	const dropdownRef = useClickAway<HTMLDivElement>(() => {
		if (inputRef.current) {
			inputRef.current.checked = false;
		}
	});

	const refresh = useCallback(async () => {
		const loadingId = toast.loading("Refreshing definitions...");

		await collect();

		setTimeout(() => {
			toast.dismiss(loadingId);
		}, 500);
	}, [collect]);

	const handleClose = () => {
		if (inputRef.current) {
			inputRef.current.checked = false;
		}
	};

	const hasFiles = files.length > 0;

	return {
		inputRef,
		dropdownRef,
		handleClose,
		hasFiles,
		refresh,
	};
}
