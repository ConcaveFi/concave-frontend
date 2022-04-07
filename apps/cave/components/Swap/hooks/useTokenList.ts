import { Token } from 'lib/tokens'
import { useQuery, UseQueryResult } from 'react-query'
import { chain, useNetwork } from 'wagmi'

const concaveTokenList = (networkName: string) =>
  `/assets/tokenlists/${networkName.toLowerCase()}/concave.json`

export const useTokenList = (networkName: string = chain.mainnet.name) => {
  return useQuery('token-list', () =>
    fetch(concaveTokenList(networkName))
      .then((d) => d.json() as Promise<ConcaveTokenList>)
      .then((l) => l.tokens)
      .then((list) =>
        list.map((token) => {
          return new Token(
            chain.ropsten.id,
            token.address,
            token.decimals,
            token.symbol,
            token.name,
            token.logoURI,
          )
        }),
      ),
  )
}

//PUT IN .ENV
const MORALIS_TOKEN = '10NauNE7btm4qS8AbMv1ojkXhxsgh1FTJiSwH7SctkCSGKCCXPzwZpswmnNDmmrd'
const headers = { 'x-api-key': MORALIS_TOKEN }
export const useAddressTokenList: (address?: string) => UseQueryResult<Token[], unknown> = (
  address: string,
) => {
  const [{ data: network }] = useNetwork()
  const chainName =
    network?.chain?.id === chain.ropsten.id ? chain.ropsten.name : chain.mainnet.name
  const url = `https://deep-index.moralis.io/api/v2/${address}/erc20?chain=${chainName}`
  console.log(url)
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
              token.logo ?? '',
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
