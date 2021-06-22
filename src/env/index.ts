export * from './os'
export * from './isLocalStorageSupported'

export const isCrossOrigin = (url: string) => url.indexOf(window.location.origin) === -1
