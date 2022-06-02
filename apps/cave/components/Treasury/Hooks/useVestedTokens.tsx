import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount, useBalance } from 'wagmi'

export default function useVestedTokens() {
  const networkId = useCurrentSupportedNetworkId()
  const [{ data: account }] = useAccount()
  const [{ data: bbtCNVData }] = useBalance({
    addressOrName: account?.address,
    token: '0x0000000012a0592C154D552C410030E724b2eA00',
  })
  const [{ data: aCNVData }] = useBalance({
    addressOrName: account?.address,
    token: '0x0000000012a0592C154D552C410030E724b2eA00',
  })

  return {
    aCNVData: networkId == 1 && aCNVData,
    bbtCNVData,
  }
}
