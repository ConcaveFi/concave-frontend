import { CandleStickIntervalTypes } from 'components/CandleStickCard/useCandleStickChart'
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

const tokenPrice = async ({ ids, currency }: { ids: string; currency: string }) => {
  const url = new URL('/api/v3/simple/price', baseUrl)
  url.search = new URLSearchParams({
    ids,
    vs_currencies: currency,
  }).toString()

  const response = await fetch(url.toString())
  const data = (await response.json()) as Record<string, Record<string, number>>
  return {
    token: ids,
    currency,
    value: data[ids][currency],
  }
}

export const fetchCandleStickData = async ({
  id,
  days,
}: {
  id: string
  days: '1' | '7' | '14' | '30' | '90' | '180' | '365' | 'max'
}): Promise<CandlestickData[]> => {
  //concave
  const urlInput = new URL(`/api/v3/coins/${id}/ohlc`, baseUrl)
  urlInput.search = new URLSearchParams({ vs_currency: 'usd', days }).toString()
  const inputResponse = await fetch(urlInput.toString())
  const result = await inputResponse.json()
  const clean = result.map(mapOHLCData)
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
export const coingeckoApi = { fetchCoins, tokenPrice, fetchCandleStickData }
