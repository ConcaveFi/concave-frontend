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

export interface User {
  id: string
  role: string
  address: string
  chainId: number
}

type Session = {
  siwe: SiweMessage
  nonce: string
  user: User
}

export const destroySession = (res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    serialize(sessionOptions.cookieName, '', sessionOptions.cookieOptions),
  )
}

export const setSessionCookie = (req: NextApiRequest, res: NextApiResponse, cookie) => {
  const currentSession = getSessionCookie(req)
  const encryptedCookie = aes256.encrypt(
    sessionOptions.password,
    JSON.stringify({ ...currentSession, ...cookie }),
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
