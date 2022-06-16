import { bbtCNV_REDEMPTION_V1, bbtCNV_REDEMPTION_V2 } from 'contracts/VestedTokens/addresses'
import { bbtCNV_REDEMPTION_V1_ABI } from 'contracts/VestedTokens/BBTCNV_V1_ABI'
import { bbtCNV_REDEMPTION_V2_ABI } from 'contracts/VestedTokens/BBTCNV_V2_ABI'
import { Contract, utils } from 'ethers'
import { concaveProvider as provider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

export default function useBBTCNVRedeemable() {
  const { data: account } = useAccount()

  const contractV1 = new Contract(bbtCNV_REDEMPTION_V1[4], bbtCNV_REDEMPTION_V1_ABI, provider(4))
  const contractV2 = new Contract(bbtCNV_REDEMPTION_V2[4], bbtCNV_REDEMPTION_V2_ABI, provider(4))

  const { data, isLoading } = useQuery(['bbtRedeemable', account?.address], async () => {
    const redeemedV1 = await contractV1.redeemed(account?.address)
    const redeemedV2 = await contractV2.redeemed(account?.address)
    return {
      redeemable: await contractV2.redeemable(account?.address),
      redeemed: redeemedV1.add(redeemedV2),
    }
  })
  return {
    data,
    isLoading,
  }
}
