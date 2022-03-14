import { getSessionCookie } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']).status(405).end(`Method ${method} Not Allowed`)
    return
  }

  const address = getSessionCookie(req)?.siwe?.address
  if (!address) {
    res.status(401).json({ message: `You're not connected` })
    return
  }

  // const ens = await getEnsData(address)

  res.json({ address })
}

export default handler
