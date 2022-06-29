import { RedeemBBT_CNV_Abi } from 'contracts/VestedTokens/RedeemBbtCNVAbi'
import { Contract } from 'ethers'
import { concaveProvider as provider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount, useSigner } from 'wagmi'

export default function useBBTCNVRedeemable() {
  const { address } = useAccount()

  //   const networkId = useCurrentSupportedNetworkId()
  const bbtCNVContract = new Contract(
    '0x7fcc30e97d718864d46a84f13e3ba111a56123d3', //mainnet?
    RedeemBBT_CNV_Abi,
    provider(1),
  )
  const { data, isLoading } = useQuery(
    ['bbtRedeemable', address],
    async () => ({
      redeemable: await bbtCNVContract.redeemable(address),
      redeemed: await bbtCNVContract.redeemed(address),
    }),
    {},
  )
  return {
    data,
    isLoading,
  }
}
