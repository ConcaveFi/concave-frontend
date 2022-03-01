import type { IronSessionOptions } from 'iron-session'
import { SiweMessage } from 'siwe'

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

// typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    siwe: SiweMessage
  }
}
