export function createElement (tagName: keyof HTMLElementTagNameMap, options?: ElementCreationOptions) {
  return document.createElement(tagName, options)
}

export function appendChild (parent: Element, child: Element) {
  parent.appendChild(child)
}

export function removeChild (parent: Element, child: Element) {
  parent.removeChild(child)
}
