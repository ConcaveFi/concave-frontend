import { ACNV_CONTRACT, BBTCNV_CONTRACT } from '@concave/core'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount, useBalance } from 'wagmi'

export default function useVestedTokens() {
  const { address } = useAccount()
  const networkId = useCurrentSupportedNetworkId()
  const { data: bbtCNVData, isLoading: loadingACNV } = useBalance({
    addressOrName: address,
    token: BBTCNV_CONTRACT[networkId],
  })
  // aCNV token it's not deployed on rinkeby, so it's better pass the
  // networkd hardcoded intead using the networkId
  const { data: aCNVData, isLoading: loadingBBTCNV } = useBalance({
    addressOrName: address,
    token: ACNV_CONTRACT[1],
  })

  return {
    aCNV: { data: aCNVData, isLoading: loadingACNV },
    bbtCNV: { data: bbtCNVData, isLoading: loadingBBTCNV },
  }
}
