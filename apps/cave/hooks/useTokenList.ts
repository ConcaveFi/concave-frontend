import { useQuery, UseQueryResult } from 'react-query'
import { chain, useNetwork } from 'wagmi'
import { Fetcher, Token } from '@concave/gemswap-sdk'
import { concaveProvider } from 'lib/providers'

const concaveTokenList = (networkName: string) =>
  `/assets/tokenlists/${networkName.toLowerCase()}/concave.json`

export const useTokenList = () => {
  const [
    {
      data: { chain: selectedChain = chain.mainnet },
      loading,
    },
  ] = useNetwork()
  const provider = concaveProvider(selectedChain.id)
  return useQuery(['token-list', selectedChain.name], async () => {
    if (loading) return []
    return fetch(concaveTokenList(selectedChain.name))
      .then((d) => d.json() as Promise<ConcaveTokenList>)
      .then((l) => l.tokens)
      .then((list) => list.filter((t) => t.chainId === selectedChain.id))
      .then((list) => list.map((token) => Fetcher.fetchTokenData(token.address, provider)))
      .then((tokens) => Promise.all(tokens))
  })
}

export const useFetchTokenData = (chainID: number, address: string) => {
  return useQuery(['fetchToken', address, chainID], () => {
    return Fetcher.fetchTokenData(address, concaveProvider(chainID))
  })
}

const headers = { 'x-api-key': process.env.NEXT_PUBLIC_MORALIS_TOKEN }
export const useAddressTokenList: (address?: string) => UseQueryResult<Token[], unknown> = (
  address: string,
) => {
  const [{ data: network }] = useNetwork()
  const chainName =
    network?.chain?.id === chain.ropsten.id ? chain.ropsten.name : chain.mainnet.name
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
              chain.ropsten.id,
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
