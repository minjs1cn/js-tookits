export const ua = navigator.userAgent
export const platform = navigator.platform

/** windows系统 */
export const isWindows = (/Windows/).test(ua)

/** ios系统 */
export const isiOs = ((/Mac OS/).test(ua) && !((/like Mac OS/).test(ua)) && (navigator.maxTouchPoints && navigator.maxTouchPoints > 2)) || (/iP[ao]d|iPhone/i).test(ua)

/** ipad设备 */
export const isiPad = isiOs || ua.toLowerCase().indexOf('ipad') !== -1

/** macOs系统 */
export const ismacOs = (/Mac OS/).test(ua) && !((/like Mac OS/).test(ua)) && (!navigator.maxTouchPoints || (navigator.maxTouchPoints && navigator.maxTouchPoints <= 2))

/** 安卓设备 */
export const isAndroid = (/Android/).test(ua)

/** linux系统 */
export const isLinux = (/Linux/).test(ua)

/** iphone设备 */
export const isiPhone = ua.toLowerCase().indexOf('iphone') !== -1

/** mac设备 */
export const isMacIntel = (/MacIntel/).test(platform)

/** 电脑桌面 */
export const isDesktop = isWindows || isMacIntel || ismacOs

/** 微信浏览器 */
export const isWechatBrowser = (/micromessenger/i).test(ua)

/** 微信小程序浏览器 */
export const isWechatMiniProgram = (/miniprogram/i).test(ua)

/** 支付宝浏览器 */
export const isAlipayBrowser = /alipay/i.test(ua)

/** qq浏览器 */
export const isQQBrowser = /qq/i.test(ua)