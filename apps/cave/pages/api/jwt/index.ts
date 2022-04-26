import { getToken } from 'next-auth/jwt'
import type { NextApiRequest, NextApiResponse } from 'next'
import { JWTString } from 'next-auth/core/lib/cookie'
import jwtDecode from 'jwt-decode'
import { NEXTAUTH_SECRET } from '../../../lib/env.conf'
import { verifyJwt } from '../../../lib/verifyJwt'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = NEXTAUTH_SECRET

  // ! get our custom JWT
  const tokenRaw = await getToken({ req, secret, raw: true })

  // ! check if there is an auth token
  if (!tokenRaw) {
    return res.status(401).json({
      success: false,
      message: 'Please connect your wallet to get access.',
    })
  }

  // ! verify the signature of the JWT
  const verify = verifyJwt(tokenRaw)
  if ((await verify) === false) {
    return res.status(401).json({
      success: false,
      message: 'Please connect your wallet to get access.',
    })
  }

  // ! decode our JWT
  const checkJwt = (token: JWTString) => {
    try {
      const jwtDecoded: any = jwtDecode(token)

      // ? check exp and validate
      if (Date.now() >= jwtDecoded.exp * 1000) {
        return res.status(401).json({
          success: false,
          message: 'Access Denied.',
        })
      }

      // ? check user roles
      const role = jwtDecoded.role
      const hasuraRole = jwtDecoded['https://hasura.io/jwt/claims']['x-hasura-role']

      if (role === hasuraRole && role === 'admin') {
        console.log('roles jwt', role)
        return role
      }

      if (role === hasuraRole && role === 'user') {
        console.log('roles jwt', role)
        return role
      } else {
        return res.status(401).json({
          success: false,
          message: 'Access Denied.',
        })
      }
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: `Ser! ${e}`,
      })
    }
  }

  const whatUserRole = await checkJwt(tokenRaw)

  console.log('from api/jwt', { jwt: true, role: whatUserRole })
  res.json({ jwt: true, role: whatUserRole })
}
export default handler
