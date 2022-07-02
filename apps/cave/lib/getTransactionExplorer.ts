import { ChainId, CHAIN_NAME } from '@concave/core'
import { etherscanBlockExplorers } from 'wagmi'

export const getTxExplorer = (hash: string, chainId: ChainId) => {
  // TODO: needs further investigation, but the ethers Transaction object sometimes don't have a chainId or it is 0
  const _chainId = chainId || ChainId.ETHEREUM
  return etherscanBlockExplorers[CHAIN_NAME[_chainId]]?.url + `/tx/${hash}`
}
