type CB = (this: Window, ev: Event) => any

export function onOrientationchange(cb: CB) {
  window.addEventListener('orientationchange', cb, false)
}

export function offOrientationchange(cb: CB) {
  window.removeEventListener('orientationchange', cb)
}