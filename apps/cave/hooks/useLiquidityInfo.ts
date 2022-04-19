import { Pair } from 'gemswap-sdk'
import { liquidityContractABI } from 'lib/liquidityContractABI'
import { concaveProvider } from 'lib/providers'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { chain } from 'wagmi'
import { BigNumber, Contract } from 'ethers'
import { CurrencyAmount, Token } from 'gemswap-sdk'
import { findTokenByAddress } from 'components/AMM/hooks/useTokenList'

const getToken = (selectedChain, address: string) => {
  return new Token(selectedChain.id, address, 18, 'symbol', 'name')
}

export const useLiquidityInfo = (token: Token) => {
  const selectedChain = token.chainId === chain.ropsten.id ? chain.ropsten : chain.mainnet
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>()
  const [totalSupply, setTotalSupply] = useState<BigNumber>(BigNumber.from('0'))
  const liquidityContract = useMemo(() => {
    return new Contract(token.address, liquidityContractABI, concaveProvider(selectedChain.id))
  }, [token.address, selectedChain])
  const [pair, setPair] = useState<Pair>(null)
  useEffect(() => {
    liquidityContract.getReserves().then((reserves) => {
      Promise.all([
        reserves._baseReserves as BigNumber,
        reserves._quoteReserves as BigNumber,
        findTokenByAddress(selectedChain, liquidityContract.token0()),
        findTokenByAddress(selectedChain, liquidityContract.token1()),
        liquidityContract.totalSupply(),
      ])
        .then(([amount0, amount1, token0, token1, totalSupply]) => {
          console.table({
            token0: token0.address,
            token1: token1.address,
          })
          const tokenA: CurrencyAmount<Token> = CurrencyAmount.fromRawAmount(
            token0,
            amount0.toString(),
          )
          const tokenB: CurrencyAmount<Token> = CurrencyAmount.fromRawAmount(
            token1,
            amount1.toString(),
          )
          setTotalSupply(totalSupply)
          if (tokenA && tokenB) {
            setPair(new Pair(tokenB, tokenA, token.address))
          }
          setTotalSupply(totalSupply)
          setLoading(false)
        })
        .catch(setError)
    })
  }, [liquidityContract, selectedChain, token.address])

  return [{ pair, token, totalSupply }, isLoading, error] as const
}
