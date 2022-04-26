import axios, { HeadersDefaults } from 'axios'
import { GRAPHQL_ADMIN_SECRET, NEXT_PUBLIC_GRAPHQL_ENDPOINT } from './env.conf'

interface CommonHeaderProperties extends HeadersDefaults {
  'Content-Type': string
  'X-Hasura-Admin-Secret': string
}

/**
 * Use Axios to do GraphQl actions on the database
 * with admin privileges.
 */
export async function axiosHasura(operationName: string, query: any, variables: any) {
  const URL = NEXT_PUBLIC_GRAPHQL_ENDPOINT

  const headers = {
    'Content-Type': 'application/json',
    'X-Hasura-Admin-Secret': GRAPHQL_ADMIN_SECRET,
  } as CommonHeaderProperties

  const graphqlQuery = {
    operationName,
    query,
    variables,
  }

  const response = await axios({
    url: URL,
    method: 'post',
    headers: headers,
    data: graphqlQuery,
  } as any)
  return response
}

/** Find user from his wallet address
 *  then return his ID and role or null if he doesn't exist.
 */
export const hasuaFindUser = async (address: string) => {
  const q = `query FindUserByAddress($address: String!) {
  users(where: { address: { _eq: $address } }) {
    id
    role
  }
}`
  const v = { address }

  const request = await axiosHasura('FindUserByAddress', q, v)
  if (request.data.errors) {
    return console.log('error', request.data.errors[0].message)
  } else {
    const user = await request.data.data.users[0]
    if (user !== undefined) {
      return user
    }
    return null
  }
}

/** Add user with his wallet address
 *  then return his ID and role.
 */
export const hasuraInsertUser = async (address: string) => {
  const q = `mutation InsertUserOne($address: String!) {
  insert_users_one(object: { address: $address }) {
    id
    role
  }
}`
  const v = { address }

  const request = await axiosHasura('InsertUserOne', q, v)
  if (request.data.errors) {
    return console.log('error', request.data.errors[0].message)
  } else {
    const user = await request.data.data.insert_users_one
    return user
  }
}
