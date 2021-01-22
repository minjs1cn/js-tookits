export const ua = navigator.userAgent
export const platform = navigator.platform
export const devicePixelRatio = window.devicePixelRatio

/**
 * 是否是原生对象(即：原生支持)
 * @param {*} Ctor 构造函数
 */
export const isNative = (Ctor: Function) =>
  typeof Ctor === 'function' && /native code/i.test(Ctor.toString())

/**
 * 是否原生支持 Proxy
 */
export const hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy)

/**
 * 是否是 Android 系统
 */
export const isAndroid = ua && /android/i.test(ua)

/**
 * 是否是 IOS 系统
 */
export const isIOS = ua && /iphone|ipad|ipod|ios/i.test(ua)

/**
 * 型号是否是 Apple 10+
 */
export const isAppleX = ua && isIOS && window.screen.height >= 812

/**
 * 是否是QQ浏览器
 */
export const isQQ = ua && /qq/i.test(ua)

/**
 * 是否是微信浏览器
 */
export const isWechat = ua && /micromessenger/i.test(ua)

/**
 * 是否是支付宝浏览器
 */
export const isAlipay = ua && /alipay/i.test(ua)

/**
 * 是否是 mac 环境
 */
export const isMac = platform && /mac/i.test(platform)

/**
 * 是否是 windows 环境
 */
export const isWin = platform && /win/i.test(platform)

/**
 * 是否支持LocalStorage
 */
export const isLocalStorageSupported = (function () {
  let _isLocalStorageSupported: boolean

  return () => {
    if (_isLocalStorageSupported !== undefined) {
      return _isLocalStorageSupported
    }

    const key = '_ls_test'

    try {
      window.localStorage.setItem(key, '1')
      window.localStorage.removeItem(key)
      _isLocalStorageSupported = true
    } catch (e) {
      _isLocalStorageSupported = false
      // https://stackoverflow.com/questions/21159301/quotaexceedederror-dom-exception-22-an-attempt-was-made-to-add-something-to-st
    }

    return _isLocalStorageSupported
  }
})()

/**
 * -- 根据设备运动信息进行操作
 * DeviceMotionEvent 加速度
 * DeviceOrientationEvent 指南针
 * -- 兼容性
 * 安卓基本支持
 * ios支持更好，但是需要https才能触发事件
 */

/**
 * 是否支持加速度
 */
export const isDeviceMotionSuported = !!window.DeviceMotionEvent

/**
 * 是否支持角速度/指南针
 */
export const isDeviceOrientationSuported = !!window.DeviceOrientationEvent
