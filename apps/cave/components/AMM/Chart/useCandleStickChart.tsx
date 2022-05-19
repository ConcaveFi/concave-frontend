import { tokenService } from 'lib/token.service'
import { CandlestickData } from 'lightweight-charts'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

const avaliableIntervals: CandleStickIntervalTypes[] = ['5m', '15m', '1H', '4H', '1D']
const interval: CandleStickIntervalTypes = '5m'
const defautValue = {
  loading: true,
  interval,
  avaliableIntervals,
  data: [],
}

export type CandleStickIntervalTypes = '5m' | '15m' | '1H' | '4H' | '1D'

export type CandleStickChartProps = {
  loading: boolean
  interval: CandleStickIntervalTypes
  avaliableIntervals: CandleStickIntervalTypes[]
  data: any[]
}

const ID = 'CANDLESTICK_TOKEN'

export const useCandleStickChart = (inputToken: string, outputToken: string) => {
  const [candleStickData, setCandleStickData] = useState<CandleStickChartProps>({ ...defautValue })

  const set = (value: Partial<CandleStickChartProps>) => {
    setCandleStickData((currentValue) => ({ ...currentValue, ...value }))
  }

  const { data: inputData } = useQuery([ID, inputToken, candleStickData.interval], () =>
    tokenService.fetchCandleStickData({
      token: inputToken,
      interval: candleStickData.interval,
    }),
  )

  const { data: outputData } = useQuery([ID, outputToken, candleStickData.interval], () =>
    tokenService.fetchCandleStickData({
      token: outputToken,
      interval: candleStickData.interval,
    }),
  )

  const promiseData = useMemo(async () => {
    const result = joinData({
      inputData: inputData,
      outputData: outputData,
    })
    return result
  }, [inputData, outputData])

  useEffect(() => {
    set({ loading: true })
    try {
      if (!inputData || !outputData) throw 'chart: not enough data'
      promiseData.then((data) => {
        set({ loading: false, data: data })
      })
    } catch {
      set({ loading: false, data: [] })
    }
  }, [inputData, outputData, promiseData])

  return { ...candleStickData, set }
}

export const joinData = ({
  inputData = [],
  outputData = [],
}: {
  inputData: CandlestickData[]
  outputData: CandlestickData[]
}) => {
  return inputData.map((input, index) => {
    const output = outputData.find((o) => o.time === input.time)
    if (!output) {
      return { time: input.time }
    }
    return {
      time: input.time,
      close: input.close / output.close,
      high: input.high / output.high,
      low: input.low / output.low,
      open: input.open / output.open,
    }
  })
}
