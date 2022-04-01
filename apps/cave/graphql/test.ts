import { gql } from '@apollo/client'

export const QUERY_TEST = gql`
  query QueryTest {
    test {
      cnvAPY
      cnvIndex
      cnvPrice
      growthCNV24h
      growthCNV30d
    }
  }
`
