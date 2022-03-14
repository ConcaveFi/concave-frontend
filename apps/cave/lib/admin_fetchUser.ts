import axios, { HeadersDefaults } from 'axios'

interface CommonHeaderProperties extends HeadersDefaults {
  'Content-Type': string
  'X-Hasura-Admin-Secret': string
}

// Admin fetcher on Hasura graphql endpoint with Axios
export async function axiosHasura(operationName: string, query: any, variables: any) {
  const URL =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:8080/v1/graphql'
      : (process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string)

  const headers = {
    'Content-Type': 'application/json',
    'X-Hasura-Admin-Secret': process.env['NEXT_PUBLIC_GRAPHQL_ADMIN_SECRET'],
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
  } as unknown as any)
  return response
}

export const findUser = async (address: string) => {
  const q = `query UserByAddress($address: String!){
      user(where: {address: {_eq: $address}}) {
        id
        address
        chainId
      }
    }`
  const v = { address }

  const request = await axiosHasura('UserByAddress', q, v)
  // console.log("UserByAddress", request);
  if (request.data.errors) {
    return console.log('error', request.data.errors[0].message)
  } else {
    const user = await request.data.data.user[0]
    return user
  }
}

// We must get the user address and build for him the tokens then send the update to Hasura
export const insertUser = async (address: string) => {
  const q = `mutation InsertUser($address: String!) {
    insert_user_one(object: { address: $address }) {
      id
      address
    }
  }`
  const v = { address }

  const request = await axiosHasura('InsertUser', q, v)
  // console.log("InsertUser", request);
  if (request.data.errors) {
    return console.log('error', request.data.errors[0].message)
  } else {
    const user = await request.data.data.insert_user_one
    return user
  }
}
