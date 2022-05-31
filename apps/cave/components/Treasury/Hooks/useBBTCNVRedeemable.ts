import { RedeemBBT_CNV_Abi } from 'contracts/VestedTokens/RedeemBbtCNVAbi'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as provider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount, useSigner } from 'wagmi'

export default function useBBTCNVRedeemable() {
  const [{ data: signer }] = useSigner()
  const [{ data: account }] = useAccount()

  //   const networkId = useCurrentSupportedNetworkId()
  const bbtCNVContract = new Contract(
    '0x1e61c955e49e4Ba3020a316739A3472BA07F1964',
    RedeemBBT_CNV_Abi,
    provider(4),
  )
  const { data, isLoading } = useQuery(
    ['bbtRedeemable'],
    async () => {
      try {
        return await bbtCNVContract.redeemable('0x43F991Ea47DEd5A9E4bF394009c8b5f10D3647Bd')
      } catch (e) {
        return 0
      }
    },
    {},
  )
  return {
    data,
    isLoading,
  }
}
