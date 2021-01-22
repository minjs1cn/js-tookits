const FirstAndLastSpacesReg = /^\s+|\s+$/g

/**
 * 去除字符串首尾空格
 * @param {String} str 字符串
 */
const replace = String.prototype.replace

export const trim = (str: string) => replace.call(str, FirstAndLastSpacesReg, '' as any)

export function hump2str(str: string) {
  return str.replace(/([A-Z])/g, (_, s) =>'_' + s.toLowerCase())
}