import type { ConfigType } from "@util/to-config-type";

export function formatTitle(type: ConfigType) {
  if (type === "filament") {
    return "Filaments";
  }

  return "Machines";
}
