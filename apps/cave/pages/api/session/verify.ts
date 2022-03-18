import { findUser, insertUser } from 'lib/hasura/admin'
import { destroySession, getSessionCookie, setSessionCookie } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorTypes, SiweMessage } from 'siwe'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== 'POST')
    return res.setHeader('Allow', ['POST']).status(405).end(`Method ${method} Not Allowed`)

  try {
    const { message, signature } = req.body

    const siweMessage = new SiweMessage(message)
    const validatedSiwe = await siweMessage.validate(signature)

    const session = getSessionCookie(req)

    if (validatedSiwe.nonce !== session.nonce)
      return res.status(422).json({ message: 'Invalid nonce', ok: false })

    const siwe = validatedSiwe

    const address = siwe.address
    const user = (await findUser(address)) || (await insertUser(address))

    setSessionCookie(req, res, { siwe, user })

    res.json({ ok: true, user })
  } catch (e) {
    destroySession(res)

    if (e === ErrorTypes.EXPIRED_MESSAGE)
      return res.status(440).json({ message: e.message, ok: false })
    if (e === ErrorTypes.INVALID_SIGNATURE)
      return res.status(422).json({ message: e.message, ok: false })

    console.log(e.message)
    res.status(500).json({ message: e.message, ok: false })
  }
}

export default handler
