import { ChainId } from '@concave/core'
import { mainnet, goerli } from 'wagmi/chains'

export const getTxExplorer = (hash: string, chainId: ChainId) => {
  const explorerUrl =
    {
      [ChainId.ETHEREUM]: mainnet.blockExplorers.default.url,
      [ChainId.GÖRLI]: goerli.blockExplorers.default.url,
    }[chainId] || mainnet.blockExplorers.default.url

  return `${explorerUrl}/tx/${hash}`
}
