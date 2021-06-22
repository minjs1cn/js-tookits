import { NOOP } from "../constant"
import { offBlur, onBlur } from "./onBlur"
import { offDocumentEventListener, onDocumentEventListener } from "./onDocumentEventListener"
import { offFocus, onFucus } from "./onFocus"
import { offPageHide, onPagehide } from "./onPageHide"
import { offPageShow, onPageShow } from "./onPageShow"

export function onVisibilityChange(hide = NOOP, show = NOOP) {
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
      onDocumentEventListener(changeList[i], callback)
      eventListener.push(() => {
        // @ts-ignore
        offDocumentEventListener(changeList[i], callback)
      })
    }
  } else {
    onBlur(onHidden)
    onFucus(onShown)
    eventListener.push(() => {
      offBlur(onHidden)
    })
    eventListener.push(() => {
      offFocus(onShown)
    })
  }

  if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
    win.onfocus = onShown
    eventListener.push(() => {
      win.onfocus = null
    })
  }

  if ('onpageshow' in window && 'onpagehide' in window) {
    onPageShow(onShown)
    onPagehide(onHidden)
    eventListener.push(() => {
      offPageHide(onHidden)
    })
    eventListener.push(() => {
      offPageShow(onShown)
    })
  }

  return () => {
    eventListener.forEach(e => e())
  }
}