import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { LiquidityInfoData } from 'hooks/useLiquidityInfo'
import { Router } from 'lib/Router'
import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'

export const useRemoveLiquidity = ({ liquidityInfo }: { liquidityInfo: LiquidityInfoData }) => {
  const networkId = useCurrentSupportedNetworkId()
  const [{ data: account }] = useAccount()
  const tokenA = liquidityInfo.pair.token0
  const tokenB = liquidityInfo.pair.token1

  const [percentToRemove, setPercentToRemove] = useState(0)
  const ratioToRemove = Math.min(percentToRemove, 100) / 100
  const amountAMin =
    +liquidityInfo.pair.reserve0.toExact() * liquidityInfo.userPoolShare * ratioToRemove
  const amountBMin =
    +liquidityInfo.pair.reserve1.toExact() * liquidityInfo.userPoolShare * ratioToRemove
  const [hash, setHash] = useState<string>(null)
  const [{ data }] = useSigner()

  const call = async () => {
    const router = new Router(networkId, data)
    const transaction = await router.removeLiquidity(
      tokenA,
      tokenB,
      liquidityInfo.userBalance.data.value.mul(percentToRemove).div(100),
      account.address,
    )
    setHash(transaction.hash)
  }
  return {
    amountAMin,
    amountBMin,
    ...liquidityInfo,
    percentToRemove,
    setPercentToRemove,
    call,
    hash,
  }
}
export type RemoveLiquidityState = ReturnType<typeof useRemoveLiquidity>
