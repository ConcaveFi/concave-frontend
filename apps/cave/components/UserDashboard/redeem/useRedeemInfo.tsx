import { CurrencyAmount, Token } from '@concave/core'
import { BigNumber } from '@ethersproject/bignumber'
import { Address } from '@wagmi/core'
import { useEffect, useState } from 'react'
import { useCalculateRedemptionAmount } from './usePCNVPrice'

export type RedeemFields<Tout extends Token, Tin extends Token> = {
  address?: Address
  allowMax?: boolean
  maxValue?: BigNumber
  immutableAmount?: boolean
  isLoading?: boolean
  setTo?: (to: string) => void
  to?: string
  amountIn: CurrencyAmount<Tin>
  amountOut: CurrencyAmount<Tout>
  setAmountOut?: (a: CurrencyAmount<Tout>) => void
  disabled?: boolean
  setAmount?: (amount: BigNumber) => void
  redemptions?: [
    {
      address: string
      amount: number
      txHash: string
    },
  ]
}

export const useRedeemInfo = <TOut extends Token, TIn extends Token>({
  tokenIn,
  disabled,
  immutableAmount = false,
  ...props
}: {
  disabled?: boolean
  immutableAmount?: boolean
  amountOut: CurrencyAmount<TOut>
  tokenIn: TIn
}) => {
  const [to, setTo] = useState('')
  const tokenOut = props.amountOut.currency
  const [amountOut, setAmountOut] = useState<CurrencyAmount<TOut>>(props.amountOut)
  const [amountIn, setAmountIn] = useState<CurrencyAmount<TIn>>(
    CurrencyAmount.fromRawAmount(tokenIn, 0),
  )
  const cnvCalculator = useCalculateRedemptionAmount(tokenOut, tokenIn)
  useEffect(() => {
    if (!cnvCalculator.isSuccess) return
    if (!cnvCalculator.data) return
    setAmountIn(cnvCalculator.data.calculateRedemptionAmount(amountOut))
  }, [amountOut])

  return {
    immutableAmount,
    amountIn,
    amountOut,
    setAmountOut,
    to,
    disabled,
    setTo,
    ...cnvCalculator,
  } satisfies RedeemFields<TOut, TIn>
}
