import { ChartInterval, tokenService } from 'lib/token.service'
import { CandlestickData } from 'lightweight-charts'
import { useMemo } from 'react'
import { useQuery } from 'react-query'

const ID = 'CANDLESTICK_TOKEN'

const joinData = ({
  inputData = [],
  outputData = [],
}: {
  inputData: CandlestickData[]
  outputData: CandlestickData[]
}) => {
  return inputData
    .map((input, index) => {
      const output = outputData.find((o) => o.time === input.time)
      if (!output) return
      return {
        time: input.time,
        close: input.close / output.close,
        high: input.high / output.high,
        low: input.low / output.low,
        open: input.open / output.open,
      }
    })
    .filter(Boolean)
}

export const useCandleStickChart = (
  inputToken: string,
  outputToken: string,
  interval: ChartInterval,
) => {
  const fromQuery = useQuery([ID, inputToken, interval], () =>
    tokenService.fetchCandleStickData({ token: inputToken, interval }),
  )

  const toQuery = useQuery([ID, outputToken, interval], () =>
    tokenService.fetchCandleStickData({ token: outputToken, interval }),
  )

  return useMemo(
    () => ({
      isLoading: fromQuery.isLoading || toQuery.isLoading,
      isRefetching: fromQuery.isRefetching || toQuery.isRefetching,
      data: joinData({ inputData: fromQuery.data, outputData: toQuery.data }),
    }),
    [
      fromQuery.isLoading,
      fromQuery.isRefetching,
      fromQuery.data,
      toQuery.isLoading,
      toQuery.isRefetching,
      toQuery.data,
    ],
  )
}
