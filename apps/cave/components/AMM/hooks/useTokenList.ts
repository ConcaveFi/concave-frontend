import { useQuery, UseQueryResult } from 'react-query'
import { Chain, chain, useNetwork } from 'wagmi'
import { Token } from 'gemswap-sdk'

const concaveTokenList = (networkName: string) =>
  `/assets/tokenlists/${networkName.toLowerCase()}/concave.json`

export const useTokenList = () => {
  const [
    {
      data: { chain },
    },
  ] = useNetwork()

  return useQuery(['token-list', chain?.name], () =>
    fetch(concaveTokenList(chain.name))
      .then((d) => d.json() as Promise<ConcaveTokenList>)
      .then((l) => l.tokens)
      .then((list) =>
        list.map((token) => {
          return new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
        }),
      ),
  )
}

export const findTokenByAddress = async (
  selectedChain: Chain = chain.mainnet,
  address: Promise<string>,
) => {
  const tokenAddress = await address
  return fetch(concaveTokenList(selectedChain.name))
    .then((d) => d.json() as Promise<ConcaveTokenList>)
    .then((l) => l.tokens)
    .then((list) =>
      list.find((token) => token.address.toLowerCase() === tokenAddress.toLowerCase()),
    )
    .then((token) => {
      if (!token) return new Token(chain.ropsten.id, tokenAddress, 18, 'NA', 'Not Found Token')
      return new Token(chain.ropsten.id, token.address, token.decimals, token.symbol, token.name)
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
    return fetch(url, { headers })
      .then((r) => r.json())
      .then((tokens) =>
        tokens.map(
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
