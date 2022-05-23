import { CurrencyAmount, Token } from '@concave/core'
import { Fetcher } from '@concave/gemswap-sdk'
import { concaveProvider } from 'lib/providers'
import { useEffect } from 'react'
import { useState } from 'react'
import { BigNumber } from 'ethers'
import { useCurrencyBalance } from './useCurrencyBalance'
import { useQuery } from 'react-query'

export const useLiquidityInfo = (token: Token) => {
  const { data: pair } = useQuery(['fetchPairFromAddress', token.address], () =>
    Fetcher.fetchPairFromAddress(token.address, concaveProvider(token.chainId)),
  )
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>()
  const [totalSupply, setTotalSupply] = useState<BigNumber>(BigNumber.from('0'))
  const userBalance = useCurrencyBalance(token)
  const [userPoolShare, setUserPoolShare] = useState(0)

  useEffect(() => {
    if (!userBalance.data) {
      return
    }
    if (!pair) {
      return
    }
    setTotalSupply(BigNumber.from(pair.liquidityToken.totalSupply.numerator.toString()))
    const totalAmount = CurrencyAmount.fromRawAmount(
      token,
      pair.liquidityToken.totalSupply.numerator.toString(),
    )
    setUserPoolShare(+userBalance.data.toExact() / +totalAmount.toExact())
    setLoading(false)
  }, [pair, token, userBalance.data])

  return [{ pair, token, totalSupply, userPoolShare, userBalance }, isLoading, error] as const
}

export type LiquidityInfo = ReturnType<typeof useLiquidityInfo>
export type LiquidityInfoData = LiquidityInfo[0]
