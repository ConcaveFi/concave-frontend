type Device = 'tablet' | 'mobile' | 'desktop'

export const useDevice = () => {
  const { userAgent } = navigator

  const isMobile =
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      userAgent,
    )
  const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)
  const device: Device = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
  return device
}
