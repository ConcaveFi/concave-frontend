import { CNV } from '@concave/core'
import { useFiatPrice } from 'components/AMM/hooks/useFiatPrice'
import { useCurrentSupportedNetworkId } from './useCurrentSupportedNetworkId'

export const useCNVPrice = () => {
  const networkId = useCurrentSupportedNetworkId()
  const cnvPrice = useFiatPrice(CNV[networkId])
  return cnvPrice
}
