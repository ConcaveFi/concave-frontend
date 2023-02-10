import { detect } from 'detect-browser'

const detectEnv = (userAgent?: string) => detect(userAgent)
const detectOS = (env = detectEnv()) => env.os.toLowerCase()

const isAndroid = (os = detectOS()) => os.includes('android')
const isIOS = (os = detectOS()) =>
  os.includes('ios') || (os.includes('mac') && navigator.maxTouchPoints > 1)

export const isMobile = () => isAndroid() || isIOS()
