import { parse as Parse, stringify } from 'query-string'

const parse = (str: string): { [index: string]: string | null } => Parse(str) as { [index: string]: string }

export {
  parse,
  stringify
}