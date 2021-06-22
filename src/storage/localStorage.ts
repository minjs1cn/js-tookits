import { json } from '../object'
import { isLocalStorageSupported } from '../env'

const isSupported = isLocalStorageSupported()

export default {
  get (key: string) {
    if (isSupported) {
      let value = localStorage.getItem(key)
      
      if (value) {
        return json.parse(value)
      }

      return value
    }

    return false
  },

  set (key: string, value: string | object | number) {
    if (isSupported) return localStorage.setItem(key, json.stringify(value))
    return false
  },

  remove (key: string) {
    if (isSupported) return localStorage.removeItem(key)
    return false
  }
}
