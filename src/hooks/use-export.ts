import { FormEvent, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import toast from "react-hot-toast";
import { desktopDir, join } from "@tauri-apps/api/path";

export function useExport() {
	const prepareFiles = useCallback(
		async (target: HTMLFormElement, type: string, filesToExport: string[]) => {
			try {
				const desktopPath = await desktopDir();
				const fileName = `${type}-${new Date().toISOString()}-export.zip`;
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

			const type = formData.get("type") as string;
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
