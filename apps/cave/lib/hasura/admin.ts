import { gql, GraphQLClient } from 'graphql-request'

// const HasuraUrl =
//   process.env.NODE_ENV !== 'production'
//     ? 'http://localhost:8080/v1/graphql'
//     : (process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string)

const HasuraUrl = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string

const admin = new GraphQLClient(HasuraUrl, {
  headers: { 'X-Hasura-Admin-Secret': process.env['GRAPHQL_ADMIN_SECRET'] },
})

export const findUser = async (address: string) => {
  const { user } = await admin.request(
    gql`
      query UserByAddress($address: String!) {
        user(where: { address: { _eq: $address } }) {
          id
          address
          chainId
        }
      }
    `,
    { address },
  )

  return user[0]
}

// We must get the user address and build for him the tokens then send the update to Hasura
export const insertUser = async (address: string) => {
  const { insert_user_one: newUser } = await admin.request(
    gql`
      mutation InsertUser($address: String!) {
        insert_user_one(object: { address: $address }) {
          id
          address
        }
      }
    `,
    { address },
  )

  return newUser
}
