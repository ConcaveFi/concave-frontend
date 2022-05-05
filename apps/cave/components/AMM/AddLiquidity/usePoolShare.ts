import { Currency, CurrencyAmount, Pair, Percent, Token } from '@concave/gemswap-sdk'
import { useQuery } from 'react-query'
import { Contract } from 'ethers'
import { erc20ABI, useProvider } from 'wagmi'
import { toAmount } from 'utils/toAmount'

export type PoolShare = {
  amount: CurrencyAmount<Token>
  percent: Percent
}

export const usePoolShare = (
  pair: Pair,
  amount0: CurrencyAmount<Currency>,
  amount1: CurrencyAmount<Currency>,
) => {
  const provider = useProvider()
  const { data: lpTotalSupply } = useQuery(
    [pair?.liquidityToken.address, pair?.liquidityToken.chainId],
    async () => {
      const totalSupply = await new Contract(
        pair.liquidityToken.address,
        erc20ABI,
        provider,
      ).totalSupply()
      return toAmount(totalSupply.toString(), pair.liquidityToken)
    },
    { enabled: !!pair },
  )

  const poolShareAmount =
    lpTotalSupply &&
    amount0?.greaterThan(0) &&
    amount1?.greaterThan(0) &&
    pair?.getLiquidityMinted(lpTotalSupply, amount0.wrapped, amount1.wrapped)

  if (!poolShareAmount) return undefined
  return {
    amount: poolShareAmount.divide(poolShareAmount.decimalScale),
    percent: new Percent(poolShareAmount.numerator, lpTotalSupply.numerator),
  } as PoolShare
}
