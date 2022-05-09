import { NEXT_PUBLIC_GRAPHQL_ENDPOINT } from './env.conf'

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ""`,
}

export const RQ_HASURA_PARAMS = HEADERS
export const RQ_HASURA_ENDPOINT = NEXT_PUBLIC_GRAPHQL_ENDPOINT
