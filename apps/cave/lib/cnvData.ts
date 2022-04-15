import { useEffect, useState } from 'react'

//   methode for pages/api endpoints
//   const cnv = useFetchApi('/api/cnv')
//   console.log('cnv', cnv)

export const useFetchApi = (url: string) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((j) => j.json())
      .then((data) => {
        if (url === '/api/cnv')
          setData({
            cnv: data.data.last,
            ticker: data.data.ticker,
          })
        if (data.data && url !== '/api/cnv') setData(data.data)
      })
      .catch((e) => {
        throw e
      })
  }, [url])

  return data
}
