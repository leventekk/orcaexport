import type { DirEntry } from "@tauri-apps/plugin-fs";

export function filterEntry(entry: DirEntry) {
  return entry.isFile && entry.name.endsWith(".json");
}

export function filterUnique(acc: DirEntry[], curr: DirEntry) {
  if (acc.some((item) => item.name === curr.name)) {
    return acc;
  }

  acc.push(curr);

  return acc;
}
