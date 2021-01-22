// 缓存根元素字体大小
let rem: number | undefined

// 设计尺寸
let designWidth = 750
// 适配尺寸
let adaptWidth = 750

// dpr 固定为 2，非真实dpr，因为真实资源都是按照dpr为2导出的
const dpr = 2

// 放大100倍
const r = 100

/**
 * 初始化 rem (设置基准值)
 */
export function init (aw = 640, dw = 750) {
  const el = document.documentElement

  // 避免重复初始化
  if (rem) {
    return
  }

  // 做个缓存
  adaptWidth = aw
  designWidth = dw

  // 这个设置没什么意义，看看就行
  el.setAttribute('data-dpr', dpr + '')

  function setRem () {
    let width = el.clientWidth

    // 计算根元素大小
    const newRem = (width / adaptWidth) * dpr * r
    // 根元素大小发生改变
    if (newRem !== rem) {
      // 缓存
      rem = newRem
      // 设置根节点 font-size (基准)
      el.style.fontSize = `${rem}px`
    }
  }

  // pc情况下，让body居中，方便开发
  function pc (width: number) {
    if (!navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) && el.clientWidth > 1024) {
      setTimeout(() => {
        document.body.style.margin = '0 auto'
        document.body.style.maxWidth = `${width}px`
      }, 0)
    }
  }

  // pc情况
  pc(adaptWidth)
  // 第一次初始化设置根元素字体大小
  setRem()

  // 事件监听
  window.addEventListener('pageshow', setRem, false)
  window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', setRem, false)
}

/**
 * px -> rem 转换
 * @param { number | string} v 如：200 或 '200px'
 */
export function px2rem (v: string | number) {
  return parseFloat(v + '') / ((dpr * r / adaptWidth) * designWidth)
}

/**
 * rem -> px 转换
 * @param { number | string} v 如：5 或 '5rem'
 */
export function rem2px (v: string | number) {
  return rem && parseFloat(v + '') * rem * dpr
}

/**
 * 获取根元素字体大小
 */
export function getFontSize () {
  return rem
}

/**
 * 获取当前用的dpr
 */
export const designDpr = dpr

/**
 * 获取设计尺寸
 */
export function getDesignWidth () {
  return designWidth
}

/**
 * 设置禁止缩放
 */
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

  const meta = document.createElement('meta')
  meta.name = 'viewport'
  meta.content = content
  const head = document.documentElement.firstElementChild
  if (head) {
    head.appendChild(meta)
  }
}
