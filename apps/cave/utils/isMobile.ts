export const isAndroid = () =>
  typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)
export const isSmallIOS = () =>
  typeof navigator !== 'undefined' && /iPhone|iPod/.test(navigator.userAgent)
export const isLargeIOS = () => typeof navigator !== 'undefined' && /iPad/.test(navigator.userAgent)

export const isIOS = () => isSmallIOS() || isLargeIOS()
export const isMobile = () => isAndroid() || isSmallIOS()
