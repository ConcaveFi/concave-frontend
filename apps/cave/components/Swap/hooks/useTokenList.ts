import { useQuery } from 'react-query'
import { chain } from 'wagmi'

const concaveTokenList = (networkName: string) =>
  `https://raw.githubusercontent.com/ConcaveFi/concave-frontend/develop/assets/tokenlists/${networkName.toLowerCase()}/concave.json?token=GHSAT0AAAAAABP22MUFL2A4E2TJGIFGACZIYSM2RBQ`

export const useTokenList = (networkName: string = chain.mainnet.name) => {
  const tokenList = concaveTokenList(networkName)
  return useQuery('token-list', () =>
    fetch(tokenList)
      .then((d) => d.json())
      .then((l) => l.tokens),
  )
}
