import { ChainId } from '@concave/gemswap-sdk'
import { useUpdateEffect } from '@concave/ui'
import { chain, useNetwork } from 'wagmi'

export const useCurrentSupportedNetworkId = (onChangeNetwork?: (chainId: ChainId) => void) => {
  const [{ data }] = useNetwork()

  // we only support mainnet rn, so unless we testing in RINKEBY, default to mainnet
  const isRINKEBY = data.chain?.id === chain.rinkeby.id
  const chainId = isRINKEBY ? (chain.rinkeby.id as 4) : (chain.mainnet.id as 1)

  useUpdateEffect(() => {
    onChangeNetwork?.(chainId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])

  return chainId
}
