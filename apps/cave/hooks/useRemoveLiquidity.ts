import { parseUnits } from 'ethers/lib/utils'
import { Currency, CurrencyAmount, Percent, WETH9_ADDRESS } from '@concave/core'
import { Pair } from '@concave/gemswap-sdk'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { Router } from 'lib/Router'
import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'

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
  const [{ data: account }] = useAccount()
  const [{ data: signer }] = useSigner()
  const tokenA = pair.token0
  const tokenB = pair.token1
  const [percentToRemove, setPercentToRemove] = useState(0)
  const ratioToRemove = Math.min(percentToRemove, 100) / 100
  const amountAMin = userPoolShare && pair.reserve0.multiply(userPoolShare).multiply(ratioToRemove)
  const amountBMin = userPoolShare && pair.reserve1.multiply(userPoolShare).multiply(ratioToRemove)
  const [hash, setHash] = useState<string>(null)
  const [receiveInNativeToken, setReceiveInNativeToken] = useState(true)
  const hasNativeToken = tokenA.isNative || tokenB.isNative

  const removeLiquidity = async () => {
    const router = new Router(networkId, signer)
    if (receiveInNativeToken && hasNativeToken) {
      const transaction = await router.removeLiquidityETH(
        tokenA.isNative ? tokenB : tokenA,
        currencyAmountToBigNumber(userBalance.multiply(new Percent(percentToRemove, 100))),
        account.address,
      )
      setHash(transaction.hash)
      return
    }
    const transaction = await router.removeLiquidity(
      tokenA,
      tokenB,
      currencyAmountToBigNumber(userBalance.multiply(percentToRemove).divide(100)),
      account.address,
    )
    setHash(transaction.hash)
  }

  return {
    amountAMin,
    amountBMin,
    pair,
    percentToRemove,
    setPercentToRemove,
    removeLiquidity,
    hash,
    hasNativeToken,
    receiveInNativeToken,
    handleNativeToken: () => setReceiveInNativeToken(!receiveInNativeToken),
  }
}
export type RemoveLiquidityState = ReturnType<typeof useRemoveLiquidity>
