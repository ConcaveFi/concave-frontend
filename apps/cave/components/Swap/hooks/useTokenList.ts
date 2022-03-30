import { Token } from '@uniswap/sdk-core'
import { TokenType } from 'lib/tokens'
import { useQuery } from 'react-query'
import { chain } from 'wagmi'

const concaveTokenList = (networkName: string) =>
  `/assets/tokenlists/${networkName.toLowerCase()}/concave.json`

export const useTokenList = (networkName: string = chain.mainnet.name) => {
  const tokenList = concaveTokenList(networkName)
  return useQuery('token-list', () =>
    fetch(tokenList)
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
