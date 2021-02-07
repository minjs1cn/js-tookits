import { encode, decode } from './url'

interface Result { [index: string]: string | number | undefined | null }

function parse(query: string): Result {

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
  }, {} as Result)
}

function stringify(params: Result) {
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