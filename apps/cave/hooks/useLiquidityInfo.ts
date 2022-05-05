import { Fetcher, Pair } from '@concave/gemswap-sdk'
import { liquidityContractABI } from 'lib/liquidityContractABI'
import { concaveProvider } from 'lib/providers'
import { useEffect } from 'react'
import { useState } from 'react'
import { chain } from 'wagmi'
import { BigNumber, Contract } from 'ethers'
import { CurrencyAmount, Token } from '@concave/gemswap-sdk'
import { formatUnits } from 'ethers/lib/utils'
import { useCurrencyBalance } from './useCurrencyBalance'

export const useLiquidityInfo = (token: Token) => {
  const selectedChain = token.chainId === chain.ropsten.id ? chain.ropsten : chain.mainnet
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>()
  const [totalSupply, setTotalSupply] = useState<BigNumber>(BigNumber.from('0'))
  const [pair, setPair] = useState<Pair>(null)
  const userBalance = useCurrencyBalance(token, { watch: true })
  const [userPoolShare, setUserPoolShare] = useState(0)

  useEffect(() => {
    if (!userBalance.isSuccess) {
      return
    }
    const liquidityContract = new Contract(
      token.address,
      liquidityContractABI,
      concaveProvider(selectedChain.id),
    )

    liquidityContract.getReserves().then((reserves) => {
      Promise.all([
        reserves._baseReserves as BigNumber,
        reserves._quoteReserves as BigNumber,
        liquidityContract
          .token0()
          .then((address) => Fetcher.fetchTokenData(address, concaveProvider(selectedChain.id))),
        liquidityContract
          .token1()
          .then((address) => Fetcher.fetchTokenData(address, concaveProvider(selectedChain.id))),
        liquidityContract.totalSupply(),
      ])
        .then(([amount0, amount1, token0, token1, totalSupply]) => {
          const tokenA: CurrencyAmount<Token> = CurrencyAmount.fromRawAmount(
            token0,
            amount0.toString(),
          )
          const tokenB: CurrencyAmount<Token> = CurrencyAmount.fromRawAmount(
            token1,
            amount1.toString(),
          )
          if (tokenA && tokenB) {
            setPair(new Pair(tokenB, tokenA, token.address))
          }
          setTotalSupply(totalSupply)
          const totalAmount = CurrencyAmount.fromRawAmount(token, totalSupply.toString())
          setUserPoolShare(+totalAmount.toExact() / +userBalance.data.toExact())
          setLoading(false)
        })
        .catch((e) => {
          console.error(e)
          setError(e)
        })
    })
  }, [selectedChain, token, userBalance.data, userBalance.isSuccess])

  return [{ pair, token, totalSupply, userPoolShare, userBalance }, isLoading, error] as const
}

export type LiquidityInfo = ReturnType<typeof useLiquidityInfo>
export type LiquidityInfoData = LiquidityInfo[0]
