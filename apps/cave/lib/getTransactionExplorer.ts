import { ChainId } from '@concave/core'
import { etherscanBlockExplorers } from 'wagmi'

export const getTxExplorer = (hash: string, chainId: ChainId) => {
  const explorerUrl =
    {
      [ChainId.ETHEREUM]: etherscanBlockExplorers.mainnet.url,
      [ChainId.RINKEBY]: etherscanBlockExplorers.rinkeby.url,
      [ChainId.GÖRLI]: etherscanBlockExplorers.goerli.url,
    }[chainId] || etherscanBlockExplorers.mainnet.url

  return `${explorerUrl}/tx/${hash}`
}
