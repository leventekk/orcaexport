import { FormEvent, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import toast from "react-hot-toast";
import { desktopDir, join } from "@tauri-apps/api/path";
import { ConfigType, toConfigType } from "../utils/to-config-type";

function formatDate(date: Date) {
	const formatter = new Intl.DateTimeFormat("en-GB", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});

	const parts = formatter.formatToParts(date);

	return ["year", "moth", "day", "hour", "minute"].reduce((acc, type) => {
		const part = parts.find((part) => part.type === type);

		if (!part) {
			return acc;
		}

		return acc + part.value;
	}, "");
}

export function useExport() {
	const prepareFiles = useCallback(
		async (
			target: HTMLFormElement,
			type: ConfigType,
			filesToExport: string[],
		) => {
			try {
				const desktopPath = await desktopDir();
				const fileName = `${type}-${formatDate(new Date())}-export.zip`;
				const pathToExport = await join(desktopPath, fileName);

				await invoke("export_files", {
					pathToExport,
					filesToExport,
				});
				target.reset();
			} catch (error) {
				console.error("failed to export", error);

				throw error;
			}
		},
		[],
	);

	const handleExport = useCallback(
		async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			toast.dismiss();

			const formData = new FormData(event.currentTarget);

			const type = toConfigType(formData.get("type"));
			const filesToExport = formData
				.getAll("file[]")
				.map((file) => file.toString());

			if (filesToExport.length === 0) {
				return toast.error("Please select at least one file to export.");
			}

			toast.promise(
				() =>
					prepareFiles(event.target as HTMLFormElement, type, filesToExport),
				{
					loading: "Processing files...",
					success: "Files exported successfully!",
					error: "Failed to export files",
				},
			);
		},
		[],
	);

	return { handleExport };
}
