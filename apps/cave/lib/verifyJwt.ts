import jwt from 'jsonwebtoken'
import { AUTH_PRIVATE_KEY } from './env.conf'

/** Return a boolean for the verification of the JWT
 *  with the JWT private key using jsonwebtoken lib.
 */
export const verifyJwt = async (token: string) => {
  try {
    jwt.verify(token, AUTH_PRIVATE_KEY)
    return true
  } catch (error) {
    return false
  }
}

/** Build UUID types String
 *  {8keys}-{4keys}-{4keys}-{12 keys}
 */
export function uuidv4() {
  let result: string, i: string, j: number
  result = ''
  for (j = 0; j < 32; j++) {
    if (j == 8 || j == 12 || j == 16 || j == 20) result = result + '-'
    i = Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase()
    result = result + i
  }
  return result
}
