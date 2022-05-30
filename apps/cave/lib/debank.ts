type DebankChain = 'eth' | 'ftm' | 'avax'

type DebankToken = {
  id: string
  chain: DebankChain
  name: string
  symbol: string
  display_symbol: string
  optimized_symbol: string
  decimals: number
  logo_url: string
  protocol_id: string
  price: number
  is_verified: boolean
  is_core: boolean
  is_wallet: boolean
  time_at: number
  amount: number
  raw_amount: number
}

type DebankProtocol = {
  id: string
  chain: string
  name: string
  site_url: string
  logo_url: string
  has_supported_portfolio: boolean
  tvl: number
  portfolio_item_list: Array<{
    stats: {
      net_usd_value: number
      asset_usd_value: number
      debt_usd_value: number
    }
    update_at: number
    name: string
    detail_types: ['common']
    detail: {
      supply_token_list: Array<DebankToken>
    }
  }>
}

const fetchJson = (url: RequestInfo, options?: RequestInit) =>
  fetch(url, options).then((d) => d.json())

export const fetchTokens = (address: string, chain: DebankChain) =>
  fetchJson(
    `https://openapi.debank.com/v1/user/token_list?is_all=false&has_balance=true&id=${address}&chain_id=${chain}`,
  ) as Promise<DebankToken[]>

export const fetchProtocols = (address: string, chain: DebankChain) =>
  (
    fetchJson(
      `https://openapi.debank.com/v1/user/complex_protocol_list?id=${address}&chain_id=${chain}`,
    ) as Promise<DebankProtocol[]>
  ).then((protocols) =>
    protocols.map((protocol) => ({
      ...protocol,
      total_net_usd_value: protocol.portfolio_item_list.reduce(
        (total, item) => total + item.stats.net_usd_value,
        0,
      ),
    })),
  )

const reduceTokensValue = (tokens) =>
  tokens.reduce((total, token) => total + token.amount * token.price, 0)

export const fetchPortfolio = async (address: string, chain: DebankChain = 'eth') => {
  const [tokens, protocols] = await Promise.all([
    fetchTokens(address, chain),
    fetchProtocols(address, chain),
  ])

  const totalUsd =
    reduceTokensValue(tokens) +
    protocols.reduce((total, protocol) => total + protocol.total_net_usd_value, 0)

  return {
    totalUsd,
    tokens,
    protocols,
  }
}
