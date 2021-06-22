type CB = (this: Window, ev: FocusEvent) => any

export function onBlur(cb: CB) {
  window.addEventListener('blur', cb, false)
}

export function offBlur(cb: CB) {
  window.removeEventListener('blur', cb)
}