import { useColorModePreference } from '@concave/ui'
import { coingecko } from 'lib/coingecko.adapter'
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const defautValue = {
  from: {
    symbol: 'DAI',
    maxAmount: 1000,
    amountUSD: 0,
    amount: 0,
    price: 0,
  },
  to: {
    symbol: 'ETH',
    maxAmount: 10,
    amount: 0,
    amountUSD: 0,
    price: 0,
  },
  priceImpact: -0.12,
  expertMode: false,
  multihops: true,
  valueInOutputToken: 0,
  transactionDeadLine: 30,
  slippageTolerance: 0.3,
  inputTokens: ['gCNV', 'XMR', 'ETH', 'DAI', 'FRAX'],
  outputTokens: ['gCNV', 'XMR', 'ETH', 'DAI', 'FRAX'],
}

export type Token = {
  symbol: string
  maxAmount: number
  amount: number | string
  amountUSD: number
  price: number
}

export type SwapStateProps = {
  from: Token
  to: Token
  expertMode: boolean
  multihops: boolean
  valueInOutputToken: number
  transactionDeadLine: number
  slippageTolerance: number
  priceImpact: number
  inputTokens: string[]
  outputTokens: string[]
}

export type UseSwap = SwapStateProps & {
  swithTokens: () => void
  setFrom: (token: Token) => void
  setTo: (token: Token) => void
  set: (swap: Partial<SwapStateProps>) => void
}

const USEPRICE = 'USEPRICE'

export const usePrice = (symbol: string) => {
  const { data } = useQuery([USEPRICE, symbol], () => coingecko.getTokenPrice(symbol))
  return data?.value
}

export const useSwap = (partialValues: Partial<SwapStateProps>): UseSwap => {
  const [swapValue, setSwapValue] = useState({ ...defautValue, ...partialValues })

  const fromPrice = usePrice(swapValue.from.symbol)
  const toPrice = usePrice(swapValue.to.symbol)

  const set = (value: Partial<SwapStateProps>) => {
    setSwapValue((currentValue) => ({ ...currentValue, ...value }))
  }

  const setFrom = async (token: Partial<Token>) => {
    const from = { ...swapValue.from, ...token }
    const to = swapValue.to
    to.amount = toPrecision((+token.amount * from.price) / to.price)
    set({ from, to })
  }

  const setTo = async (token: Partial<Token>) => {
    const to = { ...swapValue.to, ...token }
    const from = swapValue.from
    from.amount = toPrecision((+token.amount * to.price) / from.price)
    set({ to, from })
  }

  const swithTokens = () => {
    set({
      from: { ...swapValue.to },
      to: { ...swapValue.from },
    })
  }

  useEffect(() => {
    setSwapValue(({ to, from, ...swap }) => {
      from.price = fromPrice
      to.amount = calcAmount(from, to)
      return { ...swap, to, from }
    })
  }, [fromPrice, swapValue.from.symbol])

  useEffect(() => {
    setSwapValue(({ to, from, ...swap }) => {
      to.price = toPrice
      from.amount = calcAmount(to, from)
      return { ...swap, to, from }
    })
  }, [toPrice, swapValue.to.symbol])

  return { ...swapValue, swithTokens, setFrom, setTo, set }
}

const calcAmount = (input: Token, target: Token) =>
  toPrecision(+input.amount * input.price) / target.price

export const toPrecision = (n: number, precision = 10000) =>
  Math.round((n || 0) * precision) / precision
