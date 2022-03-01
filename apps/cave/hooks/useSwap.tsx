import { useEffect, useState } from 'react'

type useStateType<T> = React.Dispatch<React.SetStateAction<T>>

const avaliableTokens = ['XMR', 'ETH', 'DAI', 'gCNV', 'FRAX'] as const
export type AvaliableTokens = typeof avaliableTokens

export type SwapState = {
  expertMode: boolean
  setExpertMode: useStateType<boolean>
  multihops: boolean
  setMultihops: useStateType<boolean>
  slippageTolerance: number
  setSlippageTolerance: useStateType<number>
  selectedInputToken: string
  setSelectedInputToken: useStateType<string>
  selectedOutputToken: string
  setSelectedOutputToken: useStateType<string>
  outputTokenValue: number
  setOutputTokenValue: useStateType<number>
  inputTokenValue: number
  setInputTokenValue: useStateType<number>
  transactionDeadLine: number
  setTransactionDeadLine: useStateType<number>
  inputTokens: string[]
  outputTokens: string[]
  gasPrice: number
  valueInOutputToken: number
  balances: { [key: string]: number }
  priceInUSD: number
}

export const useSwap = () => {
  const inputTokens = ['XMR', 'ETH', 'DAI', 'FRAX']
  const outputTokens = ['ETH', 'gCNV']
  const balances = {
    XMR: 12,
    ETH: 34,
    DAI: 789,
    FRAX: 21,
    gCNV: 31,
  }

  const USDValues = {
    XMR: 149.95,
    ETH: 2610.19,
    DAI: 1,
    FRAX: 1,
    gCNV: 3463.845,
  }

  const gasPrice = 103.3
  const [selectedInputToken, setSelectedInputToken] = useState('XMR')
  const [selectedOutputToken, setSelectedOutputToken] = useState('gCNV')

  const [priceInUSD, setPriceInUSD] = useState(0)

  const [valueInOutputToken, setValueInOutputToken] = useState(0)
  const [expertMode, setExpertMode] = useState(false)
  const [multihops, setMultihops] = useState(true)
  const [transactionDeadLine, setTransactionDeadLine] = useState(30)
  const [slippageTolerance, setSlippageTolerance] = useState(0.3)
  const [inputTokenValue, setInputTokenValue] = useState(1.343)
  const [outputTokenValue, setOutputTokenValue] = useState(0.143)

  useEffect(() => {
    setPriceInUSD(USDValues[selectedOutputToken])
    const result = USDValues[selectedOutputToken] / USDValues[selectedInputToken]
    setValueInOutputToken(+result.toFixed(2))
  }, [selectedOutputToken, selectedInputToken])

  return {
    selectedInputToken,
    setSelectedInputToken,
    inputTokenValue,
    setInputTokenValue,
    selectedOutputToken,
    setSelectedOutputToken,
    outputTokenValue,
    setOutputTokenValue,
    slippageTolerance,
    setSlippageTolerance,
    expertMode,
    setExpertMode,
    multihops,
    setMultihops,
    transactionDeadLine,
    setTransactionDeadLine,
    inputTokens,
    outputTokens,
    gasPrice,
    valueInOutputToken,
    balances,
    priceInUSD,
  }
}
