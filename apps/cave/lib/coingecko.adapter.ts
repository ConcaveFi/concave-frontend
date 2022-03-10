import { CandleStickIntervalTypes } from 'components/CandleStickCard/useCandleStickChart'
import { CoinType, coingeckoApi } from './coingecko.api'

class CoingeckoApiProxy {
  private coins: Promise<CoinType[]>
  constructor() {}

  async getCoins() {
    if (!this.coins) {
      this.coins = coingeckoApi.fetchCoins()
    }
    return this.coins
  }

  async getTokenId(symbol: string) {
    const coins = await this.getCoins()
    const { id } = coins.find((item) => {
      return item.symbol.toLowerCase() === symbol?.toLowerCase()
    })
    return id
  }

  async getTokenPrice(symbol: string) {
    const id = await this.getTokenId(symbol)
    return Promise.resolve(
      coingeckoApi.tokenPrice({
        currency: 'usd',
        ids: id,
      }),
    )
  }

  async fetchCandleStickData({
    token,
    interval,
  }: {
    token: string
    interval: CandleStickIntervalTypes
  }) {
    const id = await this.getTokenId(token)
    return coingeckoApi.fetchCandleStickData({ id, interval })
  }
}

export const coingecko = new CoingeckoApiProxy()
