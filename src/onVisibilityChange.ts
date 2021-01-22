import { NOOP } from './constants'

/**
 * 监听页面隐藏或显示
 * @param {Function} hide 页面隐藏做什么
 * @param {Function} show 页面显示做什么
 */
export function addVisibilityChangeListener (hide = NOOP, show = NOOP) {
  const win = window
  let hidden = false
  let hiddenPropName = ''
  const eventListener: Array<Function> = []

  if (typeof document.hidden !== 'undefined') {
    hiddenPropName = 'hidden'
    // @ts-ignore
  } else if (typeof document.mozHidden !== 'undefined') {
    hiddenPropName = 'mozHidden'
    // @ts-ignore
  } else if (typeof document.msHidden !== 'undefined') {
    hiddenPropName = 'msHidden'
    // @ts-ignore
  } else if (typeof document.webkitHidden !== 'undefined') {
    hiddenPropName = 'webkitHidden'
  }

  function onHidden () {
    if (!hidden) {
      hidden = true
      hide()
    }
  }
  // In order to adapt the most of platforms the onshow API.
  function onShown () {
    if (hidden) {
      hidden = false
      show()
    }
  }

  if (hiddenPropName) {
    const changeList = [
      'visibilitychange',
      'mozvisibilitychange',
      'msvisibilitychange',
      'webkitvisibilitychange',
      'qbrowserVisibilityChange'
    ]
    const callback = function (event: Document) {
      let visible: boolean = (document as any)[hiddenPropName]
      // QQ App
      visible = visible || event['hidden']
      if (visible) {
        onHidden()
      } else {
        onShown()
      }
    }
    for (let i = 0; i < changeList.length; i++) {
      // @ts-ignore
      document.addEventListener(changeList[i], callback)
      eventListener.push(() => {
        // @ts-ignore
        document.removeEventListener(changeList[i], callback)
      })
    }
  } else {
    win.addEventListener('blur', onHidden)
    win.addEventListener('focus', onShown)
    eventListener.push(() => {
      win.removeEventListener('blur', onHidden)
    })
    eventListener.push(() => {
      win.removeEventListener('focus', onShown)
    })
  }

  if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
    win.onfocus = onShown
    eventListener.push(() => {
      win.onfocus = null
    })
  }

  if ('onpageshow' in window && 'onpagehide' in window) {
    win.addEventListener('pagehide', onHidden)
    win.addEventListener('pageshow', onShown)
    eventListener.push(() => {
      win.removeEventListener('pagehide', onHidden)
    })
    eventListener.push(() => {
      win.removeEventListener('pageshow', onShown)
    })
    // Taobao UIWebKit
    document.addEventListener('pagehide', onHidden)
    document.addEventListener('pageshow', onShown)
    eventListener.push(() => {
      document.removeEventListener('pagehide', onHidden)
    })
    eventListener.push(() => {
      document.removeEventListener('pageshow', onShown)
    })
  }

  return () => {
    eventListener.forEach(e => e())
  }
}
