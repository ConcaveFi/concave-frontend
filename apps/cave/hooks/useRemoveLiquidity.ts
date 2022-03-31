import { ethers, Contract } from 'ethers'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { ContractAddress } from 'lib/contractAddress'
import { contractABI } from 'lib/contractoABI'
import { concaveProvider2, concaveProvider } from 'lib/providers'
import { useEffect, useState } from 'react'
import { chain, useSigner, useWaitForTransaction } from 'wagmi'
import { useToken, WrapperTokenInfo } from '../components/Swap/useSwap'
import { useAllowance, useApproval } from './useAllowance'

export const useRemoveLiquidity = (chainId = chain.ropsten.id, userAddress) => {
  const [wrapperTokenA, setTokenA] = useToken({ userAddressOrName: userAddress, symbol: '' })
  const [wrapperTokenB, setTokenB] = useToken({ userAddressOrName: userAddress, symbol: '' })
  const [lpRemoveAmount, setLpRemoveAmount] = useState<number>(null)
  // GRAB FACTORY ADDRESS,
  const [{ data, error, loading }, getSigner] = useSigner()

  const contractInstance = new ethers.Contract(
    ContractAddress[chainId],
    contractABI,
    concaveProvider2(chainId),
  )

  const call = async () => {
    const contractSigner = contractInstance.connect(data)
    const to = userAddress
    const provider = concaveProvider(chain.ropsten.id)
    const currentBlockNumber = await provider.getBlockNumber()
    const { timestamp } = await provider.getBlock(currentBlockNumber)
    const deadLine = timestamp + 86400
    const gasPrice = await provider.getGasPrice()
    const tokenA = wrapperTokenA.token.address
    const tokenB = wrapperTokenB.token.address
    contractSigner.removeLiquidity(
      tokenA,
      tokenB,
      // LIQUIDITY GOES HERE
      parseUnits(`0`, wrapperTokenA.token.decimals),
      parseUnits(`0`, wrapperTokenB.token.decimals),
      to,
      deadLine,
      {
        gasLimit: gasPrice,
      },
    )
  }

  return [
    {
      wrapperTokenA,
      wrapperTokenB,
      userAddress,
      lpRemoveAmount,
    },
    {
      setTokenA,
      setTokenB,
      lpRemoveAmount,
    },
    call,
  ] as const
}
export type UseAddLiquidityData = {
  wrapperTokenA: WrapperTokenInfo
  wrapperTokenB: WrapperTokenInfo
  liquidity: number
  userAddress: string
}

// console.table({
//   tokenA,
//   tokenB,
//   amountADesired: parseUnits(`${amountADesired}`, wrapperTokenA.token.decimals).toString(),
//   amountBDesired: parseUnits(`${amountBDesired}`, wrapperTokenB.token.decimals).toString(),
//   amountAMin: parseUnits(`0`, wrapperTokenA.token.decimals).toString(),
//   amountBMin: parseUnits(`0`, wrapperTokenB.token.decimals).toString(),
//   to,
//   deadLine,
// })
