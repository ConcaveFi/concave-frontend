import { parseUnits } from 'ethers/lib/utils'
import { Currency, CurrencyAmount, NATIVE, Percent, WETH9, WETH9_ADDRESS } from '@concave/core'
import { Pair, toHex } from '@concave/gemswap-sdk'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { Router } from 'lib/Router'
import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { toPercent } from 'utils/toPercent'
import { BigNumber } from 'ethers'
import { useTransactionRegistry } from './TransactionsRegistry'
import { toAmount } from 'utils/toAmount'

const currencyAmountToBigNumber = (currency: CurrencyAmount<Currency>) => {
  return parseUnits(currency.toFixed(currency.currency.decimals))
}

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
  const { address } = useAccount()

  const tokenA = pair.token0
  const tokenB = pair.token1

  const [percentToRemove, setPercentToRemove] = useState(0)

  const ratioToRemove = toPercent(percentToRemove)

  const amountAMin = pair.reserve0.multiply(userPoolShare).multiply(ratioToRemove)
  const amountBMin = pair.reserve1.multiply(userPoolShare).multiply(ratioToRemove)

  const [hash, setHash] = useState<string>(null)

  const { data: signer } = useSigner()

  const [receiveInNativeToken, setReceiveInNativeToken] = useState(true)

  const tokenAIsNativeWrapper = tokenA.equals(WETH9[networkId])
  const tokenBIsNativeWrapper = tokenB.equals(WETH9[networkId])
  const hasNativeToken = tokenAIsNativeWrapper || tokenBIsNativeWrapper
  const amountToRemove = BigNumber.from(userBalance.multiply(ratioToRemove).quotient.toString())
  const { registerTransaction } = useTransactionRegistry()

  const removeLiquidity = async () => {
    const router = new Router(networkId, signer)

    if (receiveInNativeToken && (tokenAIsNativeWrapper || tokenBIsNativeWrapper)) {
      const transaction = await router.removeLiquidityETH(
        tokenAIsNativeWrapper ? tokenB : tokenA,
        amountToRemove,
        address,
      )
      setHash(transaction.hash)
      const [nativeAmount, token1Amount] = tokenAIsNativeWrapper
        ? [toAmount(amountAMin.toExact(), NATIVE[networkId]), amountBMin]
        : [toAmount(amountBMin.toExact(), NATIVE[networkId]), amountAMin]
      registerTransaction(transaction, {
        type: 'remove liquidity',
        amount0: nativeAmount.toString(),
        amount1: token1Amount.toString(),
        pairSymbol: `${nativeAmount.currency.symbol}-${token1Amount.currency.symbol}`,
      })
      return
    }
    const transaction = await router.removeLiquidity(
      pair.token0,
      pair.token1,
      amountToRemove,
      address,
    )
    registerTransaction(transaction, {
      type: 'remove liquidity',
      amount0: amountAMin.toString(),
      amount1: amountBMin.toString(),
      pairSymbol: `${tokenA.symbol}-${tokenB.symbol}`,
    })
    setHash(transaction.hash)
  }

  return {
    amountToRemove,
    amountAMin,
    amountBMin,
    pair,
    percentToRemove,
    setPercentToRemove,
    removeLiquidity,
    hash,
    tokenAIsNativeWrapper,
    tokenBIsNativeWrapper,
    hasNativeToken,
    receiveInNativeToken,
    handleNativeToken: () => setReceiveInNativeToken(!receiveInNativeToken),
  }
}
export type RemoveLiquidityState = ReturnType<typeof useRemoveLiquidity>
