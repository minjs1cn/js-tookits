import { loadCss } from './loadCss'

interface IInstalledChunks {
  [index: string]: Promise<unknown>
}

export const loadCssChunk = (function () {
  // 对加载css的promise进行缓存，公用一个请求
  const installedCssChunks: IInstalledChunks = {}

  return (chunkId: string) => {
    if (installedCssChunks[chunkId]) return installedCssChunks[chunkId]

    return (installedCssChunks[chunkId] = loadCss(chunkId))
  }
})()
