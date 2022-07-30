import { Box, useToken } from '@concave/ui'
import {
  CandlestickData,
  CandlestickSeriesOptions,
  ChartOptions,
  createChart,
  DeepPartial,
  IChartApi,
  SeriesOptionsCommon,
  WhitespaceData,
} from 'lightweight-charts'
import { useEffect, useRef } from 'react'

const chartOptions = ({ color, font }): DeepPartial<ChartOptions> => ({
  width: 0, // If 0, then the size will be calculated based its container's size
  height: 276,
  layout: {
    backgroundColor: 'transparent',
    textColor: color,
    fontFamily: font,
  },
  leftPriceScale: {
    autoScale: true,
    scaleMargins: {
      top: 0.1,
      bottom: 0.1,
    },
    borderVisible: false,
    drawTicks: false,
    visible: true,
  },
  rightPriceScale: { visible: false },
  timeScale: {
    barSpacing: 10,
    fixLeftEdge: true,
    lockVisibleTimeRangeOnResize: true,
    rightBarStaysOnScroll: true,
    visible: true,
    borderVisible: false,
    timeVisible: true,
    secondsVisible: false,
  },
  grid: {
    horzLines: { visible: false },
    vertLines: { visible: false },
  },
  crosshair: {
    horzLine: {
      color,
      labelBackgroundColor: color,
      visible: true,
      labelVisible: true,
      style: 3,
    },
    vertLine: {
      color,
      labelBackgroundColor: color,
      visible: true,
      labelVisible: true,
      style: 3,
    },
  },
})

export const candlestickColors = {
  up: '#4bffb5',
  down: '#ff4976',
}

const candlestickSeries = ({
  color,
}): DeepPartial<CandlestickSeriesOptions & SeriesOptionsCommon> => ({
  upColor: candlestickColors.up,
  downColor: candlestickColors.down,
  borderVisible: false,
  wickDownColor: color,
  wickUpColor: color,
  priceLineColor: color,
  // priceFormat: {
  //   minMove: 0.01,
  // },
})

export const CandleStickChart = ({ data }: { data: (CandlestickData | WhitespaceData)[] }) => {
  const chartContainerRef = useRef<HTMLDivElement>()
  const chart = useRef<IChartApi>()

  const color = useToken('colors', 'text.low')
  const font = useToken('fonts', 'heading')

  useEffect(() => {
    chart.current?.remove()
    if (data.length === 0) return
    chart.current = createChart(chartContainerRef.current, chartOptions({ color, font }))

    chart.current.addCandlestickSeries(candlestickSeries({ color })).setData(data)

    chart.current.timeScale().fitContent()
  }, [data, color, font])

  return <Box ref={chartContainerRef} />
}
export default CandleStickChart
