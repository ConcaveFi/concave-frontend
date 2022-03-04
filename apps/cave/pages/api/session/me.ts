import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']).status(405).end(`Method ${method} Not Allowed`)
    return
  }

  const address = req.session.siwe?.address
  if (!address) {
    res.status(401).json({ message: `You're not connected` })
    return
  }

  // const ens = await getEnsData(address)

  res.send({ address })
}

export default withIronSessionApiRoute(handler, sessionOptions)
