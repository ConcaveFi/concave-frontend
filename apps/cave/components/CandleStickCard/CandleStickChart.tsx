import React, { useEffect, useRef } from 'react'
import { CandlestickData, createChart, IChartApi, WhitespaceData } from 'lightweight-charts'
import { Box } from '@concave/ui'

const CandleStickChart = (props: { data: (CandlestickData | WhitespaceData)[] }) => {
  const chartContainerRef = useRef<HTMLDivElement>()
  const chart = useRef<IChartApi>()

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 276,
      layout: {
        backgroundColor: 'transparent',
        textColor: '#565A69',
        fontFamily: 'ProductSans',
      },
      leftPriceScale: {
        visible: true,
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
        drawTicks: false,
        borderVisible: false,
        visible: false,
      },

      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      grid: {
        horzLines: {
          visible: false,
        },
        vertLines: {
          visible: false,
        },
      },
      crosshair: {
        horzLine: {
          visible: true,
          labelVisible: true,
          style: 3,
        },
        vertLine: {
          visible: true,
          labelVisible: false,
          style: 3,
        },
      },
    })

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
      priceLineColor: 'white',
      priceFormat: {
        minMove: 0.000001,
      },
    })

    candleSeries.setData(props.data)
    chart.current.timeScale().fitContent()
  }, [props.data])
  return (
    <Box mt={5}>
      <Box ref={chartContainerRef} className="chart-container" />
    </Box>
  )
}
export default CandleStickChart
