export function hasValue<T extends object>(source: T, key: string) {
  return source.hasOwnProperty(key)
}