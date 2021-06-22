import { appendChild, createElement, removeChild } from '../dom'
import { isCrossOrigin } from '../env'

export function loadCss (url: string) {
  return new Promise((resolve, reject) => {
    const linkTag = createElement('link') as HTMLLinkElement

    linkTag.rel = 'stylesheet'
    linkTag.type = 'text/css'

    if (isCrossOrigin(url)) {
      linkTag.crossOrigin = 'anonymous'
    }

    linkTag.addEventListener('load', resolve)

    linkTag.addEventListener('error', (err: ErrorEvent) => {
      linkTag.removeEventListener('load', resolve)
      removeChild(document.head, linkTag)
      reject(err)
    })

    linkTag.href = url

    appendChild(document.head, linkTag)
  })
}
