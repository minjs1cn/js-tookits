import { getFastValue, json } from '../object'
import { qs } from '../url'

type TXhrMethod = 'GET' | 'POST'
interface IXhrOptions<T> extends Record<string, unknown> {
  baseUrl?: string
  method?: TXhrMethod,
  data?: Record<string, string | number | boolean>
  url: string
  async?: boolean
  timeout?: number
  success?: (res: T) => void
  error?: (error: Error) => void
}

function ajax<T> (options: IXhrOptions<T>) {
  options.method = getFastValue(options, 'method', 'GET') as TXhrMethod
  options.baseUrl = getFastValue(options, 'baseUrl', '') as string
  const xhr = new XMLHttpRequest()
  const data = getFastValue(options, 'data', {}) as Record<string, string | number | boolean>
  const params = qs.stringify(data)
  const timeout = getFastValue(options, 'timeout', 3000) as number
  let url = options.baseUrl + options.url
  let isTimeout = false

  function onTimeOut () {
    isTimeout = true
  }

  const timer = timeout && setTimeout(onTimeOut, timeout)

  function cTimeout () {
    timer && clearTimeout(timer)
  }

  if (options.method === 'GET') {
    url += '?' + params
  }

  xhr.open(options.method, url, options.async || true)

  xhr.onreadystatechange = function () {
    if (isTimeout) {
      options.error && options.error(Error('timeout'))
      return
    }

    if (xhr.readyState === 4 && xhr.status === 200) {
      cTimeout()
      const res = json.parse(xhr.responseText) as unknown as T
      options.success && options.success(res)
    }
  }

  if (options.method === 'POST') {
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify(data))
    return
  }

  xhr.send()
}

export function xhr<T> (options: IXhrOptions<T>) {
  return ajax(options)
}

xhr.get = function<T> (url: string, options: Omit<IXhrOptions<T>, 'url'>): Promise<T> {
  return new Promise((resolve, reject) => {
    xhr({
      url,
      ...options,
      method: 'GET',
      success: resolve,
      error: reject
    })
  })
}

xhr.post = function<T> (url: string, options: Omit<IXhrOptions<T>, 'url'>): Promise<T> {
  return new Promise((resolve, reject) => {
    xhr({
      url,
      ...options,
      method: 'POST',
      success: resolve,
      error: reject
    })
  })
}
