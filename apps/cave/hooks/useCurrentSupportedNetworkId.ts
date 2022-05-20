import { ChainId } from '@concave/gemswap-sdk'
import { useUpdateEffect } from '@concave/ui'
import { chain, useNetwork } from 'wagmi'

export const useCurrentSupportedNetworkId = (onChangeNetwork?: (chainId: ChainId) => void) => {
  const [{ data }] = useNetwork()

  // we only support mainnet rn, so unless we testing in ropsten, default to mainnet
  const isRopsten = data.chain?.id === chain.ropsten.id
  const chainId = isRopsten ? (chain.ropsten.id as 3) : (chain.mainnet.id as 1)

  useUpdateEffect(() => {
    onChangeNetwork?.(chainId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])

  return chainId
}
