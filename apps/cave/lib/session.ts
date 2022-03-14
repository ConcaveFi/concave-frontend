import type { IronSessionOptions } from 'iron-session'
import { SiweMessage } from 'siwe'
import aes256 from 'aes256'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD || ('H81HEAUISBNDKJAND1UNQWE8901HJDQNj' as string),
  cookieName: 'session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: true,
  },
}

type Session = {
  siwe: SiweMessage
  nonce: string
  hasura: { id: string; role: string }
}

export const decryptSession = (session): Session =>
  JSON.parse(aes256.decrypt(sessionOptions.password, session))

export const setSessionCookie = (req: NextApiRequest, res: NextApiResponse, cookie) => {
  const currentSession = getSessionCookie(req)
  const encryptedCookie = aes256.encrypt(
    sessionOptions.password,
    JSON.stringify({ ...cookie, ...currentSession }),
  )

  res.setHeader(
    'Set-Cookie',
    serialize(sessionOptions.cookieName, encryptedCookie, sessionOptions.cookieOptions),
  )
}

export const getSessionCookie = (req: NextApiRequest) => {
  if (req.cookies.session) return decryptSession(req.cookies.session)
}
