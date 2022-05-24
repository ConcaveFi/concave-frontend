import { Token, CurrencyAmount } from '@concave/core'
import { Contract } from 'ethers'
import { useQuery } from 'react-query'
import { erc20ABI, useProvider } from 'wagmi'

export const useTotalSupply = (token: Token) => {
  const provider = useProvider()
  return useQuery(['totalSupply', token.address], async () => {
    const _totalSupply = await new Contract(token.address, erc20ABI, provider).totalSupply()
    return CurrencyAmount.fromRawAmount(token, _totalSupply.toString())
  })
}
