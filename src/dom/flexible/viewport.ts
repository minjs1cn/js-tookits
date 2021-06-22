import { createElement, appendChild } from '../element'

export function setViewPort () {
  const metas = document.getElementsByTagName('meta')
  const content = 'width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no'
  
  if (metas && metas.length) {
    for (let i = 0; i < metas.length; i++) {
      const meta = metas[i]
      if (meta.name === 'viewport') {
        meta.content = content
        return
      }
    }
  }

  const meta = createElement('meta') as HTMLMetaElement
  meta.name = 'viewport'
  meta.content = content
  const head = document.documentElement.firstElementChild
  if (head) {
    appendChild(head, meta)
  }
}