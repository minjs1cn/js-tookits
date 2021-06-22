export function forEach<T>(array: Array<T>, cb: (item: T, index: number, array: Array<T>) => unknown) {
  for (let i = 0; i < array.length; i++) {
    cb(array[i], i, array)
  }
}