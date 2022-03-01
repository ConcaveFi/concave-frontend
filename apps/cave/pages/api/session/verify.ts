import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']).status(405).end(`Method ${method} Not Allowed`)
    return
  }
  try {
    const { message, signature } = req.body
    const siweMessage = new SiweMessage(message)
    const fields = await siweMessage.validate(signature)
    req.session.siwe = fields
    await req.session.save()
    res.json({ ok: true })
  } catch (_error) {
    res.json({ ok: false })
  }
}

export default withIronSessionApiRoute(handler, sessionOptions)
