import { PCNVContract } from '@concave/core'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount, useSigner } from 'wagmi'

export default function usePCNVRedeemable() {
  const { data: signer } = useSigner()
  const { address } = useAccount()

  const chainId = useCurrentSupportedNetworkId()
  const contract = new PCNVContract(concaveProvider(chainId))
  const { data, isLoading } = useQuery(
    ['pCNVRedeemable', address],
    async () => {
      return await Promise.all([contract.redeemable(address), contract.redeemed(address)]).then(
        (values) => ({
          redeemable: values[0],
          redeemed: values[1],
        }),
      )
    },
    { enabled: Boolean(address) },
  )

  return {
    data,
    isLoading,
  }
}
