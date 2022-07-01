import { bbtCNV_REDEMPTION_V1, bbtCNV_REDEMPTION_V2 } from 'contracts/VestedTokens/addresses'
import { bbtCNV_REDEMPTION_V1_ABI } from 'contracts/VestedTokens/BBTCNV_V1_ABI'
import { bbtCNV_REDEMPTION_V2_ABI } from 'contracts/VestedTokens/BBTCNV_V2_ABI'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as provider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

export default function useBBTCNVRedeemable() {
  const { address } = useAccount()
  const networkdId = useCurrentSupportedNetworkId()

  const contractV1 = new Contract(
    bbtCNV_REDEMPTION_V1[networkdId],
    bbtCNV_REDEMPTION_V1_ABI,
    provider(networkdId),
  )
  const contractV2 = new Contract(
    bbtCNV_REDEMPTION_V2[networkdId],
    bbtCNV_REDEMPTION_V2_ABI,
    provider(networkdId),
  )

  const { data, isLoading } = useQuery(['bbtRedeemable', address], async () => {
    const redeemedV1 = await contractV1.redeemed(address)
    const redeemedV2 = await contractV2.redeemed(address)
    return {
      redeemable: await contractV2.redeemable(address),
      redeemed: redeemedV1.add(redeemedV2),
    }
  })
  return {
    data,
    isLoading,
  }
}
