type CB = (this: Window, ev: UIEvent) => any

export function onResize(cb: CB) {
  window.addEventListener('resize', cb, false)
}

export function offResize(cb: CB) {
  window.removeEventListener('resize', cb)
}