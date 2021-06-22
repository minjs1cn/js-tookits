import { appendChild, removeChild } from '../dom'
import { isCrossOrigin } from '../env'

export function loadScript (url: string, timeout = 0) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    const timer = timeout && setTimeout(function () {
      reject(Error('timeout'))
    }, timeout)

    script.charset = 'utf-8'

    if (isCrossOrigin(url)) {
      script.crossOrigin = 'anonymous'
    }

    script.addEventListener('load', () => {
      timer && clearTimeout(timer)
      resolve(script)
    })

    script.addEventListener('error', (err: ErrorEvent) => {
      timer && clearTimeout(timer)
      script.removeEventListener('load', resolve)
      removeChild(document.head, script)
      reject(err)
    })

    script.src = url
    appendChild(document.head, script)
  })
}
