import { onPageShow } from '../onPageShow'
import { onResize } from '../onResize'
import { setFontSize } from './setFontSize'
import { setPcMode } from './setPcMode'
import { setViewPort } from './viewport'

export class Flexible {
  /** 设计稿宽度 */
  designWidth = 0
  /** 适配器宽度 */
  adapterWidth = 0
  /** devicePixelRatio */
  readonly dpr: number = 2
  /** 缩放比 */
  readonly ratio: number = 100
  /** 根元素字体大小 */
  fs = 0

  init (aw: number, dw: number, pc = true) {
    this.adapterWidth = aw
    this.designWidth = dw

    const set = () => {
      setFontSize(this)
      if (pc) {
        setPcMode(this.adapterWidth)
      }
    }
    onPageShow(set)
    onResize(set)
  }

  setViewPort () {
    setViewPort()
  }

  /**
   * 设置根元素字体大小
   */
  setFs (fs: number) {
    this.fs = fs
  }

  px2rem (v: string | number) {
    return parseFloat(v + '') / ((this.dpr * this.ratio / this.adapterWidth) * this.designWidth)
  }

  rem2px (v: string | number) {
    return this.fs && parseFloat(v + '') * this.fs * this.dpr
  }
}
