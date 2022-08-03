import {
  CNV,
  CNV_ADDRESS,
  Currency,
  DAI,
  DAI_ADDRESS,
  FRAX,
  FRAX_ADDRESS,
  USDC,
  USDC_ADDRESS,
  WETH9_ADDRESS,
} from '@concave/core'
import { chain } from 'wagmi'
import { coingeckoApi } from './coingecko.api'

export const chartIntervals = ['5m', '15m', '1H', '4H', '1D'] as const
export type ChartInterval = typeof chartIntervals[number]

const whitelist = [
  ...Object.values(FRAX_ADDRESS),
  ...Object.values(CNV_ADDRESS),
  ...Object.values(DAI_ADDRESS),
  ...Object.values(USDC_ADDRESS),
  ...Object.values(WETH9_ADDRESS),
]
const tokenToCoingeckId = (currency: Currency) => {
  if (currency.isNative) return `ethereum`
  if (currency.symbol === CNV[currency.chainId].symbol) return `concave`
  if (currency.symbol === FRAX[currency.chainId].symbol) return `frax`
  if (currency.symbol === USDC[currency.chainId].symbol) return `usd-coin`
  if (currency.symbol === DAI[currency.chainId].symbol) return `dai`
}

class TokenService {
  constructor(private networkName: string = chain.mainnet.name) {}
  async getTokenPrice(currency: Currency) {
    // Check if currency is inside whitelist
    if (!whitelist.includes(currency.wrapped.address)) {
      return undefined
    }
    const coingecko = tokenToCoingeckId(currency)
    return Promise.resolve(
      coingeckoApi.tokenPrice({
        currency: 'usd',
        ids: coingecko,
      }),
    )
  }

  async fetchCandleStickData({ token, interval }: { token: string; interval: ChartInterval }) {
    const coingecko = { cnv: 'concave', eth: 'weth' }[token?.toLowerCase()] || token?.toLowerCase()
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
export const tokenService = new TokenService(chain.rinkeby.name)
