import { withIronSessionApiRoute } from 'iron-session/next/dist'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { generateNonce } from 'siwe'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']).status(405).end(`Method ${method} Not Allowed`)
    return
  }

  req.session.nonce = generateNonce()
  await req.session.save()

  res.send({ nonce: generateNonce() })
}

export default withIronSessionApiRoute(handler, sessionOptions)
