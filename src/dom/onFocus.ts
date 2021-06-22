type CB = (this: Window, ev: FocusEvent) => any

export function onFucus(cb: CB) {
  window.addEventListener('focus', cb, false)
}

export function offFocus(cb: CB) {
  window.removeEventListener('focus', cb)
}