import { isObject } from './is'

/**
 * 判断对象中是否含有某个键
 * @param {Object} object
 * @param {String} key
 */
const hasOwn = Object.prototype.hasOwnProperty

export const hasOwnProperty = (object: any, key: string) => hasOwn.call(object, key)

/**
 * 字符串转json
 * @param {String} str 字符串对象
 */
export function str2json (str: string | null) {
  try {
    return JSON.parse(str as string)
  } catch (error) {
    return {}
  }
}

/**
 * json转字符串
 * @param {Object} json json对象
 */
export function json2str (json: object | string) {
  try {
    return JSON.stringify(json)
  } catch (error) {
    return ''
  }
}


/**
 * 给对象定义属性
 * @param {Object} obj
 * @param {String|Symbol} key
 * @param {any} value
 */
export const def = (obj: object, key: string, value: any) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  })
}

/**
 * 合并对象
 */
export const extend = Object.assign
