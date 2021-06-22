export const encode = (url: string | number | boolean) => {
  try {
    return encodeURIComponent(url)
  } catch (err) {
    return ''
  }
}
