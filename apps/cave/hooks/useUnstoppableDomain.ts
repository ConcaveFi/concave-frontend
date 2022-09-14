import Resolution, { UnsLocation } from '@unstoppabledomains/resolution'
import ms from 'ms'
import { useQuery } from 'react-query'

const resolution = new Resolution()

/**
 * resolves address to Unstoppable Domains domain
 */
export const useUnstoppableDomain = ({
  address,
  location = UnsLocation.Layer2,
  enabled = true,
  staleTime = ms('20s'),
  cacheTime = undefined,
}) => {
  return useQuery(['ud', address], () => resolution.reverse(address, { location }), {
    enabled,
    staleTime,
    cacheTime,
  })
}
