import { findUser, insertUser } from 'lib/hasura/admin'
import { destroySession, getSessionCookie, setSessionCookie } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorTypes, SiweMessage } from 'siwe'

export const InvalidNonceError = new Error('Invalid nonce')

const verify = async ({ message, signature, nonce }) => {
  const siweMessage = new SiweMessage(message)
  const validatedSiwe = await siweMessage.validate(signature)
  if (validatedSiwe.nonce !== nonce) throw InvalidNonceError
  return validatedSiwe
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== 'POST')
    return res.setHeader('Allow', ['POST']).status(405).end(`Method ${method} Not Allowed`)

  try {
    const { message, signature } = req.body
    const session = getSessionCookie(req)

    const siwe = await verify({ message, signature, nonce: session.nonce })
    const address = siwe.address

    const user = (await findUser(address)) || (await insertUser(address)) || { address }
    setSessionCookie(req, res, { siwe, user })

    res.json({ ok: true, user })
  } catch (e) {
    destroySession(res)

    if (e.message.startsWith(ErrorTypes.EXPIRED_MESSAGE))
      return res.status(440).json({ message: e.message, ok: false })
    if (e.message.startsWith(ErrorTypes.INVALID_SIGNATURE) || e === InvalidNonceError)
      return res.status(422).json({ message: e.message, ok: false })

    res.status(500).json({ message: e.message, ok: false })
  }
}

export default handler
