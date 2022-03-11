import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorTypes, SiweMessage } from 'siwe'

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

    if (validatedSiwe.nonce !== req.session.nonce)
      return res.status(422).json({ message: 'Invalid nonce' })

    req.session.siwe = validatedSiwe
    await req.session.save()

    res.json({ ok: true })
  } catch (e) {
    req.session.siwe = null
    req.session.nonce = null
    req.session.save()

    if (e === ErrorTypes.EXPIRED_MESSAGE) return res.status(440).json({ message: e.message })
    if (e === ErrorTypes.INVALID_SIGNATURE) return res.status(422).json({ message: e.message })

    res.status(500).json({ message: e.message, ok: false })
  }
}

export default withIronSessionApiRoute(handler, sessionOptions)
