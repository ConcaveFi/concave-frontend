import { usePair } from 'components/AMM/hooks/usePair'
import { parseAmount } from 'components/AMM/utils/parseAmount'
import { Token, CurrencyAmount, Currency, Pair } from 'gemswap-sdk'

import { Router } from 'lib/Router'
import { useCallback, useRef, useState } from 'react'
import { chain, useSigner } from 'wagmi'

export enum FieldType {
  INPUT,
  INPUT2,
}

export const useAddLiquidity = (selectedChain = chain.ropsten, userAddress) => {
  const amountADesired = useRef<CurrencyAmount<Token>>()
  const amountBDesired = useRef<CurrencyAmount<Token>>()
  const [tokenA, setTokenA] = useState<Token>()
  const [tokenB, setTokenB] = useState<Token>()
  const [hash, setHash] = useState<string>(null)
  const [exactValue, setExactValue] = useState<string>('')
  const [fieldType, setFieldType] = useState<FieldType>(FieldType.INPUT)

  const { data: pair } = usePair(tokenA, tokenB)
  const [{ data: singer }] = useSigner()

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
      ? [parseAmount(exactValue, tokenA), tokenA]
      : [parseAmount(exactValue, tokenB), tokenB]

  const otherCurrencyAmount =
    exactCurrencyAmount && pair?.priceOf(otherCurrency)?.quote(exactCurrencyAmount)

  const [tempA, tempB] =
    fieldType == FieldType.INPUT
      ? [exactCurrencyAmount, otherCurrencyAmount]
      : [otherCurrencyAmount, exactCurrencyAmount]

  amountADesired.current = tempA || amountADesired.current
  amountBDesired.current = tempB || amountBDesired.current

  const clear = () => {
    amountADesired.current = undefined
    amountBDesired.current = undefined
    setTokenA(null)
    setTokenB(null)
    setHash('')
  }

  const addLiquidity = async () => {
    const router = new Router(selectedChain.id, singer)
    const tx = await router.addLiquidity(
      amountADesired.current,
      amountBDesired.current,
      userAddress,
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
    addLiquidity,
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
