import React, { useEffect, useRef } from 'react'
import { createChart, IChartApi } from 'lightweight-charts'
import { priceData } from './priceData'
import { Box } from '@chakra-ui/react'

const CandleStickChart = (props: { selectInterval: number }) => {
  const chartContainerRef = useRef<HTMLDivElement>()
  const chart = useRef<IChartApi>()

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 276,
      layout: {
        backgroundColor: 'transparent',
        textColor: '#565A69',
        fontFamily: 'Inter var',
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
        borderVisible: false,
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
          visible: false,
          labelVisible: false,
        },
        vertLine: {
          visible: true,
          style: 0,
          width: 2,
          color: '#505050',
          labelVisible: false,
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
    })

    candleSeries.setData(priceData)
    chart.current?.subscribeCrosshairMove((e) => {
      console.log(e)
    })
  }, [])
  console.log(chart)
  return (
    <Box mt={5}>
      <div ref={chartContainerRef} className="chart-container" />
    </Box>
  )
}
export default CandleStickChart
