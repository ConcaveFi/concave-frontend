import { Box, useToken } from '@concave/ui'
import {
  CandlestickData,
  CandlestickSeriesOptions,
  ChartOptions,
  createChart,
  DeepPartial,
  SeriesOptionsCommon,
  WhitespaceData,
} from 'lightweight-charts'
import { useEffect, useRef } from 'react'

const chartOptions = ({ color, font }): DeepPartial<ChartOptions> => ({
  width: 0, // If 0, then the size will be calculated based its container's size
  height: 276,
  layout: {
    background: { color: 'transparent' },
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
    ticksVisible: false,
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

const candlestickSeries = ({
  color,
}): DeepPartial<CandlestickSeriesOptions & SeriesOptionsCommon> => ({
  upColor: '#4bffb5',
  downColor: '#ff4976',
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

  const color = useToken('colors', 'text.low')
  const font = useToken('fonts', 'heading')

  useEffect(() => {
    if (data.length === 0) return
    
    const chart = createChart(chartContainerRef.current, chartOptions({ color, font }))
    
    chart.addCandlestickSeries(candlestickSeries({ color })).setData(data)
    chart.timeScale().fitContent()
    
    return () => {
      chart.remove()
    }
  }, [data, color, font])

  return <Box ref={chartContainerRef} />
}

export default CandleStickChart
