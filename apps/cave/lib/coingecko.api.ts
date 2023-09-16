import { CandlestickData, UTCTimestamp } from 'lightweight-charts'

const baseUrl = 'https://api.coingecko.com/'
export type CoinType = {
  id: string
  symbol: string
  name: string
}

const fetchCoins = async () => {
  const url = new URL('/api/v3/coins/list', baseUrl)
  const response = await fetch(url.toString())
  return response.json() as Promise<CoinType[]>
}

export const fetchCandleStickData = async ({
  id,
  days,
}: {
  id: string
  days: '1' | '7' | '14' | '30' | '90' | '180' | '365' | 'max'
}): Promise<CandlestickData[]> => {
  const urlInput = new URL(`/api/v3/coins/${id}/ohlc`, baseUrl)
  urlInput.search = new URLSearchParams({ vs_currency: 'usd', days }).toString()
  const inputResponse = await fetch(urlInput.toString())
  const result = await inputResponse.json()
  const clean = result?.map?.(mapOHLCData)
  return clean
}

const mapOHLCData = (value: number[]): CandlestickData => {
  const [time, open, high, low, close] = value
  return {
    close: +close,
    high: +high,
    low: +low,
    open: +open,
    time: (time / 1000) as UTCTimestamp,
  }
}
export const coingeckoApi = { fetchCoins, fetchCandleStickData }
