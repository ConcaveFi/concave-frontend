import { aCNV_ADDRESS, bbtCNV_ADDRESS } from 'contracts/VestedTokens/addresses'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount, useBalance } from 'wagmi'

export default function useVestedTokens() {
  const { data: account } = useAccount()
  const networkId = useCurrentSupportedNetworkId()
  const { data: bbtCNVData, isLoading: loadingACNV } = useBalance({
    addressOrName: account?.address,
    token: bbtCNV_ADDRESS[networkId],
  })
  // aCNV token it's not deployed on rinkeby, so it's better pass the
  // networkd hardcoded intead using the networkId
  const { data: aCNVData, isLoading: loadingBBTCNV } = useBalance({
    addressOrName: account?.address,
    token: aCNV_ADDRESS[1],
  })

  return {
    aCNVData,
    loadingACNV,
    bbtCNVData,
    loadingBBTCNV,
  }
}
