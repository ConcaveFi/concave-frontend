import { CandleStickIntervalTypes } from 'components/CandleStickCard/useCandleStickChart'
import { CoinType, coingeckoApi } from './coingecko.api'

class CoingeckoApiProxy {
  private coins: Promise<CoinType[]>
  constructor() {}
  private topTokens = [
    'BTC',
    'ETH',
    'USDT',
    'BNB',
    'USDC',
    'XRP',
    'LUNA',
    'ADA',
    'SOL',
    'AVAX',
    'BUSD',
    'DOT',
    'DOGE',
    'UST',
    'SHIB',
    'WBTC',
    'MATIC',
    'DAI',
    'CRO',
    'ATOM',
    'LTC',
    'NEAR',
    'LINK',
    'TRX',
    'UNI',
    'FTT',
    'LEO',
    'BCH',
    'ALGO',
    'XLM',
    'MANA',
    'BTCB',
    'HBAR',
    'ETC',
    'EGLD',
    'ICP',
    'XMR',
    'WAVES',
    'SAND',
    'FTM',
    'FIL',
    'KLAY',
    'VET',
    'AXS',
    'THETA',
    'XTZ',
    'RUNE',
    'HNT',
    'GRT',
  ]
  async listCoins({ top } = { top: 0 }) {
    if (!this.coins) {
      this.coins = coingeckoApi.fetchCoins()
    }
    if (!top) {
      return this.coins
    }
    const validSymbols = this.topTokens.slice(0, top)
    return (await this.coins).filter((c) => {
      return validSymbols.includes(c.symbol.toUpperCase())
    })
  }

  async getTokenInfo(symbol: string) {
    const coins = await this.listCoins()
    const tokenInfo = coins.find((item) => {
      return item.symbol.toLowerCase() === symbol?.toLowerCase()
    })
    return tokenInfo
  }

  async getTokenPrice(symbol: string) {
    const { id } = await this.getTokenInfo(symbol)
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
    const { id } = await this.getTokenInfo(token)
    const days = daysOptions[interval]

    return coingeckoApi.fetchCandleStickData({ id, days })
  }
}
const daysOptions = {
  '5m': '1',
  '15m': '7',
  '1H': '14',
  '4H': '30',
  '1D': '365',
} as const
export const coingecko = new CoingeckoApiProxy()
