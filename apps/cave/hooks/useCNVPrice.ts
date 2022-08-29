import { CNV } from '@concave/core'
import { useFiatPrice } from 'components/AMM/hooks/useFiatPrice'
import { useCurrentSupportedNetworkId } from './useCurrentSupportedNetworkId'

export const useCNVPrice = () => {
  const networkId = useCurrentSupportedNetworkId()
  const cnvPrice = useFiatPrice(CNV[networkId])
  const { isError, isLoading, isSuccess } = cnvPrice
  let status: 'loading' | 'error' | 'success' = 'loading'
  if (isError) status = 'error'
  if (isSuccess) status = 'success'
  return { ...cnvPrice, status }
}
