type CB = (this: Window, ev: PageTransitionEvent) => any

export function onPageShow(cb: CB) {
  window.addEventListener('pageshow', cb, false)
}

export function offPageShow(cb: CB) {
  window.removeEventListener('pageshow', cb)
}