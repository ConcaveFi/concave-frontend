import { BBTRedemptionContractV2 } from '@concave/core'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useQuery } from 'react-query'
import { useAccount, useProvider, useSigner } from 'wagmi'

export default function useBBTCNVRedeemable() {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const networkdId = useCurrentSupportedNetworkId()
  const provider = useProvider()
  const bbtCNVRedemptionV2 = new BBTRedemptionContractV2(provider)

  const { data, isLoading } = useQuery(
    ['bbtRedeemable', address, networkdId],
    async () =>
      Promise.all([
        bbtCNVRedemptionV2.redeemable(signer, address),
        bbtCNVRedemptionV2.redeemed(signer, address),
      ]).then(([redeemable, redeemed]) => ({
        redeemable,
        redeemed,
      })),
    { enabled: !!address && !!signer },
  )

  return { data, isLoading }
}
