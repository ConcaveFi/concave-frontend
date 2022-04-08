import { Pair } from '@uniswap/v2-sdk'
import { liquidityContractABI } from 'lib/liquidityContractABI'
import { concaveProvider2 } from 'lib/providers'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { chain } from 'wagmi'
import { BigNumber, Contract } from 'ethers'
import { CurrencyAmount, Token } from 'gemswap-sdk'

const getToken = (selectedChain, address: string) => {
  return new Token(selectedChain.id, address, 18, 'symbol', 'name')
}

export const useLiquidityInfo = (token: Token) => {
  const selectedChain = token.chainId === chain.ropsten.id ? chain.ropsten : chain.mainnet
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>()
  const liquidityContract = useMemo(() => {
    return new Contract(token.address, liquidityContractABI, concaveProvider2(selectedChain.id))
  }, [token.address, selectedChain])
  const [pair, setPair] = useState<Pair>(null)

  useEffect(() => {
    liquidityContract.getReserves().then((reserves) => {
      Promise.all([
        reserves._baseReserves as BigNumber,
        reserves._quoteReserves as BigNumber,
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
          console.log(token.address, amount0.toString(), amount1.toString())
          if (tokenA && tokenB) {
            //@ts-ignore
            setPair(new Pair(tokenB, tokenA))
          }
          setLoading(false)
        })
        .catch(setError)
    })
  }, [liquidityContract, selectedChain])

  return [{ pair, token }, isLoading, error] as const
}
