import { chain, useNetwork } from 'wagmi'

export const useCurrentSupportedNetworkId = () => {
  const [{ data }] = useNetwork()
  const isRopsten = data.chain?.id === chain.ropsten.id
  // we only support mainnet rn, so unless we testing in ropsten, default to mainnet
  return isRopsten ? chain.ropsten.id : chain.mainnet.id
}
