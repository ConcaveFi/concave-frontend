import { SiweMessage } from 'siwe'
import aes256 from 'aes256'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { CookieSerializeOptions } from 'next/dist/server/web/types'

export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: true,
  } as CookieSerializeOptions,
}

type Session = {
  siwe: SiweMessage
  nonce: string
  hasura: { id: string; role: string }
}

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

export const decryptSession = (session): Session =>
  JSON.parse(aes256.decrypt(sessionOptions.password, session))

export const getSessionCookie = (req: NextApiRequest) => {
  if (req.cookies.session) return decryptSession(req.cookies.session)
}
