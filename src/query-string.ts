import { encode, decode } from './url'

interface StringifyParams{ [index: string]: string | number | undefined | null }

interface ParseResult { [index: string]: string }

function parse(query: string): ParseResult {

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof query !== 'string') {
		return ret;
	}

	query = query.trim().replace(/^[?#&]/, '');

	if (!query) {
		return ret;
  }
  let kvs

  return query.split('&').reduce((res, kv) => {
    kvs = kv.split('=')
    res[kvs[0]] = decode(kvs[1])
    return res
  }, {} as ParseResult)
}

function stringify(params: StringifyParams) {
  let value
  let v

  return Object.keys(params)
    .map(key => {
      v = params[key]

      value = v === null || v === undefined ? '' : v

      return `${key}=${encode(value as string)}`
    })
    .join('&')
}

export {
  parse,
  stringify
}