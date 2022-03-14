import { setSessionCookie } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']).status(405).end(`Method ${method} Not Allowed`)
    return
  }
  setSessionCookie(req, res, { siwe: null, nonce: null })
  res.send({ ok: true })
}

export default handler
