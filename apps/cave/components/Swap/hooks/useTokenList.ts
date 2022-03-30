import { useQuery } from 'react-query'
import { chain } from 'wagmi'

const concaveTokenList = (networkName: string) =>
  `https://raw.githubusercontent.com/ConcaveFi/assets/main/networks/${networkName.toLowerCase()}/tokenlist.json`

export const useTokenList = (networkName: string = chain.mainnet.name) => {
  return useQuery('token-list', () =>
    fetch(concaveTokenList(networkName))
      .then((d) => d.json())
      .then((l) => l.tokens),
  )
}
