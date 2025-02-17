import type { DirEntry } from "@tauri-apps/plugin-fs";

export function removeExtension(name: string) {
  const parts = name.split(".");

  if (parts.length > 1) {
    parts.pop();
  }

  return parts.join(".");
}

export function expandPath(...paths: string[]) {
  return (entry: DirEntry) => ({
    name: removeExtension(entry.name),
    path: [...paths, entry.name].join("/"),
  });
}
