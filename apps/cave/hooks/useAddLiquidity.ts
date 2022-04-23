import { usePair, usePairs } from 'components/AMM/hooks/usePair'
import { parseInputAmount } from 'components/AMM/utils/parseInputAmount'
import { ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { CNV, Token, DAI, CurrencyAmount, ROUTER_ADDRESS, Currency } from 'gemswap-sdk'
import { contractABI } from 'lib/contractoABI'
import { concaveProvider } from 'lib/providers'
import { useCallback, useEffect, useState } from 'react'
import { chain, useSigner } from 'wagmi'
import { useConversion } from './useConversion'
import { useCurrentSupportedNetworkId } from './useCurrentSupportedNetworkId'

export enum FieldType {
  INPUT,
  INPUT2,
}

export const useAddLiquidity = (selectedChain = chain.ropsten, userAddress) => {
  const networkId = useCurrentSupportedNetworkId()
  const [tokenA, setTokenA] = useState<Token>(DAI[networkId])
  const [tokenB, setTokenB] = useState<Token>(CNV[networkId])
  const [{ data, error, loading }, getSigner] = useSigner()
  const [hash, setHash] = useState<string>(null)
  const [exactValue, setExactValue] = useState<string>('')
  const [fieldType, setFieldType] = useState<FieldType>(FieldType.INPUT)
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

  const { data: pair } = usePair(tokenA, tokenB)

  const otherCurrencyAmount =
    exactCurrencyAmount && pair?.priceOf(otherCurrency)?.quote(exactCurrencyAmount)

  const [amountADesired, amountBDesired] =
    fieldType == FieldType.INPUT
      ? [exactCurrencyAmount, otherCurrencyAmount]
      : [otherCurrencyAmount, exactCurrencyAmount]

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
  tokenA: Token
  tokenB: Token
  amountADesired: CurrencyAmount<Token>
  amountBDesired: CurrencyAmount<Token>
  userAddress: string
}
