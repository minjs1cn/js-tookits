function parse(str: string | number): object {
  try {
    return JSON.parse(str as string)
  } catch (error) {
    return {}
  }
}

function stringify(json: number | string | object) {
  try {
    return JSON.stringify(json)
  } catch (error) {
    return ''
  }
}

export const json = {
  parse,
  stringify
}