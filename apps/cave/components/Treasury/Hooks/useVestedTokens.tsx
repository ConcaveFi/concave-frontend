import { useAccount, useBalance } from 'wagmi'

export default function useVestedTokens() {
  const { data: account } = useAccount()
  const { data: bbtCNVData, isLoading: loadingACNV } = useBalance({
    addressOrName: account?.address,
    token: '0x03eebe71dca9cdfc71d5f9a50f48a52ca5662526',
  })
  const { data: aCNVData, isLoading: loadingBBTCNV } = useBalance({
    addressOrName: account?.address,
    token: '0x6Ff0106D34FEEe8A8aCF2e7b9168480f86B82E2f',
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
