import { aCNV_ADDRESS, bbtCNV_ADDRESS } from 'contracts/VestedTokens/addresses'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount, useBalance } from 'wagmi'

export default function useVestedTokens() {
  const { data: account } = useAccount()
  const networkID = useCurrentSupportedNetworkId()
  const { data: bbtCNVData, isLoading: loadingACNV } = useBalance({
    addressOrName: account?.address,
    token: bbtCNV_ADDRESS[networkID],
  })
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
// bbtCNV
// Rikenby 0x03eebe71dca9cdfc71d5f9a50f48a52ca5662526
// Mainnet 0x0000000012a0592C154D552C410030E724b2eA00
