import { useQuery } from 'react-query'
import { Chain, chain } from 'wagmi'
import { Token as UniswapToken } from 'gemswap-sdk'
import { utils } from 'ethers'


const concaveTokenList = (networkName: string) =>
  `https://raw.githubusercontent.com/ConcaveFi/assets/main/networks/${networkName.toLowerCase()}/tokenlist.json`

export const useTokenList = (networkName: string = chain.mainnet.name) => {
  return useQuery('token-list', () =>
    fetch(concaveTokenList(networkName))
      .then((d) => d.json())
      .then((l) => l.tokens as TokenType[])
      .then((list) =>
        list.map((token) => {
          const t = new Token(
            chain.ropsten.id,
            token.address,
            token.decimals,
            token.symbol,
            token.name,
          )
          return { ...t, logoURI: token.logoURI } as TokenType
        }),
      ),
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
