import { CandleStickIntervalTypes } from 'components/CandleStickCard/useCandleStickChart'
import { coingeckoApi } from './coingecko.api'
import { AvailableTokens, availableTokens } from './tokens'

class TokenService {
  private tokens = Object.values(availableTokens)
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
    const { coingecko } = availableTokens[symbol]
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
export const tokenService = new TokenService()
