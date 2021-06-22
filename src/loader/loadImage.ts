export const loadImage = (url: string, timeout = 0) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const timer = timeout && setTimeout(function () {
      reject(Error('timeout'))
    }, timeout)

    image.addEventListener('load', () => {
      timer && clearTimeout(timer)
      resolve(image)
    })

    image.addEventListener('error', (err: ErrorEvent) => {
      timer && clearTimeout(timer)
      reject(err)
    })

    image.src = url
  })
}
