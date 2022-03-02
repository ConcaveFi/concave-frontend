import { CandlestickData } from 'lightweight-charts'
import { useEffect, useState } from 'react'

export const useCandleStickChart = ({
  selectedInputToken,
  selectedOutputToken,
}: {
  selectedInputToken: string
  selectedOutputToken: string
}) => {
  const [data, setData] = useState<CandlestickData[]>([])
  const [interval, setSelectInerval] = useState(300)
  const [loading, setLoading] = useState(true)
  const size = 200
  useEffect(() => {
    setLoading(true)
    randomDate({
      interval,
      size: size,
      start: new Date().getTime() / 1000,
    }).then((data) => {
      setData(data)
      setLoading(false)
    })
  }, [interval, selectedInputToken, selectedOutputToken])
  return { setSelectInerval, loading, data }
}

export const randomDate = (
  opts = {
    interval: 3000,
    start: new Date().getTime() / 1000,
    size: 100,
  },
): Promise<CandlestickData[]> => {
  const data = []
  let lastvalue = {
    time: opts.start,
    open: 7307.38,
    high: 7313.76,
    low: 7293.05,
    close: 7296.62 + 5,
  }
  while (opts.size-- > 0) {
    data.push(lastvalue)
    lastvalue = {
      time: lastvalue.time + opts.interval,
      open: lastvalue.close,
      high: lastvalue.close + randomIntFromInterval(-8, 8),
      low: lastvalue.close - randomIntFromInterval(-8, 8),
      close: lastvalue.close + randomIntFromInterval(-6, 8),
    }
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, randomIntFromInterval(17, 3000))
  })
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
