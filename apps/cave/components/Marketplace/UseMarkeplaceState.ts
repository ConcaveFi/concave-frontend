<<<<<<< HEAD
<<<<<<< HEAD
import { useQuery } from 'react-query'
import { fechMarketInfo, listUserPositions } from '@concave/marketplace'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { NEXT_PUBLIC_ALCHEMY_ID } from 'lib/env.conf'
=======
import { fechMarketInfo, listUserPositions } from '@concave/marketplace'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { NEXT_PUBLIC_ALCHEMY_ID } from 'lib/env.conf'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useQuery } from 'react-query'
>>>>>>> 487c38971d9fa0eb17e5b5902f30c56b7cd08383
=======
import { fechMarketInfo, listUserPositions } from '@concave/marketplace'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useQuery } from 'react-query'
>>>>>>> 5b8c2fabfe3fdf2264e3679e12c51bb9e925fec1

export const useMarketplaceDashbord = () => {
  const chainId = useCurrentSupportedNetworkId()
  const [owner, setOwner] = useState('0x8522093305253EfB2685241dc0C587CDD9B10e4B')
  const { data, isLoading, isFetching } = useQuery(
    ['sales', owner, chainId],
    async () => {
      const provider = concaveProvider(chainId)
<<<<<<< HEAD
      const tokens = await listUserPositions(owner, provider, NEXT_PUBLIC_ALCHEMY_ID)
      const marketInfos = await Promise.all(
        tokens.map(async (t) => {
          return fechMarketInfo(provider, t)
        }),
      )
=======
      const tokens = await listUserPositions({ owner, provider })
      const marketInfos = await Promise.all(tokens.map(async (t) => fechMarketInfo(provider, t)))
>>>>>>> 5b8c2fabfe3fdf2264e3679e12c51bb9e925fec1
      return marketInfos.filter((m) => m.isListed)
    },
    { enabled: !!owner && !!chainId },
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
