import { setSessionCookie } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { generateNonce } from 'siwe'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']).status(405).end(`Method ${method} Not Allowed`)
    return
  }

  const nonce = generateNonce()

  setSessionCookie(req, res, { nonce })

  // await req.session.save()

  res.send({ nonce })
}

export default handler
