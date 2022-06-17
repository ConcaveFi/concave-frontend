import { ChainId, CHAIN_NAME } from '@concave/core'
import { etherscanBlockExplorers } from 'wagmi'

export const getTxExplorer = (hash: string, chainId: ChainId) => {
  return etherscanBlockExplorers[CHAIN_NAME[chainId]].url + `/tx/${hash}`
}
