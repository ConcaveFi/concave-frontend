import { Currency, NATIVE, Token } from '@concave/core'
import { Fetcher } from '@concave/gemswap-sdk'
import { Provider } from '@wagmi/core'
import { queryClient } from 'contexts/ReactQueryContext'
import { concaveProvider } from 'contexts/Wagmi/WagmiContext'
import { fetchJson } from 'ethers/lib/utils'
import ms from 'ms'
import { useQuery, UseQueryResult } from 'react-query'
import { Chain, useNetwork, useProvider } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'

const concaveTokenList = (networkName: string) =>
  `/assets/tokenlists/${networkName.toLowerCase()}/concave.json`

const fetchLiquidityTokenList = async (chain: Chain, provider: Provider) => {
  const store =
    typeof window !== 'undefined' && window.localStorage ? window.localStorage : undefined
  if (!store) return []
  const [tokenList, pairs] = await Promise.all([
    fetchJson(concaveTokenList(chain.name)) as Promise<{ tokens: Token[] }>,
    Fetcher.fetchPairs(chain.id, provider, store),
  ])
  const chainTokens = tokenList.tokens.filter((t) => t.chainId === chain.id)
  const liquidityTokens = chainTokens.filter((t) => {
    const address = t.address.toUpperCase()
    return pairs.find((p) => {
      return (
        p.token0.address.toUpperCase() === address || p.token1.address.toUpperCase() === address
      )
    })
  })
  return liquidityTokens.map((t) => new Token(t.chainId, t.address, t.decimals, t.symbol, t.name))
}

export const useLiquidityTokenList = () => {
  const network = useNetwork()
  const activeChain = network.chain?.unsupported ? mainnet : network.chain || mainnet

  const provider = useProvider()

  const tokens = useQuery(
    ['token-liqidity-list', activeChain.id],
    async () => fetchLiquidityTokenList(activeChain, provider),
    {
      enabled: typeof window !== 'undefined' && !!window.localStorage,
      cacheTime: ms('10h'),
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )
  return tokens
}

export const useTokenList = () => {
  const network = useNetwork()
  const activeChain = network.chain?.unsupported ? mainnet : network.chain || mainnet
  const provider = useProvider()
  const tokens = useQuery(
    ['token-list', activeChain.id],
    async () => fetchLiquidityTokenList(activeChain, provider),
    { placeholderData: [], refetchOnWindowFocus: false },
  )
  return tokens
}

export const useFetchTokenData = (chainID: number | string, address: string) => {
  const provider = useProvider()
  return useQuery(
    ['fetchToken', address, +chainID],
    () => fetchTokenData(chainID, address, provider),
    {
      enabled: !!chainID && !!address,
    },
  )
}

export const fetchTokenData = (
  chainID: number | string,
  address: string,
  provider: any,
): Promise<Currency> => {
  if (!address) return undefined
  if (address === '0x0000000000000000000000000000000000000000')
    return Promise.resolve(NATIVE[chainID])
  if (address === NATIVE[chainID].symbol) return Promise.resolve(NATIVE[chainID])
  return Fetcher.fetchTokenData(address, provider)
}

const headers = { 'x-api-key': process.env.NEXT_PUBLIC_MORALIS_TOKEN }
export const useAddressTokenList: (address?: string) => UseQueryResult<Token[], unknown> = (
  address: string,
) => {
  const { chain: activeChain } = useNetwork()
  const chainName = activeChain?.id === goerli.id ? goerli.name : 'eth'
  const url = `https://deep-index.moralis.io/api/v2/${address}/erc20?chain=${chainName}`
  return useQuery(['LISTTOKENS', address], () => {
    if (!address) {
      return []
    }
    return fetch(url, { headers })
      .then((r) => r.json())
      .then((tokens) =>
        (tokens || []).map(
          (token: MoralisERC20Token) =>
            new Token(
              activeChain.id,
              token.token_address,
              +token.decimals,
              token.symbol,
              token.name,
            ),
        ),
      )
  })
}

export const prefetchTokenList = () =>
  queryClient.prefetchQuery({
    queryKey: ['token-liqidity-list', 1],
    queryFn: async () => fetchLiquidityTokenList(mainnet, concaveProvider({ chainId: 1 })),
  })

type MoralisERC20Token = {
  token_address: string
  name: string
  symbol: string
  logo?: any
  thumbnail?: any
  decimals: string
  balance: string
}
