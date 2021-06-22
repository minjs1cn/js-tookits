export const isLocalStorageSupported = (function () {
  let _isLocalStorageSupported: boolean

  return () => {
    if (_isLocalStorageSupported !== undefined) {
      return _isLocalStorageSupported
    }

    const key = '_ls_test'

    try {
      window.localStorage.setItem(key, '1')
      window.localStorage.removeItem(key)
      _isLocalStorageSupported = true
    } catch (e) {
      _isLocalStorageSupported = false
    }

    return _isLocalStorageSupported
  }
})()
