import { useQuery } from 'react-query'
import { Chain, chain } from 'wagmi'
import { Token as UniswapToken } from '@uniswap/sdk-core'
import { utils } from 'ethers'

const concaveTokenList = `https://raw.githubusercontent.com/ConcaveFi/assets/main/networks/mainnet/tokenlist.json`

export const useTokenList = (network: Chain = chain.mainnet) => {
  return useQuery(
    'token-list',
    async () => {
      const tokenList = await fetch(concaveTokenList).then((d) => d.json())
      return tokenList.tokens
        .filter((token) => utils.isAddress(token.address) && token.chainId === network.id)
        .map((token) => new Token(token))
    },
    { staleTime: Infinity },
  )
}

export class Token extends UniswapToken {
  readonly logoURI?: string
  constructor(token: {
    chainId: number
    address: string
    decimals: number
    symbol?: string
    name?: string
    logoURI?: string
  }) {
    super(token.chainId, token.address, token.decimals, token.symbol, token.name)
    this.logoURI = token.logoURI
  }
}
