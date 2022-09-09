import { Currency, CurrencyAmount, Fraction, NATIVE, Percent, WETH9 } from '@concave/core'
import { Pair } from '@concave/gemswap-sdk'
import { BigNumber } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useMemo, useState } from 'react'
import { toPercent } from 'utils/toPercent'

const slippage = new Fraction(99999, 100000)
export const useRemoveLiquidity = ({
  pair,
  userPoolShare,
  userBalance,
}: {
  pair: Pair
  userPoolShare: Percent
  userBalance: CurrencyAmount<Currency>
}) => {
  const networkId = useCurrentSupportedNetworkId()
  const tokenA = pair.token0
  const tokenB = pair.token1
  const [percentToRemove, setPercentToRemove] = useState(0)
  const ratioToRemove = toPercent(percentToRemove)
  const [receiveInNativeToken, setReceiveInNativeToken] = useState(true)
  const tokenBIsNativeWrapper = tokenB.equals(WETH9[networkId])
  const tokenAIsNativeWrapper = tokenA.equals(WETH9[networkId])
  const hasNativeToken = tokenAIsNativeWrapper || tokenBIsNativeWrapper
  const amountToRemove = BigNumber.from(userBalance.multiply(ratioToRemove).quotient.toString())

  const amountAMin = useMemo(() => {
    const amount = pair.reserve0.multiply(userPoolShare).multiply(ratioToRemove).multiply(slippage)
    if (tokenAIsNativeWrapper && receiveInNativeToken)
      return CurrencyAmount.fromRawAmount(
        NATIVE[amount.currency.chainId],
        amount.quotient.toString(),
      )
    return amount
  }, [pair.reserve0, ratioToRemove, receiveInNativeToken, tokenAIsNativeWrapper, userPoolShare])

  const amountBMin = useMemo(() => {
    const amount = pair.reserve1.multiply(userPoolShare).multiply(ratioToRemove).multiply(slippage)
    if (tokenBIsNativeWrapper && receiveInNativeToken)
      return CurrencyAmount.fromRawAmount(
        NATIVE[amount.currency.chainId],
        amount.quotient.toString(),
      )
    return amount
  }, [pair.reserve1, ratioToRemove, receiveInNativeToken, tokenBIsNativeWrapper, userPoolShare])

  return {
    amountToRemove,
    tokenA,
    tokenB,
    amountAMin,
    amountBMin,
    pair,
    percentToRemove,
    setPercentToRemove,
    tokenAIsNativeWrapper,
    tokenBIsNativeWrapper,
    hasNativeToken,
    receiveInNativeToken,
    handleNativeToken: () => setReceiveInNativeToken(!receiveInNativeToken),
  }
}
export type RemoveLiquidityState = ReturnType<typeof useRemoveLiquidity>
