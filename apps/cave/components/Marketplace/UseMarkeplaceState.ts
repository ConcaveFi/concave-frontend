import { listListedPositions } from '@concave/marketplace'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'

export const useMarketplaceDashbord = () => {
  const chainId = useCurrentSupportedNetworkId()
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
  }
}
