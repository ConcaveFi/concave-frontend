import { bbtCNV_REDEMPTION_V2 } from 'contracts/VestedTokens/addresses'
import { bbtCNV_REDEMPTION_V2_ABI } from 'contracts/VestedTokens/BBTCNV_V2_ABI'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as provider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

export default function useBBTCNVRedeemable() {
  const { data: account } = useAccount()
  const networkdId = useCurrentSupportedNetworkId()

  const contractV2 = new Contract(
    bbtCNV_REDEMPTION_V2[networkdId],
    bbtCNV_REDEMPTION_V2_ABI,
    provider(networkdId),
  )

  const { data, isLoading } = useQuery(
    ['bbtRedeemable', account?.address],
    async () => ({
      redeemable: await contractV2.redeemable(account?.address),
      redeemed: await contractV2.redeemed(account?.address),
    }),
    { enabled: !!account?.address },
  )
  return {
    data,
    isLoading,
  }
}
