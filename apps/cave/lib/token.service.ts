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

class TokenService {
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
