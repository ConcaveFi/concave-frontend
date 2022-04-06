import { Pair } from '@uniswap/v2-sdk'
import { BigNumber, Contract } from 'ethers'
import { CurrencyAmount, Token } from 'gemswap-sdk'
import { useEffect, useMemo, useState } from 'react'
import { chain } from 'wagmi'
import { liquidityContractABI } from '../lib/liquidityContractABI'
import { concaveProvider } from '../lib/providers'

const getToken = (selectedChain, address: string) => {
  return new Token(selectedChain.id, address, 18, 'symbol', 'name')
}

export const useLiquidityInfo = (token: Token, selectedChain = chain.ropsten) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>()

  const liquidityContract = useMemo(() => {
    return new Contract(token.address, liquidityContractABI, concaveProvider(selectedChain.id))
  }, [token.address, selectedChain])

  const [pair, setPair] = useState<Pair>(null)
  useEffect(() => {
    liquidityContract
      .getReserves()
      .then((reserves) => {
        Promise.all([
          reserves._quoteReserves as BigNumber,
          reserves._baseReserves as BigNumber,
          liquidityContract.token0().then((t: string) => getToken(selectedChain, t)),
          liquidityContract.token1().then((t: string) => getToken(selectedChain, t)),
        ])
          .then(([amount0, amount1, token0, token1]) => {
            const tokenA: CurrencyAmount<Token> = CurrencyAmount.fromRawAmount(
              token0,
              amount0.toString(),
            )
            const tokenB: CurrencyAmount<Token> = CurrencyAmount.fromRawAmount(
              token1,
              amount1.toString(),
            )
            if (tokenA && tokenB) {
              console.log(tokenA, tokenB)
              // setPair(new Pair(tokenA, tokenB))
            }
            setLoading(false)
          })
          .catch(setError)
      })
      .catch((e) => {
        console.error(e)
        console.error(`Error on loading ${token.symbol} ${token.address}`)
        console.error(token)
      })
  }, [liquidityContract, selectedChain, token])

  return [{ pair, token }, isLoading, error] as const
}
