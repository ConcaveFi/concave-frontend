import { BigNumber } from 'ethers'
import { addresses } from 'lib/addresses'
import { coingecko } from 'lib/coingecko.adapter'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useQuery } from 'react-query'
import { chain, useBalance } from 'wagmi'

const defaultValue = {
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

export type SwapStateProps = {
  minimumReceivedAfterSlippage: number
  expertMode: boolean
  multihops: boolean
  valueInOutputToken: number
  transactionDeadLine: number
  slippageTolerance: number
  priceImpact: number
  inputTokens: string[]
  outputTokens: string[]
}

export type Token = {
  readonly symbol: string
  readonly price: number
  readonly balance: {
    decimals: number
    formatted: string
    symbol: string
    value: BigNumber
  }
}

export type UseSwap = SwapStateProps & {
  fromAmount: number
  from: Token
  toAmount: number
  to: Token
  switchTokens: () => void
  set: (swap: Partial<SwapStateProps>) => void
  setFromSymbol: (symbol: string) => void
  setFromAmount: (amount: string | number) => void
  setToSymbol: (symbol: string) => void
  setToAmount: (amount: string | number) => void
}

const useToken = (props: { userAddressOrName: string; symbol: string }) => {
  const [symbol, setSymbol] = useState(props.symbol)
  const price = usePrice(symbol)
  const amount = useRef<number>()
  const [{ data: balance }] = useBalance({
    addressOrName: props.userAddressOrName,
    token: addresses[chain.ropsten.id][symbol.toLowerCase()],
    formatUnits: 18,
  })
  const token = {
    amount,
    symbol,
    balance,
    price,
  }
  return [token, setSymbol] as const
}

const USEPRICE = 'USEPRICE'
export const usePrice = (symbol: string) => {
  const { data } = useQuery([USEPRICE, symbol], () => coingecko.getTokenPrice(symbol))
  return data?.value
}

export const useSwap = (
  userAddressOrName: string,
  partialValues: Partial<SwapStateProps>,
): UseSwap => {
  const [swap, setSwap] = useState({ ...defaultValue, ...partialValues })
  const [from, setFromSymbol] = useToken({ userAddressOrName, symbol: 'DAI' })
  const [to, setToSymbol] = useToken({ userAddressOrName, symbol: 'FRAX' })

  const refreshSlippage = useCallback(() => {
    const minimumReceivedAfterSlippage = +to.amount.current * (1 - swap.slippageTolerance / 100)
    set({ minimumReceivedAfterSlippage })
  }, [swap.slippageTolerance, to.amount])

  const set = (value: Partial<SwapStateProps>) => {
    setSwap((currentValue) => ({ ...currentValue, ...value }))
  }

  const switchTokens = () => {
    const tmp = to.amount.current
    to.amount.current = from.amount.current
    from.amount.current = tmp
    setFromSymbol(to.symbol)
    setToSymbol(from.symbol)
  }

  const setFromAmount = useCallback(
    (value?: string) => {
      if (!from.price || !to.price) return
      from.amount.current = value ? +value : from.amount.current
      to.amount.current = (+from.amount.current / to.price) * from.price
      refreshSlippage()
    },
    [from.price, from.amount, refreshSlippage, to.price, to.amount],
  )

  const setToAmount = useCallback(
    (value?: string) => {
      if (!from.price || !to.price) return
      to.amount.current = value ? +value : to.amount.current
      from.amount.current = (+to.amount.current / from.price) * to.price
      refreshSlippage()
    },
    [from.price, from.amount, refreshSlippage, to.price, to.amount],
  )

  useEffect(() => from.price && setFromAmount(), [from.price, setFromAmount])
  useEffect(() => to.price && setToAmount(), [to.price, setToAmount])

  return {
    ...swap,
    to,
    from,
    toAmount: to.amount.current,
    fromAmount: from.amount.current,
    switchTokens,
    set,
    setFromAmount,
    setToAmount,
    setFromSymbol,
    setToSymbol,
  }
}
