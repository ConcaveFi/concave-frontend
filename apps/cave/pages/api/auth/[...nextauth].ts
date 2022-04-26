import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCsrfToken } from 'next-auth/react'
import { SiweMessage } from 'siwe'
import {
  NEXTAUTH_URL,
  NEXTAUTH_SECRET,
  AUTH_PRIVATE_KEY,
  AUTH_EXP_DATE,
  BASEURL,
} from '../../../lib/env.conf'
import { hasuaFindUser, hasuraInsertUser } from '../../../lib/hasura.axios'

export default async function auth(req: NextApiRequest, res: NextApiResponse<any>) {
  const providers = [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
        ens: {
          label: 'ENS Infos',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        try {
          // console.log("creds", credentials);

          const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'))

          const nextAuthUrl = new URL(NEXTAUTH_URL)
          if (siwe.domain !== nextAuthUrl.host) {
            return null
          }

          if (siwe.nonce !== (await getCsrfToken({ req }))) {
            return null
          }

          await siwe.validate(credentials?.signature || '')

          return {
            id: siwe.address,
            ens: credentials?.ens,
          }
        } catch (e) {
          return null
        }
      },
    }),
  ]

  const isDefaultSigninPage = req.method === 'GET' && req.query.nextauth.includes('signin')

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop()
  }

  return await NextAuth(req, res, {
    pages: {
      signIn: '/',
      signOut: '/',
      error: '/wagmi', // Error code passed in query string as ?error=
      // verifyRequest: "/auth/verify-request", // (used for check email message)
      // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    providers,
    session: {
      strategy: 'jwt',
    },
    secret: NEXTAUTH_SECRET,
    // adapter: HasuraAdapter(),
    jwt: {
      secret: NEXTAUTH_SECRET,
      // ! get token from callback
      encode: async ({ token }) => {
        // console.log("token jwt", token);

        const jwtClaims = {
          id: token?.id,
          iss: BASEURL,
          sub: token?.sub,
          ens: token?.ens,
          iat: Date.now() / 1000,
          role: token?.role,
          // ? do not do this here but in the sign! to be able to use "1m", "1h", "1d"
          // exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['admin', 'user'],
            'x-hasura-default-role': token?.role,
            'x-hasura-role': token?.role,
            'x-hasura-user-id': token?.id,
          },
        }
        const encodedToken = jwt.sign(jwtClaims, AUTH_PRIVATE_KEY, {
          expiresIn: AUTH_EXP_DATE,
          algorithm: 'HS512',
        })
        return encodedToken
      },
      decode: async ({ token }) => {
        const decodedToken = token && AUTH_PRIVATE_KEY && jwt.verify(token, AUTH_PRIVATE_KEY)
        return decodedToken as JWT
      },
    },

    callbacks: {
      // ! decide what to pass to then create the useSession
      async jwt({ token, profile, account, user }) {
        // console.log("jwt callback", { token, profile, account, user });

        if (user) {
          token.sub
          token.ens = JSON.parse(user.ens as string)

          // ! get User ID from Hasura and add it to token.id
          const isKnownUser = await hasuaFindUser(token.sub as string)
          if (isKnownUser !== null) {
            token.id = isKnownUser.id
            token.role = isKnownUser.role
          } else {
            const addUser = await hasuraInsertUser(token.sub as string)
            token.id = addUser.id
            token.role = addUser.role
          }
        }
        return token
      },

      // ! adjust the session to return for useSession
      async session({ session, token }) {
        // console.log("session callback", { session, token });

        session.user = {
          name: token.id,
          address: token.sub,
          ens: token.ens,
        } as any

        const encodedToken = jwt.sign(token, AUTH_PRIVATE_KEY, {
          algorithm: 'HS512',
        })
        session.id = token.id
        session.token = encodedToken
        // console.log("the session", session);
        return session
      },
    },
    debug: true,
  })
}
