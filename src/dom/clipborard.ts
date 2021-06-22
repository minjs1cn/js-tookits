import { appendChild, createElement, removeChild } from './element'
import ClipboardJS from 'clipboard'

export function copy (text: string) {
  const textArea = createElement('textarea') as HTMLTextAreaElement

  textArea.style.cssText =
    'position:fixed;top:0;left:0;width:0.1em;height:0.1em;padding:0;border:none;outline:none;boxShadow:none;background:transparent;'
  textArea.value = text

  appendChild(document.body, textArea)

  const isReadOnly = textArea.hasAttribute('readonly')

  if (!isReadOnly) {
    textArea.setAttribute('readonly', '')
  }

  textArea.select()
  textArea.setSelectionRange(0, textArea.value.length)

  if (!isReadOnly) {
    textArea.removeAttribute('readonly')
  }

  try {
    document.execCommand('copy')
  } catch (err) {}

  removeChild(document.body, textArea)
}

export function setClipboard (text: string, selector = 'body') {
  return new Promise((resolve, reject) => {
    try {
      const cp = new ClipboardJS(selector, {
        text: () => {
          return text
        }
      })
      cp.on('success', function () {
        resolve(text)
        // 复制成功销毁
        cp.destroy()
      })
    } catch (e) {
      reject(e)
    }
  })
}
