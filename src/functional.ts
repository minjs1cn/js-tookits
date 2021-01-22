import { isFunction } from './is'

/**
 * 保护函数执行
 * @param {Function} fn 需要执行的函数
 */
export function protectedExecute (fn: Function) {
  if (isFunction(fn)) fn()
}

/**
 * 组合函数
 * @param  {...Function} fns 函数集合
 */
export function compose (...fns: Array<Function>) {
  return (value: unknown) => {
    return fns.reverse().reduce((result, fn) => {
      return fn(result)
    }, value)
  }
}

/**
 * 管道函数，和组合函数的区别是函数的执行顺序
 * @param  {...Function} fns 函数集合
 */
export function pipe (...fns: Array<Function>) {
  return (value: unknown) => {
    return fns.reduce((result, fn) => {
      return fn(result)
    }, value)
  }
}

/**
 * 柯里化函数
 * @param {Function} fn 被柯里化的函数
 * @param  {...unknown} args 参数
 */
export function curry (fn: Function, ...args: Array<unknown>) {
  let _args = args || []

  return (...args: Array<unknown>) => {
    _args = _args.concat(args)

    if (_args.length < fn.length) return curry(fn, ..._args)

    // 参数凑齐 执行
    // @ts-ignore
    return fn.apply(this, _args)
  }
}
