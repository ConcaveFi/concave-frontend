import { CNV } from '@concave/core'
import { useFiatPrice } from 'components/AMM/hooks/useFiatPrice'
import { useState } from 'react'
import { useCurrentSupportedNetworkId } from './useCurrentSupportedNetworkId'

export const useCurrentCNVPrice = () => {
  const networkId = useCurrentSupportedNetworkId()
  const [networkCNV, setNetworkCNV] = useState(CNV[networkId])
  useCurrentSupportedNetworkId((networkId) => setNetworkCNV(CNV[networkId]))
  const cnvPrice = useFiatPrice(networkCNV)
  return cnvPrice
}
