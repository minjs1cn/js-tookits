import { trim } from './string'

/**
 * 对url进行编码
 * @param {String} url 字符串
 */
export const encode = (url: string) => {
  try {
    return encodeURIComponent(url)
  } catch (err) {
    return ''
  }
}

/**
 * 对url进行解码
 * @param {String} url 字符串
 */
export const decode = (url: string) => {
  return decodeURIComponent(url)
}

const matchURL = (url: string) => {
  const match = url.match(/\?([^#]*)/)
  return match ? match[1] : ''
}

const parse = (url: string) => {
  const res = matchURL(url)

  if (res === '') return {}

  const resArr = res.split('&') // ['a=1', 'b=2']

  let key, value, kvs

  return resArr.reduce((res, kv) => {
    kvs = kv.split('=')
    key = kvs[0]
    value = kvs[1]

    key = trim(decode(key))
    value = trim(decode(value))
    // @ts-ignore
    res[key] = value

    return res
  }, {})
}

interface Cache {
  [index: string]: {
    [index: string]: unknown
  }
}
/**
 * 解析URL，有缓存，返回对象
 */
export const parseURL = (function () {
  const cache: Cache = {}

  return (url = window.location.href) => {
    return cache[url] || (cache[url] = parse(url))
  }
})()

/**
 * 对象转search字符串
 * 比如 { a: 1, b: 2} => 'a=1&b=2'
 *
 * @param {Object} params 对象
 */
export const stringify = (params: object) => {
  let value = ''
  let v

  return Object.keys(params)
    .map(key => {
      // @ts-ignore
      v = params[key]

      value = v === null ? '' : v

      return `${key}=${encode(value)}`
    })
    .join('&')
}

export default {
  parse: parseURL,
  stringify
}
