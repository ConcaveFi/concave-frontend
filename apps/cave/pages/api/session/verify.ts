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
    const validatedSiwe = await siweMessage.validate(signature)

    if (validatedSiwe.nonce !== req.session.nonce) {
      res.status(422).json({ message: 'Invalid nonce.' })
      return
    }

    req.session.siwe = validatedSiwe
    await req.session.save()

    res.json({ ok: true })
  } catch (_error) {
    res.json({ ok: false })
  }
}

export default withIronSessionApiRoute(handler, sessionOptions)
