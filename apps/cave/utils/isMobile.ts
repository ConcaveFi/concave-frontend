import { detect } from 'detect-browser'

export const detectEnv = (userAgent?: string) => detect(userAgent)
export const detectOS = (env = detectEnv()) => env.os.toLowerCase()

export const isAndroid = (os = detectOS()) => os.includes('android')
export const isIOS = (os = detectOS()) =>
  os.includes('ios') || (os.includes('mac') && navigator.maxTouchPoints > 1)

export const isMobile = () => isAndroid() || isIOS()
