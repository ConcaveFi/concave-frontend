import { CandleStickIntervalTypes } from 'components/CandleStickCard/useCandleStickChart'
import { chain } from 'wagmi'
import { coingeckoApi } from './coingecko.api'
import { AvailableTokens, availableTokens } from './tokens'

class TokenService {
  private tokens = Object.values(availableTokens)
  constructor(private networkName: string = chain.mainnet.name) {}
  async listTokens(search: { label?: string }) {
    if (!search) {
      return this.tokens
    }
    return this.tokens
      ?.filter(
        (d) =>
          ~d.name.indexOf(search.label) ||
          ~d.symbol.indexOf(search.label) ||
          ~d.coingecko.indexOf(search.label),
      )
      .sort()
  }

  get(symbol: AvailableTokens) {
    return availableTokens[symbol]
  }

  async getTokenPrice(symbol: AvailableTokens) {
    if (this.networkName === chain.ropsten.name) {
      const values = {
        DAI: 1,
        MATIC: 1.68,
        FRAX: 1,
        Tether: 1.2,
      }
      return {
        token: symbol,
        currency: 'usd',
        value: values[symbol],
      }
    }

    const coingecko = symbol.toLowerCase()
    return Promise.resolve(
      coingeckoApi.tokenPrice({
        currency: 'usd',
        ids: coingecko,
      }),
    )
  }

  async fetchCandleStickData({
    token,
    interval,
  }: {
    token: AvailableTokens
    interval: CandleStickIntervalTypes
  }) {
    const { coingecko } = this.get(token)
    const days = daysOptions[interval]
    return coingeckoApi.fetchCandleStickData({ id: coingecko, days })
  }
}

const daysOptions = {
  '5m': '1',
  '15m': '7',
  '1H': '14',
  '4H': '30',
  '1D': '365',
} as const
export const tokenService = new TokenService(chain.ropsten.name)
