import { loadCssChunk } from './loadCssChunk'
import { loadScriptChunk } from './loadScriptChunk'

const chunkPath = (host: string, chunkId: string, suffix: string) => `${host}/${chunkId}${suffix}`

interface IChunkModule {
  destory?: () => void
  [index: string]: unknown
}

/**
 * 加载chunk，返回一个数组，数组第一项为 对象，数组第二项为 清除 chunk 缓存的函数
 * @param {String} host CDN地址
 */
export function useChunkLoader<T extends IChunkModule> (host: string) {
  const cssUrl = (chunkId: string) => chunkPath(host || '', chunkId, '.css')
  const scriptUrl = (chunkId: string) => chunkPath(host || '', chunkId, '.js')
  // 对加载的模块进行缓存
  const installedChunk: {
    [index: string]: T
  } = {}

  return [
    function loadChunk (id: string, name: string, css = true): Promise<T> {
      if (installedChunk[id]) return Promise.resolve(installedChunk[id])

      return Promise.all([
        loadScriptChunk(scriptUrl(id)),
        css ? loadCssChunk(cssUrl(id)) : null
      ]).then(() => {
        return (installedChunk[id] = (window as any)[name])
      })
    },
    function (id: string) {
      installedChunk[id].destory && installedChunk[id].destory?.()
      delete installedChunk[id]
    }
  ] as const
}
