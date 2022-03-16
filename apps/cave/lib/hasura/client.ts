import { GraphQLClient } from 'graphql-request'

const HasuraUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8080/v1/graphql'
    : (process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string)

export const hasura = new GraphQLClient(HasuraUrl, {
  headers: { authorization: '' /* TODO: add the auth token from cookie */ },
})
