import { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers'

type Data = {
  name: String
  ticker: String
  last: number
  blockchain: String
  lowestAsk: String
  highestBid: String
  percentChange: String
  baseVolume: String
  quoteVolume: String
  isFrozen: String
  high24hr: String
  low24hr: String
  circulatingSupply: number
  removedTokens: number
  totalSupply: number
  marketCap: number
}

type MainType = {
  code: number
  msg: String
  data: Data
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // await fetch('http://localhost:3001/api/hello')

  const fetchJson = (url: RequestInfo, options?: RequestInit) =>
    fetch(url, options).then((d) => d.json())
  const fetchCnvData = () =>
    fetchJson(`https://cnv-data-api.vercel.app/api/v1/cnv-spot`) as Promise<MainType>

  fetchCnvData()
    .then((cnv) => {
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
      res.status(200).json(JSON.stringify(cnv, null, 2))
    })
    .catch((error) => {
      res.status(500).send(error)
    })
}

export default handler
