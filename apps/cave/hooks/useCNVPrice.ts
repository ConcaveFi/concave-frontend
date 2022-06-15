import { CNV } from '@concave/core'
import { useFiatPrice } from 'components/AMM/hooks/useFiatPrice'
import { useState } from 'react'
import { useCurrentSupportedNetworkId } from './useCurrentSupportedNetworkId'

export const useCNVPrice = () => {
  const networkId = useCurrentSupportedNetworkId((networkId) => setNetworkCNV(CNV[networkId]))
  const [networkCNV, setNetworkCNV] = useState(CNV[networkId])
  const cnvPrice = useFiatPrice(networkCNV)
  return cnvPrice
}
