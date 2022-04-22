import { ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { CNV, Token, DAI, CurrencyAmount, ROUTER_ADDRESS } from 'gemswap-sdk'
import { contractABI } from 'lib/contractoABI'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { chain, useSigner } from 'wagmi'
import { useCurrentSupportedNetworkId } from './useCurrentSupportedNetworkId'

export const useAddLiquidity = (selectedChain = chain.ropsten, userAddress) => {
  const networkId = useCurrentSupportedNetworkId()
  const [tokenA, setTokenA] = useState<Token>(DAI[networkId])
  const [tokenB, setTokenB] = useState<Token>(CNV[networkId])
  const [amountADesired, setAmountADesired] = useState<CurrencyAmount<Token>>(null)
  const [amountBDesired, setAmountBDesired] = useState<CurrencyAmount<Token>>(null)
  const [{ data, error, loading }, getSigner] = useSigner()
  const [hash, setHash] = useState<string>(null)
  const contractInstance = new ethers.Contract(
    ROUTER_ADDRESS[selectedChain.id],
    contractABI,
    concaveProvider(selectedChain.id),
  )

  const clear = () => {
    setTokenA(null)
    setTokenB(null)
    setAmountADesired(null)
    setAmountBDesired(null)
    setHash('')
  }
  const call = async () => {
    const contractSigner = contractInstance.connect(data)
    const to = userAddress
    const provider = concaveProvider(chain.ropsten.id)
    const currentBlockNumber = await provider.getBlockNumber()
    const { timestamp } = await provider.getBlock(currentBlockNumber)
    const deadLine = timestamp + 86400
    contractSigner
      .addLiquidity(
        tokenA.address,
        tokenB.address,
        parseUnits(amountADesired.toFixed(tokenA.decimals)),
        parseUnits(amountBDesired.toFixed(tokenB.decimals)),
        parseUnits(`0`, tokenA.decimals),
        parseUnits(`0`, tokenB.decimals),
        to,
        deadLine,
        {
          gasLimit: 500000,
        },
      )
      .then((r) => {
        setHash(r.hash)
        return r
      })
  }

  return [
    {
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      userAddress,
      hash,
    },
    {
      setTokenA,
      setTokenB,
      setAmountADesired,
      setAmountBDesired,
    },
    call,
    clear,
  ] as const
}
export type UseAddLiquidityData = {
  tokenA: Token
  tokenB: Token
  amountADesired: CurrencyAmount<Token>
  amountBDesired: CurrencyAmount<Token>
  userAddress: string
}
