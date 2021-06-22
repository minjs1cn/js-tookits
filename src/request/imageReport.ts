import { createElement } from '../dom'

export function imageReport (url: string, timeout = 3000) {
  return new Promise((resolve, reject) => {
    let image: HTMLImageElement | null = createElement('img') as HTMLImageElement

    let isTimeout = false

    image.onload = function () {
      if (isTimeout) return
      image = null
      resolve('success')
    }

    image.onerror = function () {
      if (isTimeout) return
      image = null
      reject(Error('error'))
    }

    setTimeout(() => {
      isTimeout = true
      image = null
      reject(Error('timeout'))
    }, timeout)

    image.src = url
  })
}
