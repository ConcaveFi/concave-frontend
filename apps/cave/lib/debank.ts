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
  raw_amount: bigint
}

type DebankProtocol = {
  id: string
  chain: string
  name: string
  site_url: string
  logo_url: string
  has_supported_portfolio: boolean
  tvl: bigint
  net_usd_value: bigint
  asset_usd_value: number
  debt_usd_value: number
}

const fetchJson = (url: RequestInfo, options?: RequestInit) =>
  fetch(url, options).then((d) => d.json())

export const fetchTokens = (address: string, chain: DebankChain) =>
  fetchJson(
    `https://openapi.debank.com/v1/user/token_list?id=${address}&chain_id=${chain}`,
  ) as Promise<DebankToken[]>

export const fetchProtocols = (address: string, chain: DebankChain) =>
  fetchJson(
    `https://openapi.debank.com/v1/user/simple_protocol_list?is_all=true&has_balance=true&id=${address}&chain_id=${chain}`,
  ) as Promise<DebankProtocol[]>

export const fetchPortfolio = async (address: string, chain: DebankChain) => {
  const tokens = await fetchTokens(address, chain)
  const protocols = await fetchProtocols(address, chain)

  return {
    tokens,
    protocols,
  }
}
