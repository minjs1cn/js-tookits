const FirstAndLastSpacesReg = /^\s+|\s+$/g

/**
 * 去除字符串首尾空格
 * @param {String} str 字符串
 */
const replace = String.prototype.replace

export const trim = (str: string) => replace.call(str, FirstAndLastSpacesReg, '' as any)
