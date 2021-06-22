export function onDocumentEventListener(eventName: string, cb: any) {
  document.addEventListener(eventName, cb)
}

export function offDocumentEventListener(eventName: string, cb: any) {
  document.removeEventListener(eventName, cb)
}