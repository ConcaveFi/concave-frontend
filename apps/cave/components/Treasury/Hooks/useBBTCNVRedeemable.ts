import { BBTRedemptionContractV2 } from '@concave/core'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount, useSigner } from 'wagmi'

export default function useBBTCNVRedeemable() {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const networkdId = useCurrentSupportedNetworkId()
  const bbtCNVRedemptionV2 = new BBTRedemptionContractV2(concaveProvider(networkdId))

  const { data, isLoading } = useQuery(
    ['bbtRedeemable', address, networkdId],
    async () =>
      Promise.all([
        bbtCNVRedemptionV2.redeemable(address),
        bbtCNVRedemptionV2.redeemed(address),
      ]).then((values) => ({
        redeemable: values[0],
        redeemed: values[1],
      })),
    { enabled: !!address && !!signer },
  )

  return { data, isLoading }
}
