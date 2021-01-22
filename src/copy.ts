/**
 * 文本复制方法 ⚠️只有用户在页面发生过用户行为才可生效
 * @param {String} text 需要复制的文本
 * 兼容性与更详细内容请看链接
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand
 * https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript/30810322#30810322
 */

export const copy = (text: string) => {
  const textArea = document.createElement('textarea')
  textArea.style.cssText =
    'position:fixed;top:0;left:0;width:0.1em;height:0.1em;padding:0;border:none;outline:none;boxShadow:none;background:transparent;'
  textArea.value = text
  document.body.appendChild(textArea)
  const isReadOnly = textArea.hasAttribute('readonly')
  if (!isReadOnly) {
    textArea.setAttribute('readonly', '')
  }
  // eslint-disable-next-line builtin-compat/no-incompatible-builtins
  textArea.select()
  textArea.setSelectionRange(0, textArea.value.length)
  if (!isReadOnly) {
    textArea.removeAttribute('readonly')
  }
  try {
    document.execCommand('copy')
  } catch (err) {}
  document.body.removeChild(textArea)
}
