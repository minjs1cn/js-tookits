const toString = Object.prototype.toString

/**
 * 判断是否是某个类型
 * @param {*} value
 * @param {*} type 数据类型
 */
export const isType = (value: any, type: string) =>
  toString.call(value) === '[object ' + type + ']'

/**
 * 是否是数组
 * @param {*} value
 */
export const isArray = (value: any) => isType(value, 'Array')

/**
 * 是否是字符串
 * @param {*} value
 */
export const isString = (value: any) => isType(value, 'String')

/**
 * 是否是对象
 * @param {*} value
 */
export const isObject = (value: any) => isType(value, 'Object')

/**
 * 是否是函数
 * @param {*} value
 */
export const isFunction = (value: any) => isType(value, 'Function')

/**
 * 是否是window对象
 * @param {*} value
 */
export const isWindow = (value: any) => isType(value, 'Window')

/**
 * 是否是undefined|null
 * @param {any} value
 */
export const isUndef = (value: any) => value === undefined || value === null

/**
 * 是否是null
 * @param {any} value
 */
export const isNull = (value: any) => value === null

/**
 * 是不是promise对象
 * @param {any} value
 */
export const isPromise = (value: any) => {
  return isObject(value) && isFunction(value.then) && isFunction(value.catch)
}

/**
 * 是否跨域
 * @param {String} url
 */
export const isCrossOrigin = (url: string) =>
  url.indexOf(window.location.origin + '/') !== 0
