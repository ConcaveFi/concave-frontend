import { ACNV_ADDRESS, BBTCNV_ADDRESS, PCNV_ADDRESS } from '@concave/core'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount, useBalance } from 'wagmi'

export default function useVestedTokens() {
  const { address } = useAccount()
  const networkId = useCurrentSupportedNetworkId()
  const { data: bbtCNVData, isLoading: loadingBBTCNV } = useBalance({
    address: address,
    token: BBTCNV_ADDRESS[networkId],
  })

  const { data: aCNVData, isLoading: loadingACNV } = useBalance({
    address: address,
    token: ACNV_ADDRESS[networkId],
  })

  const { data: pCNVData, isLoading: loadingPCNV } = useBalance({
    address: address,
    token: PCNV_ADDRESS[networkId],
  })

  return {
    aCNV: { data: aCNVData, isLoading: loadingACNV },
    bbtCNV: { data: bbtCNVData, isLoading: loadingBBTCNV },
    pCNV: { data: pCNVData, isLoading: loadingPCNV },
  }
}
