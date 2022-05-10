import { useUpdateEffect } from '@concave/ui'
import { chain, useNetwork } from 'wagmi'

export const useCurrentSupportedNetworkId = (onChangeNetwork) => {
  const [{ data }] = useNetwork()
  const isRopsten = data.chain?.id === chain.ropsten.id
  const chainId = isRopsten ? (chain.ropsten.id as 3) : (chain.mainnet.id as 1)
  useUpdateEffect(() => {
    onChangeNetwork?.(chainId)
  }, [onChangeNetwork, chainId])
  // we only support mainnet rn, so unless we testing in ropsten, default to mainnet
  return chainId
}
