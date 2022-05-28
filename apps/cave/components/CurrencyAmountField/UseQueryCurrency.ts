import { fetchTokenData } from 'hooks/useTokenList'
import { concaveProvider } from 'lib/providers'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useQueryCurrency = () => {
  const router = useRouter()
  const query = router.isReady ? router.query : {}
  return useQuery(
    ['useQueryCurrency'],
    async () => {
      const params = {
        chainID: Array.isArray(query.chainId) ? query.chainId[0] : query.chainId,
        currency0: Array.isArray(query.currency0) ? query.currency0[0] : query.currency0,
        currency1: Array.isArray(query.currency1) ? query.currency1[0] : query.currency1,
      }
      const provider = concaveProvider(+params.chainID)
      const currency0 = fetchTokenData(params.chainID, params.currency0, provider)
      const currency1 = fetchTokenData(params.chainID, params.currency1, provider)
      return { currency0: await currency0, currency1: await currency1 }
    },
    { enabled: router.isReady && !!query.chainId && (!!query.currency0 || !!query.currency1) },
  )
}
