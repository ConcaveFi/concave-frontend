import { tokenService } from 'lib/token.service'
import { AvailableTokens, TokenType } from 'lib/tokens'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useQuery } from 'react-query'
import { chain, useBalance } from 'wagmi'
import { useTokenList } from './hooks/useTokenList'
import { BigNumber } from 'ethers'

const selectedChain = chain.ropsten

const defaultValue: SwapStateProps = {
  priceImpact: -0.12,
  minimumReceivedAfterSlippage: 0,
  expertMode: false,
  multihops: true,
  valueInOutputToken: 0,
  transactionDeadLine: 30,
  slippageTolerance: 0.3,
  commonInputTokens: [],
  commonOutputTokens: [],
}

export type SwapStateProps = {
  minimumReceivedAfterSlippage: number
  expertMode: boolean
  multihops: boolean
  valueInOutputToken: number
  transactionDeadLine: number
  slippageTolerance: number
  priceImpact: number
  commonInputTokens: unknown[]
  commonOutputTokens: unknown[]
}
export type WrapperTokenInfo = {
  readonly token?: TokenType
  readonly price: number
  readonly balance: {
    decimals: number
    formatted: string
    symbol: string
    value: BigNumber
  }
}
export type Token = WrapperTokenInfo

export type UseSwap = SwapStateProps & {
  fromAmount: number
  from?: WrapperTokenInfo
  toAmount: number
  to?: WrapperTokenInfo
  switchTokens: () => void
  set: (swap: Partial<SwapStateProps>) => void
  setFromSymbol: (symbol: AvailableTokens) => void
  setFromAmount: (amount: string | number) => void
  setToSymbol: (symbol: AvailableTokens) => void
  setToAmount: (amount: string | number) => void
}

export const useToken = (props: { userAddressOrName: string; symbol?: AvailableTokens }) => {
  const tokens = useTokenList(chain.ropsten.name)
  const [symbol, setSymbol] = useState<AvailableTokens>(props.symbol ?? null)
  const [token, setToken] = useState<TokenType>(null)
  const price = usePrice(symbol)
  const amount = useRef<number>()

  const [{ data: balance }] = useBalance({
    addressOrName: props.userAddressOrName,
    token: token?.address,
    formatUnits: token?.decimals,
  })

  useEffect(() => {
    if (!tokens.isSuccess) {
      return
    }
    setToken(tokens.data.find((t) => t.symbol === symbol))
  }, [symbol, tokens.data, tokens.isSuccess])

  return [{ token, balance, price, amount }, setSymbol] as const
}

const USEPRICE = 'USEPRICE'
export const usePrice = (symbol: AvailableTokens) => {
  const { data } = useQuery([USEPRICE, symbol], () => tokenService.getTokenPrice(symbol))
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
    setFromSymbol(to.token.symbol)
    setToSymbol(from.token.symbol)
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
    setToAmount,
    setToSymbol,
    setFromAmount,
    setFromSymbol,
  }
}
