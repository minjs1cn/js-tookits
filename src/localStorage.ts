import { str2json, json2str } from './object'
import { isLocalStorageSupported } from './env'

const is = isLocalStorageSupported()

export default {
  get (key: string) {
    if (is) return str2json(localStorage.getItem(key))
    return false
  },

  set (key: string, value: string | object) {
    if (is) return localStorage.setItem(key, json2str(value))
    return false
  },

  remove (key: string) {
    if (is) return localStorage.removeItem(key)
    return false
  }
}
