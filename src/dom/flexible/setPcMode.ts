import { isAndroid, isiPhone } from '../../env'

export function setPcMode (adapterWidth: number) {
  const el = document.documentElement
  if (isAndroid || isiPhone || el.clientWidth < 768) return

  document.body.style.margin = '0 auto'
  document.body.style.maxWidth = `${adapterWidth}px`
}
