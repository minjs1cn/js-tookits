import cookie from './cookie'
import { isLocalStorageSupported } from './env'
import { json2str } from './object'
import LocalStorage from './localStorage'

export default (function () {
  const is = isLocalStorageSupported()

  return {
    get (key: string) {
      if (is) {
        return LocalStorage.get(key)
      }

      return cookie.getJSON(key)
    },

    set (key: string, value: string | object) {
      if (is) {
        return LocalStorage.set(key, value)
      }

      return cookie.set(key, json2str(value), { expires: 365 })
    },

    remove (key: string) {
      if (is) {
        return LocalStorage.remove(key)
      }

      return cookie.remove(key)
    }
  }
})()
