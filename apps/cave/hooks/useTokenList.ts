import { useQuery, UseQueryResult } from 'react-query'
import { chain, useNetwork } from 'wagmi'
import { Currency, NATIVE, Token } from '@concave/core'
import { Fetcher } from '@concave/gemswap-sdk'
import { concaveProvider } from 'lib/providers'
import { add } from 'date-fns'
import { fetchJson } from 'ethers/lib/utils'

const concaveTokenList = (networkName: string) =>
  `/assets/tokenlists/${networkName.toLowerCase()}/concave.json`

export const useTokenList = () => {
  const { activeChain } = useNetwork()

  return useQuery(
    ['token-list', activeChain.id || 1],
    async () => {
      const tokenList = await fetchJson(concaveTokenList(activeChain.name))
      const chainTokens = tokenList.tokens.filter((t) => t.chainId === activeChain.id)
      return chainTokens.map((t) => new Token(t.chainId, t.address, t.decimals, t.symbol, t.name))
    },
    {
      enabled: !!activeChain.id,
      placeholderData: [],
    },
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
  if (!address) return undefined
  if (address === NATIVE[chainID].symbol) return Promise.resolve(NATIVE[chainID])
  return Fetcher.fetchTokenData(address, provider)
}

const headers = { 'x-api-key': process.env.NEXT_PUBLIC_MORALIS_TOKEN }
export const useAddressTokenList: (address?: string) => UseQueryResult<Token[], unknown> = (
  address: string,
) => {
  const { activeChain } = useNetwork()
  const chainName = activeChain?.id === chain.rinkeby.id ? chain.rinkeby.name : chain.mainnet.name
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
