import LocalStorage from './localStorage'

const getExpireTimestamp = (days: number) => {
  return (
    new Date(new Date().setHours(23, 59, 59, 1000)).getTime() +
    days * 24 * 60 * 60 * 1000
  )
}

export interface IStorageData {
  _time: number
  data: object
}

export default {
  get (key: string) {
    const dbData = LocalStorage.get(key) as IStorageData

    // if (dbData && dbData._time >= new Date().getTime()) {
    //   return dbData.data
    // }

    // 如果过期，即删除
    LocalStorage.remove(key)
    return null
  },

  set (key: string, value: string | number | object, expires = 0) {
    const dbData = {
      data: value,
      _time: getExpireTimestamp(expires)
    }

    return LocalStorage.set(key, dbData)
  },

  remove (key: string) {
    return LocalStorage.remove(key)
  }
}
