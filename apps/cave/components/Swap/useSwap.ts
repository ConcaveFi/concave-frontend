import { useColorModePreference } from '@concave/ui'
import { coingecko } from 'lib/coingecko.adapter'
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const defaultValue = {
  from: {
    symbol: 'DAI',
    maxAmount: 1000,
    amount: 0,
    price: 0,
  },
  to: {
    symbol: 'CNV',
    maxAmount: 11320,
    amount: 0,
    price: 0,
  },
  priceImpact: -0.12,
  minimumReceivedAfterSlippage: 0,
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
  price: number
}

export type SwapStateProps = {
  minimumReceivedAfterSlippage: number
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
  switchTokens: () => void
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
  const [swap, setSwap] = useState({ ...defaultValue, ...partialValues })
  const fromPrice = usePrice(swap.from.symbol)
  const toPrice = usePrice(swap.to.symbol)

  const set = (value: Partial<SwapStateProps>) => {
    setSwap((currentValue) => ({ ...currentValue, ...value }))
  }

  const setFrom = async (token: Partial<Token>) => {
    const from = { ...swap.from, ...token }
    const to = swap.to
    to.amount = toPrecision((+token.amount * from.price) / to.price)
    set({ from, to })
  }

  const setTo = async (token: Partial<Token>) => {
    const to = { ...swap.to, ...token }
    const from = swap.from
    from.amount = toPrecision((+token.amount * to.price) / from.price)
    set({ to, from })
  }

  const switchTokens = () => {
    set({
      from: { ...swap.to },
      to: { ...swap.from },
    })
  }

  const setBalance = async (token: Partial<SwapStateProps>) => {
    set({ from, to })
  }

  useEffect(() => {
    setSwap(({ to, from, ...swap }) => {
      from.price = fromPrice
      to.amount = calcAmount(from, to)
      return { ...swap, to, from }
    })
  }, [fromPrice, swap.from.symbol])

  useEffect(() => {
    setSwap(({ to, from, ...swap }) => {
      to.price = toPrice
      from.amount = calcAmount(to, from)
      return { ...swap, to, from }
    })
  }, [toPrice, swap.to.symbol])

  useEffect(() => {
    const minimumReceivedAfterSlippage = +swap.to.amount * (1 - swap.slippageTolerance / 100)
    setSwap((old) => ({
      ...old,
      minimumReceivedAfterSlippage: toPrecision(minimumReceivedAfterSlippage, 5),
    }))
  }, [swap.to, swap.slippageTolerance])

  return { ...swap, switchTokens, setFrom, setTo, set }
}

const calcAmount = (input: Token, target: Token) =>
  toPrecision(+input.amount * input.price) / target.price

export const toPrecision = (n: number, precision = 10000) =>
  Math.round((n || 0) * precision) / precision
