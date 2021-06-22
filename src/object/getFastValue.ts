import { hasValue } from './hasValue'

export function getValue<T extends Record<string, unknown>> (source: T, key: string, defaultValue: unknown) {
  if (hasValue(source, key)) return source[key]

  if (key.indexOf('.') !== -1) {
    const keys = key.split('.')
    let parent = source
    let value = defaultValue

    for (let i = 0; i < keys.length; i++) {
      if (hasValue(parent, keys[i])) {
        value = parent[keys[i]]
        parent = parent[keys[i]] as T
      } else {
        value = defaultValue
        break
      }
    }

    return value
  }

  return defaultValue
}
