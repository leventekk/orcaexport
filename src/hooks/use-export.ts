import { FormEvent } from "react";
import { invoke } from "@tauri-apps/api/core";
import toast from "react-hot-toast";

export function useExport() {
	async function handleExport(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		toast.dismiss();

		const formData = new FormData(event.currentTarget);

		const type = formData.get("type") as string;
		const files = formData.getAll("file[]").map((file) => file.toString());

		if (files.length === 0) {
			return toast.error("Please select at least one file to export.");
		}

		async function prepareFiles(target: HTMLFormElement) {
			try {
				const name = `${type}-${new Date().toUTCString()}-export.zip`;

				const response = await invoke("export_files", {
					name,
					files,
				});

				console.log("exporting files ", response);
				target.reset();
			} catch (error) {
				console.error("failed to export", error);

				throw new Error("Failed to export files");
			}
		}

		toast.promise(() => prepareFiles(event.currentTarget), {
			loading: "Processing files...",
			success: "Files exported successfully!",
			error: "Failed to export files",
		});
	}

	return { handleExport };
}
