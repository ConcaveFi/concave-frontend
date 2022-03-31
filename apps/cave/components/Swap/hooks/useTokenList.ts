import { useQuery } from 'react-query'
import { Chain, chain, useNetwork } from 'wagmi'
import { utils } from 'ethers'
import { Token } from 'constants/routing'

// const concaveTokenList = `https://raw.githubusercontent.com/ConcaveFi/assets/main/networks/mainnet/tokenlist.json`

// export const useTokenList = () => {
//   const [{ data: network }] = useNetwork()
//   const chainId = network?.chain?.id || chain.mainnet.id

//   return useQuery(
//     ['token-list', chainId],
//     async () => {
//       const tokenList = await fetch(concaveTokenList).then((d) => d.json())
//       return tokenList.tokens
//         .filter((token) => utils.isAddress(token.address) && token.chainId === chainId)
//         .map((token) => new Token(token))
//     },
//     { staleTime: Infinity },
//   )
// }

const concaveTokenList = (networkName: string) =>
  `/assets/tokenlists/${networkName.toLowerCase()}/concave.json`

export const useTokenList = () => {
  const [{ data: network }] = useNetwork()
  const chainId = network?.chain?.id || chain.mainnet.id
  const networkName = chain.ropsten.id === chainId ? chain.ropsten.name : chain.mainnet.name
  const tokenList = concaveTokenList(networkName)
  return useQuery(['token-list', chainId], () =>
    fetch(tokenList)
      .then((d) => d.json())
      .then((l) => l.tokens)
      .then((list) =>
        list.map((token) => {
          return new Token({
            chainId: chain.ropsten.id,
            address: token.address,
            decimals: token.decimals,
            symbol: token.symbol,
            name: token.name,
            logoURI: token.logoURI,
          })
        }),
      ),
  )
}
