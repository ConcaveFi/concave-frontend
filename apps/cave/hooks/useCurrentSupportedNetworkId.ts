import { ChainId } from '@concave/core'
import { useUpdateEffect } from '@concave/ui'
import { useNetwork } from 'wagmi'

export const useCurrentSupportedNetworkId = (onChangeNetwork?: (chainId: ChainId) => void) => {
  const { chain } = useNetwork()
  const chainId = chain?.unsupported ? ChainId.ETHEREUM : chain?.id || ChainId.ETHEREUM

  useUpdateEffect(() => {
    onChangeNetwork?.(chainId)
  }, [chainId])

  return chainId
}
