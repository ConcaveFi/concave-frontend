import { Currency, CurrencyAmount, Pair, Percent, Token } from '@concave/gemswap-sdk'

export type PoolShare = {
  amount: CurrencyAmount<Token>
  percent: Percent
}

export const usePoolShare = (
  pair: Pair,
  amount0: CurrencyAmount<Currency>,
  amount1: CurrencyAmount<Currency>,
) => {
  const poolShareAmount =
    pair?.liquidityToken.totalSupply &&
    amount0?.greaterThan(0) &&
    amount1?.greaterThan(0) &&
    pair?.getLiquidityMinted(pair.liquidityToken.totalSupply, amount0.wrapped, amount1.wrapped)
  if (!poolShareAmount) return undefined
  console.log(poolShareAmount.toExact())
  return {
    amount: poolShareAmount.divide(poolShareAmount.decimalScale),
    percent: new Percent(poolShareAmount.numerator, pair.liquidityToken.totalSupply.numerator),
  } as PoolShare
}
