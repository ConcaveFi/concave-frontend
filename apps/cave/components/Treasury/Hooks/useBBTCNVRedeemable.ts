import { RedeemBBT_CNV_Abi } from 'contracts/VestedTokens/RedeemBbtCNVAbi'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as provider } from 'lib/providers'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount, useSigner } from 'wagmi'

export default function useBBTCNVRedeemable() {
  const [{ data: signer }] = useSigner()
  const [{ data: account }] = useAccount()

  //   const networkId = useCurrentSupportedNetworkId()
  const bbtCNVContract = new Contract(
    '0xbc0f18de3a0d650e37ac02535c5d0a6e958ceaa8',
    RedeemBBT_CNV_Abi,
    provider(1),
  )
  const { data, isLoading } = useQuery(
    ['bbtRedeemable', account?.address],
    async () => ({
      redeemable: await bbtCNVContract.redeemable(account?.address),
      redeemed: await bbtCNVContract.redeemed(account?.address),
    }),
    {},
  )
  return {
    data,
    isLoading,
  }
}
