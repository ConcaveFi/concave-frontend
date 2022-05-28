import { parseUnits } from 'ethers/lib/utils'
import { Currency, CurrencyAmount, Pair, Percent, WETH9_ADDRESS } from '@concave/gemswap-sdk'
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
  userPoolShare: number
  userBalance: CurrencyAmount<Currency>
}) => {
  const networkId = useCurrentSupportedNetworkId()
  const [{ data: account }] = useAccount()
  const tokenA = pair.token0
  const tokenB = pair.token1
  const [percentToRemove, setPercentToRemove] = useState(0)
  const ratioToRemove = Math.min(percentToRemove, 100) / 100
  const amountAMin = +pair.reserve0.toExact() * userPoolShare * ratioToRemove
  const amountBMin = +pair.reserve1.toExact() * userPoolShare * ratioToRemove
  const [hash, setHash] = useState<string>(null)
  const [{ data }] = useSigner()
  const [receiveInNativeToken, setReceiveInNativeToken] = useState(true)
  const tokenAIsNativeWrapper = tokenA.address === WETH9_ADDRESS[networkId]
  const tokenBIsNativeWrapper = tokenB.address === WETH9_ADDRESS[networkId]
  const hasNativeToken = tokenAIsNativeWrapper || tokenBIsNativeWrapper

  const removeLiquidity = async () => {
    const router = new Router(networkId, data)
    if (receiveInNativeToken && (tokenAIsNativeWrapper || tokenBIsNativeWrapper)) {
      const transaction = await router.removeLiquidityETH(
        tokenAIsNativeWrapper ? tokenB : tokenA,
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
    tokenAIsNativeWrapper,
    tokenBIsNativeWrapper,
    hasNativeToken,
    receiveInNativeToken,
    handleNativeToken: () => setReceiveInNativeToken(!receiveInNativeToken),
  }
}
export type RemoveLiquidityState = ReturnType<typeof useRemoveLiquidity>
