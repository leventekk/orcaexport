import { ConfigType } from "../../utils/to-config-type";

export interface FileEntry {
	name: string;
	path: string;
}

export interface CollectedDefinition {
	title: string;
	type: ConfigType;
	entries: FileEntry[];
}
