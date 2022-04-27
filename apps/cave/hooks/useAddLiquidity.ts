import { usePair } from 'components/AMM/hooks/usePair'
import { parseInputAmount } from 'components/AMM/utils/parseInputAmount'
import { ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { Token, CurrencyAmount, ROUTER_ADDRESS, Currency, Pair } from 'gemswap-sdk'
import { contractABI } from 'lib/contractoABI'
import { concaveProvider } from 'lib/providers'
import { useCallback, useRef, useState } from 'react'
import { chain, useSigner } from 'wagmi'
import { useCurrentSupportedNetworkId } from './useCurrentSupportedNetworkId'

export enum FieldType {
  INPUT,
  INPUT2,
}

export const useAddLiquidityState = () => {
  const [tokenA, setTokenA] = useState<Token>()
  const [tokenB, setTokenB] = useState<Token>()
  const [inputA, setInputA] = useState('')
  const [inputB, setInputB] = useState('')
  return {
    inputA,
    inputB,
    tokenA,
    tokenB,
    setInputA,
    setInputB,
    setTokenA,
    setTokenB,
  }
}

export const useAddLiquidity = (selectedChain = chain.ropsten, userAddress) => {
  const amountADesired = useRef<CurrencyAmount<Token>>()
  const amountBDesired = useRef<CurrencyAmount<Token>>()
  const [tokenA, setTokenA] = useState<Token>()
  const [tokenB, setTokenB] = useState<Token>()
  const [{ data }, getSigner] = useSigner()
  const [hash, setHash] = useState<string>(null)
  const [exactValue, setExactValue] = useState<string>('')
  const [fieldType, setFieldType] = useState<FieldType>(FieldType.INPUT)
  const { data: pair } = usePair(tokenA, tokenB)

  const contractInstance = new ethers.Contract(
    ROUTER_ADDRESS[selectedChain.id],
    contractABI,
    concaveProvider(selectedChain.id),
  )

  const setOrSwitchCurrency = useCallback(
    (otherCurrency: Currency, setCurrency) => (currency: Currency) =>
      otherCurrency?.equals(currency)
        ? (setTokenA(tokenB), setTokenB(tokenA))
        : setCurrency(currency),
    [tokenA, tokenB],
  )

  const updateField = (fieldInputType: FieldType) => (value: string) => {
    setFieldType(fieldInputType)
    setExactValue(value)
  }

  const [exactCurrencyAmount, otherCurrency] =
    fieldType === FieldType.INPUT
      ? [parseInputAmount(exactValue, tokenA), tokenA]
      : [parseInputAmount(exactValue, tokenB), tokenB]
  try {
    const otherCurrencyAmount =
      exactCurrencyAmount && pair?.priceOf(otherCurrency)?.quote(exactCurrencyAmount)

    const [tempA, tempB] =
      fieldType == FieldType.INPUT
        ? [exactCurrencyAmount, otherCurrencyAmount]
        : [otherCurrencyAmount, exactCurrencyAmount]

    amountADesired.current = tempA || amountADesired.current
    amountBDesired.current = tempB || amountBDesired.current
  } catch (e) {
    console.error(e)
  }

  const clear = () => {
    setTokenA(null)
    setTokenB(null)
    setHash('')
  }
  const call = async () => {
    const contractSigner = contractInstance.connect(data)
    const to = userAddress
    const provider = concaveProvider(chain.ropsten.id)
    const currentBlockNumber = await provider.getBlockNumber()
    const { timestamp } = await provider.getBlock(currentBlockNumber)
    const deadLine = timestamp + 86400
    const tx = await contractSigner.addLiquidity(
      tokenA.address,
      tokenB.address,
      parseUnits(amountADesired.current.toFixed(tokenA.decimals)),
      parseUnits(amountBDesired.current.toFixed(tokenB.decimals)),
      parseUnits(`0`, tokenA.decimals),
      parseUnits(`0`, tokenB.decimals),
      to,
      deadLine,
      {
        gasLimit: 500000,
      },
    )
    setHash(tx.hash)
  }

  return [
    {
      pair,
      tokenA,
      tokenB,
      amountADesired: amountADesired.current,
      amountBDesired: amountBDesired.current,
      userAddress,
      hash,
    },
    {
      setTokenA,
      setTokenB,
      updateInputValue: updateField(FieldType.INPUT),
      updateOutputValue: updateField(FieldType.INPUT2),
      updateTokenA: setOrSwitchCurrency(tokenB, setTokenA),
      updateTokenB: setOrSwitchCurrency(tokenA, setTokenB),
    },
    call,
    clear,
  ] as const
}

export interface UseAddLiquidityData {
  pair: Pair
  tokenA: Token
  tokenB: Token
  amountADesired: CurrencyAmount<Token>
  amountBDesired: CurrencyAmount<Token>
  userAddress: string
}
