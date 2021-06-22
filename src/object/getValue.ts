import { isUndefined } from "../is";
import { hasValue } from "./hasValue";

export function getFastValue<T extends Record<string, unknown>>(source: T, key: string, defaultValue: unknown) {
  if (hasValue(source, key) && !isUndefined(source[key])) return source[key]
  return defaultValue
}