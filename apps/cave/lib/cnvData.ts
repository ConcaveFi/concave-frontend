import { useEffect, useState } from 'react'

//   methode for pages/api endpoints
//   const { data, loading } = useFetchApi('/api/cnv')
//   console.log('cnv', data, loading)

export const useFetchApi = (url: string) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then((j) => j.json())
      .then((data) => {
        if (url === '/api/cnv')
          setData({
            cnv: data.data.last,
            ticker: data.data.ticker,
          }),
            setLoading(false)
        if (data.data && url !== '/api/cnv') setData(data.data), setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        throw e
      })
  }, [url])

  return { data, loading }
}
