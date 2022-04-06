import { Token } from '@uniswap/sdk-core'


export type TokenType = Token & {
  logoURI: string
}
  export type AvailableTokens = string