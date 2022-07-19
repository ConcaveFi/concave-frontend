import { listListedPositions } from '@concave/marketplace'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useQuery } from 'react-query'

export const useMarketplaceDashbord = () => {
  const chainId = useCurrentSupportedNetworkId()
  const [owner, setOwner] = useState('0x8522093305253EfB2685241dc0C587CDD9B10e4B')
  const { data, isLoading, isFetching } = useQuery(
    ['sales', chainId],
    async () => {
      const provider = concaveProvider(chainId)
      const result = await listListedPositions({ provider })
      return result
    },
    { enabled: !!chainId },
  )
  const salePositions = data || []
  return {
    isLoading,
    isFetching,
    salePositions,
    owner,
    setOwner,
  }
}
