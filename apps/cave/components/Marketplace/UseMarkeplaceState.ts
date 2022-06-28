import { useQuery } from 'react-query'
import { fechMarketInfo, listUserPositions } from '@concave/marketplace'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { NEXT_PUBLIC_ALCHEMY_ID } from 'lib/env.conf'

export const useMarketplaceDashbord = () => {
  const chainId = useCurrentSupportedNetworkId()
  const [owner, setOwner] = useState('0x8522093305253EfB2685241dc0C587CDD9B10e4B')
  const { data, isLoading } = useQuery(
    ['sales', owner, chainId],
    async () => {
      const provider = concaveProvider(chainId)
      const tokens = await listUserPositions(owner, provider, NEXT_PUBLIC_ALCHEMY_ID)
      const marketInfos = await Promise.all(
        tokens.map(async (t) => {
          return fechMarketInfo(provider, t)
        }),
      )
      return marketInfos.filter((m) => m.isListed)
    },
    { enabled: !!owner && !!chainId },
  )
  const salePositions = data || []
  return {
    isLoading,
    salePositions,
    owner,
    setOwner,
  }
}
