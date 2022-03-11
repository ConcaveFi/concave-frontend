import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'
import { findUser, insertUser, updateUserRefreshToken } from '../../libs/admin_fetchUser'
import { signJwt, uuidv4 } from '../../libs/jwt'
import { getIronSession, sealData } from 'iron-session'
import { sessionOptions } from 'lib/session'

const OneHour = new Date(Date.now() + 1000 * 60 * 60 * 1).toISOString()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }

  const { message, signature } = req.body

  try {
    const validatedSiwe = await new SiweMessage(message).validate(signature)

    if (validatedSiwe.nonce !== req.session.nonce)
      return res.status(422).json({ message: 'Invalid nonce.' })

    req.session.siwe = validatedSiwe

    await req.session.save()

    const address = req.session.siwe.address

    const fingerprint = await sealData(req.session.siwe, {
      password: process.env.NEXT_PUBLIC_IRON_SALT,
    })

    const user = await findUser(address)
    if (!user) {
      const refreshToken = uuidv4()
      const newUser = await insertUser(address, refreshToken, OneHour)
      const jwt = signJwt(fingerprint, newUser)
      return res.json({ jwt, refreshToken, ok: true })
    }

    const refreshToken = uuidv4()
    await updateUserRefreshToken(user.id, refreshToken, OneHour)
    const jwt = signJwt(fingerprint, user)
    return res.json({ jwt, refreshToken, ok: true })
  } catch (_error) {
    res.json({ ok: false })
  }
}

export default withIronSessionApiRoute(handler, sessionOptions)
