import { aCNV_ADDRESS, bbtCNV_ADDRESS } from 'contracts/VestedTokens/addresses'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount, useBalance } from 'wagmi'

export default function useVestedTokens() {
  const { address } = useAccount()
  const networkId = useCurrentSupportedNetworkId()
  const { data: bbtCNVData, isLoading: loadingACNV } = useBalance({
    addressOrName: address,
    token: bbtCNV_ADDRESS[networkId],
  })
  // aCNV token it's not deployed on rinkeby, so it's better pass the
  // networkd hardcoded intead using the networkId
  const { data: aCNVData, isLoading: loadingBBTCNV } = useBalance({
    addressOrName: address,
    token: aCNV_ADDRESS[1],
  })
  const { data: pCNVData, isLoading: loadingPCNV } = useBalance({
    addressOrName: account?.address,
    token: '0xC82cC6a1f946D20ea88Fe9C04A1b258cA6F25E98', // SWITCH TO MAINNET
    chainId: 4,
  })

  return {
    aCNVData,
    loadingACNV,
    bbtCNVData,
    loadingBBTCNV,
    pCNVData,
    loadingPCNV,
  }
}
