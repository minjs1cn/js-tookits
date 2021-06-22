import { loadScript } from './loadScript'

interface IInstalledChunks {
  [index: string]: Promise<unknown>
}

export const loadScriptChunk = (function () {
  // 对加载css的promise进行缓存，公用一个请求
  const installedScriptChunks: IInstalledChunks = {}

  return (chunkId: string) => {
    if (installedScriptChunks[chunkId]) return installedScriptChunks[chunkId]

    return (installedScriptChunks[chunkId] = loadScript(chunkId))
  }
})()
