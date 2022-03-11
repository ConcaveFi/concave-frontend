import * as jwt from 'jsonwebtoken'
import crypto from 'crypto'

const HASURA_GRAPHQL_JWT_SECRET = {
  type: process.env.HASURA_JWT_SECRET_TYPE || 'HS256',
  key:
    process.env.HASURA_JWT_SECRET_KEY ||
    'this-is-a-generic-HS256-secret-key-and-you-should-really-change-it',
}

export function sha256(value: string) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex')
}

interface hasuraJWTParams {
  allowedRoles: string[]
  defaultRole: string
  otherClaims?: Record<string, string>
  expiresIn?: string
}

export function generateHasuraJWT(params: hasuraJWTParams) {
  const payload = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': params.allowedRoles,
      'x-hasura-default-role': params.defaultRole,
      ...params.otherClaims,
    },
  }

  return jwt.sign(payload, HASURA_GRAPHQL_JWT_SECRET.key, {
    algorithm: HASURA_GRAPHQL_JWT_SECRET.type as 'HS256' | 'RS512',
    expiresIn: params.expiresIn || '1h',
  })
}

export function signJwt(fingerprint: string, user: any) {
  return generateHasuraJWT({
    allowedRoles: ['user'],
    defaultRole: 'user',
    expiresIn: '5m',
    otherClaims: {
      'X-Hasura-User-Id': String(user.id),
      'X-User-Fingerprint': sha256(fingerprint),
    },
  })
}

// export function getJwtToken() {
//   return sessionStorage.getItem("jwt");
// }

// export function setJwtToken(token: string) {
//   sessionStorage.setItem("jwt", token);
// }

// export function getRefreshToken() {
//   return sessionStorage.getItem("refreshToken");
// }

// export function setRefreshToken(token: string) {
//   sessionStorage.setItem("refreshToken", token);
// }
