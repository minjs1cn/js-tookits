import { cookie } from './cookie'
import { isLocalStorageSupported } from '../env'
import { json } from '../object'
import LocalStorageWithTime from './localStorageWithTime'

export default (function () {
  const is = isLocalStorageSupported()

  return {
    get (key: string) {
      if (is) {
        return LocalStorageWithTime.get(key)
      }

      const value = cookie.getJSON(key)

      if (value) {
        return value
      }

      cookie.remove(key)
      return null
    },

    set (key: string, value: string | object, expires?: number) {
      if (is) {
        return LocalStorageWithTime.set(key, value, expires)
      }

      return cookie.set(key, json.stringify(value), { expires })
    },

    remove (key: string) {
      if (is) {
        return LocalStorageWithTime.remove(key)
      }

      return cookie.remove(key)
    }
  }
})()
