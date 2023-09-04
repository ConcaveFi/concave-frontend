import { ACNV, CurrencyAmount, RedemptionContract, Token } from '@concave/core'
import { BigNumber } from 'ethers'
import { useGet_User_Acnv_RedeemedQuery } from 'graphql/generated/graphql'
import { useCurrencyBalanceOfAddress } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useQuery } from 'react-query'
import { Address, useProvider } from 'wagmi'

export function useRedeemable({
  token,
  contract,
  address,
}: {
  token: Token
  contract: Address
  address: Address
}) {
  const chainId = useCurrentSupportedNetworkId()
  const provider = useProvider()
  return useQuery(
    ['redeemable', contract, address, chainId],
    redeemable(contract, provider, address, token),
  )
}

function redeemable(contract: string, provider, address: string, token: Token) {
  return async () => {
    const redemptionContract = new RedemptionContract(contract, provider)
    return Promise.all([
      redemptionContract.redeemable(address),
      redemptionContract.redeemed(address),
      redemptionContract.vestedPercent(),
    ]).then(([redeemable, redeemed, vestedPercent]) => {
      return {
        redeemable: CurrencyAmount.fromRawAmount(token, redeemable.toString()),
        redeemed: CurrencyAmount.fromRawAmount(token, redeemed.toString()),
        vestedPercent,
      }
    })
  }
}

export function useRedeemableACNV({ address }: { address: Address }) {
  const chainId = useCurrentSupportedNetworkId()
  const token = ACNV[chainId] || ACNV[1]
  const logCNV = useGet_User_Acnv_RedeemedQuery({ address: address })
  const [log] = (logCNV.data || { logACNVRedemption: [] }).logACNVRedemption
  const redeemed: number = log?.amount || 0

  const ACNVBalance = useCurrencyBalanceOfAddress(token, address)
  const data = {
    redeemed: CurrencyAmount.fromRawAmount(token, redeemed),
    redeemable: CurrencyAmount.fromRawAmount(token, ACNVBalance.data?.quotient.toString()),
    vestedPercent: BigNumber.from(1n * 10n ** 18n),
  }

  return {
    ...truthMergeStrategy([ACNVBalance, logCNV]), //isLoading, isError, isFecthing
    data,
  }
}

const truthMergeStrategy = (objs: object[]) => {
  return objs.reduce((prev, current) => {
    Object.entries({ ...current })
      .filter(([key]) => !prev[key])
      .forEach(([currentKey, currentValue]) => (prev[currentKey] = currentValue))
    return prev
  }, {})
}
