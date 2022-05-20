import { useQuery, UseQueryResult } from 'react-query'
import { chain, useNetwork } from 'wagmi'
import { Currency, Fetcher, NATIVE, Token } from '@concave/gemswap-sdk'
import { concaveProvider } from 'lib/providers'

const concaveTokenList = (networkName: string) =>
  `/assets/tokenlists/${networkName.toLowerCase()}/concave.json`

export const useTokenList = () => {
  const { activeChain, isSuccess } = useNetwork()
  const provider = concaveProvider(activeChain?.id || 1)
  return useQuery(
    ['token-list', activeChain?.name],
    async () => {
      return fetch(concaveTokenList(activeChain.name))
        .then((d) => d.json() as Promise<ConcaveTokenList>)
        .then((l) => l.tokens)
        .then((list) => list.filter((t) => t.chainId === (activeChain?.id || 1)))
        .then((list) => list.map((token) => Fetcher.fetchTokenData(token.address, provider)))
        .then((tokens) => Promise.all(tokens))
    },
    {
      initialData: [],
      enabled: isSuccess,
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
  const chainName = activeChain?.id === chain.ropsten.id ? chain.ropsten.name : chain.mainnet.name
  const url = `https://deep-index.moralis.io/api/v2/${address}/erc20?chain=${chainName}`
  return useQuery(
    ['LISTTOKENS', address],
    () => {
      return fetch(url, { headers })
        .then((r) => r.json())
        .then((tokens) =>
          (tokens || []).map(
            (token: MoralisERC20Token) =>
              new Token(
                chain.ropsten.id,
                token.token_address,
                +token.decimals,
                token.symbol,
                token.name,
              ),
          ),
        )
    },
    {
      initialData: [],
      enabled: !!address,
    },
  )
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
