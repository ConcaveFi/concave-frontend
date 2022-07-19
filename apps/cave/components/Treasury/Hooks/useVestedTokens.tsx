import { ACNV_ADDRESS, BBTCNV_ADDRESS, PCNV_CONTRACT } from '@concave/core'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount, useBalance } from 'wagmi'

export default function useVestedTokens() {
  const { address } = useAccount()
  const networkId = useCurrentSupportedNetworkId()
  const { data: bbtCNVData, isLoading: loadingBBTCNV } = useBalance({
    addressOrName: address,
    token: BBTCNV_ADDRESS[networkId],
  })
  // aCNV token it's not deployed on rinkeby, so it's better pass the
  // networkd hardcoded intead using the networkId
  const { data: aCNVData, isLoading: loadingACNV } = useBalance({
    addressOrName: address,
    token: ACNV_ADDRESS[networkId],
  })

  const { data: pCNVData, isLoading: loadingPCNV } = useBalance({
    addressOrName: address,
    token: PCNV_CONTRACT[networkId],
  })

  return {
    aCNV: { data: aCNVData, isLoading: loadingACNV },
    bbtCNV: { data: bbtCNVData, isLoading: loadingBBTCNV },
    pCNV: { data: pCNVData, isLoading: loadingPCNV },
  }
}
