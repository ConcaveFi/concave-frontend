import { Currency, NATIVE, Token } from '@concave/core'
import { Fetcher } from '@concave/gemswap-sdk'
import { fetchJson } from 'ethers/lib/utils'
import { concaveProvider } from 'lib/providers'
import { useQuery, UseQueryResult } from 'react-query'
import { Chain, chain, useNetwork } from 'wagmi'

const concaveTokenList = (networkName: string) =>
  `/assets/tokenlists/${networkName.toLowerCase()}/concave.json`

const fetchTokenList = async (chain: Chain) => {
  const tokenList = await fetchJson(concaveTokenList(chain.name))
  const chainTokens = tokenList.tokens.filter((t) => t.chainId === chain.id)
  return chainTokens.map((t) => new Token(t.chainId, t.address, t.decimals, t.symbol, t.name))
}

export const useTokenList = () => {
  const { chain: activeChain } = useNetwork()

  return useQuery(
    ['token-list', activeChain?.id || 1],
    async () => fetchTokenList(activeChain?.unsupported ? chain.mainnet : activeChain),
    { placeholderData: [], refetchOnWindowFocus: false },
  )
}

export const useFetchTokenData = (chainID: number | string, address: string) => {
  return useQuery(
    ['fetchToken', address, +chainID],
    () => fetchTokenData(chainID, address, concaveProvider(+chainID)),
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
  console.log(address)
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
  const chainName = activeChain?.id === chain.rinkeby.id ? chain.rinkeby.name : 'eth'
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
              chain.rinkeby.id,
              token.token_address,
              +token.decimals,
              token.symbol,
              token.name,
            ),
        ),
      )
  })
}

type Version = {
  major: number
  minor: number
  patch: number
}

type Tags = {}

type ConcaveTokenList = {
  name: string
  timestamp: Date
  version: Version
  tags: Tags
  logoURI: string
  keywords: string[]
  tokens: {
    chainId: number
    address: string
    name: string
    symbol: string
    decimals: number
    logoURI: string
  }[]
}

type MoralisERC20Token = {
  token_address: string
  name: string
  symbol: string
  logo?: any
  thumbnail?: any
  decimals: string
  balance: string
}
