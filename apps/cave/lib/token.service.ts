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
import { mainnet, goerli } from 'wagmi/chains'
import { coingeckoApi } from './coingecko.api'

export const chartIntervals = ['30m', '4H', '4D'] as const
export type ChartInterval = (typeof chartIntervals)[number]

const whitelist = [
  ...Object.values(FRAX_ADDRESS),
  ...Object.values(CNV_ADDRESS),
  ...Object.values(DAI_ADDRESS),
  ...Object.values(USDC_ADDRESS),
  ...Object.values(WETH9_ADDRESS),
]
const tokenToCoingeckId = (currency: Currency) => {
  if (currency.isNative) return `ethereum`
  const address = currency.wrapped.address
  if (address === CNV[currency.chainId].address) return `concave`
  if (address === FRAX[currency.chainId].address) return `frax`
  if (address === USDC[currency.chainId].address) return `usd-coin`
  if (address === DAI[currency.chainId].address) return `dai`
}

class TokenService {
  async getTokenPrice(currency: Currency) {
    const coingecko = tokenToCoingeckId(currency)
    if (!coingecko) {
      throw `token not in whitelist`
    }
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
  '30m': '1',
  '4H': '30',
  '4D': '365',
} as const
export const tokenService = new TokenService()
