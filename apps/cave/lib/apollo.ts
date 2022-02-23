import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { mergeDeep } from '@apollo/client/utilities'
import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'

const createApolloClient = () => {
  return new ApolloClient({
    // ssrMode: true,
    link: createHttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      credentials: 'same-origin',
      headers: {
        'content-Type': 'application/json',
        // ! TODO incule roles to secure the graphQl Schema
        // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_GRAPHQL_ADMIN_SECRET,
      },
    }),
    cache: new InMemoryCache(),
  })
}

let apolloClient: ApolloClient<NormalizedCacheObject>

export default function initiallizeApollo(initialState = null) {
  const _apolloClient = apolloClient || createApolloClient()

  // if initialState
  if (initialState) {
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = mergeDeep(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any[], sourceArray: any[]) => [
        ...sourceArray,
        ...destinationArray.filter((d: any) => sourceArray.every((s: any) => !isEqual(d, s))),
      ],
    })

    // restore cache
    _apolloClient.cache.restore(data)
  }
  // if the mod ssr
  if (typeof window === 'undefined') return _apolloClient

  // create client once on the frontend
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: null | undefined) {
  const store = useMemo(() => initiallizeApollo(initialState), [initialState])
  return store
}
