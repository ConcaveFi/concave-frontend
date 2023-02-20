import { PCNVContract } from '@concave/core'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useQuery } from 'react-query'
import { useAccount, useProvider } from 'wagmi'

export const usePCNVUserData = () => {
  const { address } = useAccount()
  const chaindId = useCurrentSupportedNetworkId()
  const provider = useProvider()
  const pCNVContract = new PCNVContract(provider)
  const { data, isLoading } = useQuery(
    ['pCNVUserData', address, chaindId],
    () =>
      Promise.all([pCNVContract.redeemable(address), pCNVContract.redeemed(address)]).then(
        ([redeemable, redeemed]) => ({
          redeemable,
          redeemed,
        }),
      ),
    {
      enabled: Boolean(address) && Boolean(chaindId),
    },
  )
  return {
    data,
    isLoading,
  }
}
