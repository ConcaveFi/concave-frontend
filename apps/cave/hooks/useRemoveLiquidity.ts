import { ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { ROUTER_ADDRESS, Token } from 'gemswap-sdk'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { LiquidityInfoData } from 'hooks/useLiquidityInfo'
import { contractABI } from 'lib/contractoABI'
import { concaveProvider } from 'lib/providers'
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
  const [deadline, setDeadLine] = useState(new Date().getTime() / 1000 + 15 * 60)
  const [hash, setHash] = useState<string>(null)

  const contractInstance = new ethers.Contract(
    ROUTER_ADDRESS[networkId],
    contractABI,
    concaveProvider(networkId),
  )
  const [{ data, error, loading }, getSigner] = useSigner()

  const call = async () => {
    const contractSigner = contractInstance.connect(data)
    const to = account.address
    const provider = concaveProvider(networkId)
    const currentBlockNumber = await provider.getBlockNumber()
    const { timestamp } = await provider.getBlock(currentBlockNumber)
    const deadLine = timestamp + 86400
    const transaction = await contractSigner.removeLiquidity(
      tokenA.address,
      tokenB.address,
      liquidityInfo.userBalance.data.value.mul(percentToRemove).div(100),
      parseUnits(`0`, tokenA.decimals),
      parseUnits(`0`, tokenB.decimals),
      to,
      deadLine,
      {
        gasLimit: 500000,
      },
    )
    setHash(transaction.hash)
  }
  return {
    amountAMin,
    amountBMin,
    deadline,
    ...liquidityInfo,
    percentToRemove,
    setPercentToRemove,
    call,
    hash,
  }
}
export type RemoveLiquidityState = ReturnType<typeof useRemoveLiquidity>
