/*!
 * 异步加载模块
 * 从远程将模块的css和js下载并执行回调
 */

import { isCrossOrigin } from './is'
import { protectedExecute } from './functional'

/**
 * 加载脚本，返回一个Promise
 * @param {String} url 脚本地址
 */
export const loadScript = (url: string, timeout = 10) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    let timer = 0

    script.charset = 'utf-8'
    timeout = timeout * 1000

    if (isCrossOrigin(url)) {
      script.crossOrigin = 'anonymous'
    }

    script.onload = resolve
    script.onerror = (...args: Array<unknown>) => {
      timer && clearTimeout(timer)
      script.parentNode?.removeChild(script)
      reject(...args)
    }

    script.src = url

    timer = setTimeout(function () {
      reject({ type: 'timeout', target: script })
    }, timeout)

    document.head.appendChild(script)
  })
}

/**
 * 加载样式表，返回一个Promise
 * @param {String} url 样式表地址
 */
const loadCss = (url: string) => {
  return new Promise((resolve, reject) => {
    const linkTag = document.createElement('link')

    linkTag.rel = 'stylesheet'
    linkTag.type = 'text/css'

    if (isCrossOrigin(url)) {
      linkTag.crossOrigin = 'anonymous'
    }

    linkTag.onload = resolve
    linkTag.onerror = (...args: Array<unknown>) => {
      linkTag.parentNode?.removeChild(linkTag)
      reject(...args)
    }

    linkTag.href = url

    document.head.appendChild(linkTag)
  })
}

export interface InstalledChunks {
  [index: string]: Promise<unknown>
}

/**
 * 加载样式表，返回一个Promise
 * @param {String} url 样式表地址
 */
const loadCssChunk = (function () {
  // 对加载css的promise进行缓存，公用一个请求
  const installedCssChunks: InstalledChunks = {}

  return (chunkId: string) => {
    if (installedCssChunks[chunkId]) return installedCssChunks[chunkId]

    return (installedCssChunks[chunkId] = loadCss(chunkId))
  }
})()

/**
 * 加载脚本，返回一个Promise
 * @param {String} url 脚本地址
 */
const loadScriptChunk = (function () {
  // 对加载js对promise进行缓存，公用一个请求
  const installedScriptChunks: InstalledChunks = {}

  return (chunkId: string) => {
    if (installedScriptChunks[chunkId]) return installedScriptChunks[chunkId]

    return (installedScriptChunks[chunkId] = loadScript(chunkId))
  }
})()

/**
 * 获取完整CDN地址
 * @param {String} host CDN
 * @param {String} chunkId 模块id，也是cdn地址的一部分
 * @param {String} suffix 后缀 .css .js
 */
const chunkPath = (host: string, chunkId: string, suffix: string) => `${host}/${chunkId}${suffix}`

/**
 * 加载chunk，返回一个数组，数组第一项为 对象，数组第二项为 清除 chunk 缓存的函数
 * @param {String} host CDN地址
 */
export function useChunkLoader(host: string) {
  const cssUrl = (chunkId: string) => chunkPath(host || '', chunkId, '.css')
  const scriptUrl = (chunkId: string) => chunkPath(host || '', chunkId, '.js')
  // 对加载的模块进行缓存
  const installedChunk: {
    [index: string]: any
  } = {}

  return [
    function loadChunk<T>(id: string, name: string, css = true): Promise<T> {
      if (installedChunk[id]) return Promise.resolve(installedChunk[id])

      return Promise.all([
        loadScriptChunk(scriptUrl(id)),
        // @ts-ignore
        css ? loadCssChunk(cssUrl(id)) : null
      ]).then(() => {
        return (installedChunk[id] = (window as any)[name])
      })
    },
    function (id: string) {
      protectedExecute((installedChunk[id] as any).destory)
      delete installedChunk[id]
    }
  ]
}

/**
 * 加载图片
 */
export const loadImage = (function () {
  const installedImage: {
    [index: string]: Promise<unknown>
  } = {}

  return (url: string, timeout = 5) => {
    if (installedImage[url]) return Promise.resolve(installedImage[url])

    return (installedImage[url] = new Promise((resolve, reject) => {
      const image = new Image()
      let timer: number

      timeout = timeout * 1000

      image.onload = function () {
        timer && clearTimeout(timer)
        resolve(image)
      }

      image.onerror = function (...err: Array<unknown>) {
        timer && clearTimeout(timer)
        reject(...err)
      }

      timer = setTimeout(function () {
        reject({ type: 'timeout', target: image })
      }, timeout)

      image.src = url
    }))
  }
})()
