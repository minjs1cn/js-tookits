import { isObject } from './is'

const whitespaceRE = /\s+/

/**
 * 给元素添加className
 * @param {Element} el dom元素
 * @param {string} cls className字符串，支持多个用空格分开
 */
export function addClass (el: HTMLElement, cls: string) {
  if (!cls || !(cls = cls.trim())) {
    return
  }

  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(c => el.classList.add(c))
    } else {
      el.classList.add(cls)
    }
  } else {
    const cur = ` ${el.getAttribute('class') || ''} `
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim())
    }
  }
}

/**
 * 给元素移除className
 * @param {Element} el dom元素
 * @param {string} cls className字符串，支持多个用空格分开
 */
export function removeClass (el: HTMLElement, cls: string) {
  if (!cls || !(cls = cls.trim())) {
    return
  }

  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(c => el.classList.remove(c))
    } else {
      el.classList.remove(cls)
    }
    if (!el.classList.length) {
      el.removeAttribute('class')
    }
  } else {
    let cur = ` ${el.getAttribute('class') || ''} `
    const tar = ' ' + cls + ' '
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ')
    }
    cur = cur.trim()
    if (cur) {
      el.setAttribute('class', cur)
    } else {
      el.removeAttribute('class')
    }
  }
}

/**
 * 设置元素属性
 * @param {Element} el dom元素
 * @param {String|Object} attr 属性
 * @param {?Attribute} value 值
 */
export function setElementStyle (el: HTMLElement, attr: string | object, value: string) {
  if (!el) return

  let attrs = {}

  if (isObject(attr)) {
    attrs = attr
  } else {
    // @ts-ignore
    attrs[attr] = value
  }
  // @ts-ignore
  const styles = []
  Object.keys(attrs).forEach(key => {
    // @ts-ignore
    styles.push(`${key}:${attrs[key]}`)
  })
  // @ts-ignore
  el.style.cssText += styles.join(';')
}

/**
 * 获取元素属性
 * @param {Element} el dom元素
 * @param {ElementCSSInlineStyle} attr 属性
 */
export function getElementStyle (el: HTMLElement, attr: any) {
  return el.style[attr]
}

export function setElementData (el: HTMLElement, name: string, str: string) {
  el.dataset.name = str
}

export function getElementData (el: HTMLElement, name: string) {
  return el.dataset[name]
}

export function querySelector (selector: string) {
  return document.querySelector(selector)
}

/**
 * 添加HTMLElement
 * @param {HTMLElement} parent
 * @param {HTMLElement} el
 */
export function append (parent: HTMLElement, el: any) {
  parent.appendChild(el)

  if (
    el.nodeName != null &&
    el.nodeName.toUpperCase() === 'SCRIPT' &&
    (!el.type || el.type === 'text/javascript') &&
    !el.src
  ) {
    var target = el.ownerDocument ? el.ownerDocument.defaultView : window
    // eslint-disable-next-line no-useless-call
    target['eval'].call(target, el.innerHTML)
  }
}

/**
 * 移除HTMLElement
 * @param {HTMLElement} el
 */
export function removeChild (el: HTMLElement) {
  el.parentNode?.removeChild(el)
}

/**
 * 创建DOM元素
 * @param {String} html html字符串
 */
export function createNode (html: string) {
  let div: HTMLElement | null = document.createElement('div')
  div.innerHTML = html
  const node = div.childNodes[0]
  div = null
  return node
}

/**
 * 操作DOM元素
 * @param {HTMLElement}  node dom节点
 */
export function handleDom (node: HTMLElement, { key, value }: {  key: any, value: string}) {
  node.style[key] = value
}

/**
 * 样式对象转字符串
 * @param {Object} styles 样式对象
 */
export function style2str (styles: object) {
  return Object.keys(styles)
    .reduce((result, key) => {
      // @ts-ignore
      result.push(`${key}:${styles[key]}`)
      return result
    }, [])
    .join(';')
}
