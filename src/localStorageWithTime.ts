import LocalStorage from './localStorage'
import { getExpireTimestamp } from './date'

export default {
  get (key: string) {
    const dbData = LocalStorage.get(key)

    if (dbData && dbData._time >= new Date().getTime()) {
      return dbData.data
    }

    // 如果过期，即删除
    LocalStorage.remove(key)
    return null
  },

  set (key: string, value: string | object, expires = 0) {
    const dbData = {
      data: value,
      _time: getExpireTimestamp(expires)
    }

    return LocalStorage.set(key, dbData)
  },

  remove (key: string) {
    LocalStorage.remove(key)
  }
}
