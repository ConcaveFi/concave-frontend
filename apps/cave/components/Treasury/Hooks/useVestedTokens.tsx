import { useAccount, useBalance } from 'wagmi'

export default function useVestedTokens() {
  const { address } = useAccount()
  const { data: bbtCNVData, isLoading: loadingACNV } = useBalance({
    addressOrName: address,
    token: '0x0000000012a0592C154D552C410030E724b2eA00',
  })
  const { data: aCNVData, isLoading: loadingBBTCNV } = useBalance({
    addressOrName: address,
    token: '0x6Ff0106D34FEEe8A8aCF2e7b9168480f86B82E2f',
  })

  return {
    aCNVData,
    loadingACNV,
    bbtCNVData,
    loadingBBTCNV,
  }
}
