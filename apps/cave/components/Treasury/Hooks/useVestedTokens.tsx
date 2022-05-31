import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount, useBalance } from 'wagmi'

export default function useVestedTokens({ chainId }: { chainId: number }) {
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

  const pCNVData = false
  //   const [{ data: pCNVData }] = useBalance({
  //     addressOrName: account?.address,
  //     token: pCNV_ADDRESS[networkId],
  //   })
  return {
    aCNVData: networkId == 1 && aCNVData,
    pCNVData,
    bbtCNVData,
  }
}

export const pCNV_ADDRESS = {
  1: '0',
  4: '0',
}
