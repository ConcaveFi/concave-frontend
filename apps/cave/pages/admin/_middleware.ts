import jwtDecode from 'jwt-decode'
import { NextRequest, NextResponse } from 'next/server'
import { BASEURL, NODE_ENV } from '../../lib/env.conf'
// import { verifyJwt } from '../../lib/verifyJwt'

/** Verify the req.cookies["next-auth.session-token"]
 *  if valide and not expired, then decoded to extract the user role
 *  if roles are admin and validate it retrun next() if not it will redirect to home.
 */
export default async function adminMiddleware(req: NextRequest, res: NextResponse) {
  const cookieToken =
    NODE_ENV !== 'production'
      ? req.cookies['next-auth.session-token']
      : req.cookies['__Secure-next-auth.session-token']

  // ! check if there is an auth token
  if (!cookieToken) {
    return NextResponse.redirect(`${BASEURL}/?msg=connectyourwallet`)
  }

  // ! verify & decode the jwt
  // ? DynamicCodeEvaluationWarning: Dynamic Code Evaluation
  // ? cannot build with pck jwt or jsonwebtoken!!!!
  // ? so cannot verify the signature of the JWT
  // const verify = verifyJwt(cookieToken);
  // if ((await verify) === false) {
  //   return NextResponse.redirect(`${baseurl}/?msg=accessdenied`);
  // }

  // ? decode jwt
  const jwtDecoded: any = jwtDecode(cookieToken)

  // ? check exp
  if (Date.now() >= jwtDecoded.exp * 1000) {
    return NextResponse.redirect(`${BASEURL}/?msg=accessdenied`)
  }

  // ? check user roles
  const role = jwtDecoded.role
  const hasuraRole = jwtDecoded['https://hasura.io/jwt/claims']['x-hasura-role']

  if (role === hasuraRole && role === 'admin') {
    return NextResponse.next()
  }

  return NextResponse.redirect(`${BASEURL}/?msg=accessdenied`)
}
