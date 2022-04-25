import { useState } from 'react'

export const useFetchApi = (url: string) => {
  const [data, setData] = useState(null)
  fetch(url)
    .then((j) => j.json())
    .then((data) => {
      if (url === '/api/cnv')
        setData({
          cnv: data.data.last,
          ticker: data.data.ticker,
        })
      if (data.data && url !== '/api/cnv') setData(data.data)
      return { data }

    })
    .catch((e) => {
      throw e
    })
}
