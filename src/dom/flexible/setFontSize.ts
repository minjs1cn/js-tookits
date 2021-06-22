import { Flexible } from "./Flexible"

export function setFontSize(flexible: Flexible) {
  const { adapterWidth, dpr, ratio, fs } = flexible
  const el = document.documentElement
  const width = el.clientWidth

  // 计算根元素大小
  const newRem = (width / adapterWidth) * dpr * ratio
  // 根元素大小发生改变
  if (newRem !== fs) {
    // 缓存
    flexible.setFs(newRem)
    // 设置根节点 font-size (基准)
    el.style.fontSize = `${newRem}px`
  }
}