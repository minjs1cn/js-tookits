import { forEach } from '../array'
import { decode, encode, trim } from '../string'

function parse<T> (query: string = location.search): T {
  const ret = Object.create(null)
  query = trim(query)

  if (query === '') return ret

  let temp = query.split('?')

  if (temp.length > 1) {
    query = temp[temp.length - 1] as string
  }
  query = query.replace(/^[?#&]/, '')

  temp = query.split('#')

  query = temp[0]

  forEach(query.split('&'), function (item) {
    const kvs = item.split('=')
    ret[kvs[0]] = decode(kvs[1])
  })

  return ret
}

function stringify (params: Record<string, string | number | boolean>) {
  const keys = Object.keys(params)
  const ret: string[] = []

  forEach<string>(keys, function (key) {
    ret.push(`${encode(key)}=${encode(params[key])}`)
  })

  return ret.join('&')
}

export const qs = {
  parse,
  stringify
}
