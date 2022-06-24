import { RedeemBBT_CNV_Abi } from 'contracts/VestedTokens/RedeemBbtCNVAbi'
import { RedeemPCNV_Abi } from 'contracts/VestedTokens/RedeemPCNVAbi'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as provider } from 'lib/providers'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount, useSigner } from 'wagmi'

export default function usePCNVRedeemable() {
  const { data: signer } = useSigner()
  const { data: account } = useAccount()

  //   const networkId = useCurrentSupportedNetworkId()
  const PCNVContract = new Contract(
    '0xC82cC6a1f946D20ea88Fe9C04A1b258cA6F25E98', //SWITCH TO MAINNET
    RedeemPCNV_Abi,
    provider(4),
  )
  const { data, isLoading } = useQuery(
    ['pCNVRedeemable', account?.address],
    async () => ({
      redeemable: await PCNVContract.redeemable(account?.address),
      redeemed: await PCNVContract.redeemed(account?.address),
    }),
    {},
  )
  return {
    data,
    isLoading,
  }
}
