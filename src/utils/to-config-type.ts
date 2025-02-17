export type ConfigType = "machine" | "filament";

export function toConfigType(value: unknown): ConfigType {
  if (value === "machine" || value === "filament") {
    return value;
  }

  throw new Error(`Invalid ConfigType: ${value}`);
}
