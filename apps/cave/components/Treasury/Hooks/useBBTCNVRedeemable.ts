import { RedeemBBT_CNV_Abi } from 'contracts/VestedTokens/RedeemBbtCNVAbi'
import { Contract } from 'ethers'
import { concaveProvider as provider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

export default function useBBTCNVRedeemable() {
  const { data: account } = useAccount()

  const bbtCNV_Redemption_Contract = new Contract(
    '0xCf6B82Ca69bE4272d457c246FAF380f88af34f69', //mainnet?
    RedeemBBT_CNV_Abi,
    provider(4),
  )
  const { data, isLoading } = useQuery(['bbtRedeemable', account?.address], async () => ({
    redeemable: await bbtCNV_Redemption_Contract.redeemable(account?.address),
    redeemed: await bbtCNV_Redemption_Contract.redeemed(account?.address),
  }))
  return {
    data,
    isLoading,
  }
}
