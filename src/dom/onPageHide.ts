type CB = (this: Window, ev: PageTransitionEvent) => any

export function onPagehide(cb: CB) {
  window.addEventListener('pagehide', cb, false)
}

export function offPageHide(cb: CB) {
  window.removeEventListener('pagehide', cb)
}