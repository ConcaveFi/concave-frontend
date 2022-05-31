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
    '0xbFe30e2445445147893af7A4757F9eDBca5b91e7',
    RedeemBBT_CNV_Abi,
    provider(4),
  )
  const { data, isLoading } = useQuery(
    ['bbtRedeemable', account?.address],
    async () => bbtCNVContract.redeemable(account?.address),
    {},
  )
  return {
    data,
    isLoading,
  }
}
