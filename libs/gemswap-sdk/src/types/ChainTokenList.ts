import { Token } from '../entities'

export type ChainTokenList = {
  readonly [chainId: number]: Token[]
}
