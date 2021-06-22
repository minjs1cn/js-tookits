export interface IStorage {
  get(key: string): unknown
  set(key: string, value: object | string | number): void
  remove(key: string): void
  [index: string]: unknown
}

export function cacheFactory (db: IStorage, prefix?: string): IStorage {

  function getKey(key: string) {
    if (prefix) return prefix + key
    return key
  }

  return {
    set(key: string, value: object | string | number) {
      key = getKey(key)
      return db.set(key, value)
    },
  
    get(key: string) {
      key = getKey(key)
      return db.get(key)
    },
  
    remove(key: string) {
      key = getKey(key)
      return db.remove(key)
    }
  }
}