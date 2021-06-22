const toString = Object.prototype.toString

/** 数据类型 */
export type TDataType =
  'String' |
  'Number' |
  'Boolean' |
  'NULL' |
  'Undefined' |
  'Symbol' |
  'Array' |
  'Function' |
  'Object'

/**
 * 判断某个数据类型
 * @param data
 * @param type
 * @returns
 */
export function is (data: unknown, type: TDataType) {
  return toString.call(data) === '[object ' + type + ']'
}

export function isArray (data: unknown) {
  return is(data, 'Array')
}

export function isString (data: unknown) {
  return is(data, 'String')
}

export function isNumber (data: unknown) {
  return is(data, 'Number')
}

export function isBoolean (data: unknown) {
  return is(data, 'Boolean')
}

export function isNULL (data: unknown) {
  return is(data, 'NULL')
}

export function isUndefined (data: unknown) {
  return is(data, 'Undefined')
}

export function isFunction (data: unknown) {
  return is(data, 'Function')
}

export function isObject (data: unknown) {
  return is(data, 'Object')
}

export function isSymbol (data: unknown) {
  return is(data, 'Symbol')
}
