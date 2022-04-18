import { fetchPortfolio } from 'lib/debank'
import { NextApiRequest, NextApiResponse } from 'next'

const TREASURY_ADDRESS = '0x226e7AF139a0F34c6771DeB252F9988876ac1Ced'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const treasury = await fetchPortfolio(TREASURY_ADDRESS)
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  res.status(200).json(JSON.stringify(treasury, null, 2))
}

export default handler
