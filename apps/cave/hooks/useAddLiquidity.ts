import { ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { ContractAddress } from 'lib/contractAddress'
import { contractABI } from 'lib/contractoABI'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { chain, useSigner } from 'wagmi'
import { useToken, WrapperTokenInfo } from '../components/Swap/useSwap'

export const useAddLiquidity = (chainId = chain.ropsten.id, userAddress) => {
  const [wrapperTokenA, setTokenA] = useToken({ userAddressOrName: userAddress, symbol: '' })
  const [amountADesired, setAmountADesired] = useState<number>(null)

  const [wrapperTokenB, setTokenB] = useToken({ userAddressOrName: userAddress, symbol: '' })
  const [amountBDesired, setAmountBDesired] = useState<number>(null)
  const [{ data, error, loading }, getSigner] = useSigner()
  const [transacion, setTransaction] = useState<Promise<unknown>>(null)

  const contractInstance = new ethers.Contract(
    ContractAddress[chainId],
    contractABI,
    concaveProvider(chainId),
  )

  const call = async () => {
    const contractSigner = contractInstance.connect(data)
    const to = userAddress
    const provider = concaveProvider(chain.ropsten.id)
    const currentBlockNumber = await provider.getBlockNumber()
    const { timestamp } = await provider.getBlock(currentBlockNumber)
    const deadLine = timestamp + 86400
    const tokenA = wrapperTokenA.token.address
    const tokenB = wrapperTokenB.token.address
    setTransaction(
      contractSigner.addLiquidity(
        tokenA,
        tokenB,
        parseUnits(`${amountADesired}`, wrapperTokenA.token.decimals),
        parseUnits(`${amountBDesired}`, wrapperTokenB.token.decimals),
        parseUnits(`0`, wrapperTokenA.token.decimals),
        parseUnits(`0`, wrapperTokenB.token.decimals),
        to,
        deadLine,
        {
          gasLimit: 500000,
        },
      ),
    )
  }

  return [
    {
      wrapperTokenA,
      wrapperTokenB,
      amountADesired,
      amountBDesired,
      userAddress,
    },
    {
      setTokenA,
      setTokenB,
      setAmountADesired,
      setAmountBDesired,
    },
    call,
    transacion,
  ] as const
}
export type UseAddLiquidityData = {
  wrapperTokenA: WrapperTokenInfo
  wrapperTokenB: WrapperTokenInfo
  amountADesired: number
  amountBDesired: number
  userAddress: string
}
