import { CNV, Currency, CurrencyAmount, PCNV, Percent } from '@concave/core'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useToken } from 'wagmi'

const PCNV_INITIAL_SUPPLY = 33300000n * 10n ** 18n

const useDefaultCNVRedenption = <C1 extends Currency, C2 extends Currency>(
  currencyOut: C1,
  currencyIn: C2,
) => {
  const calculateRedemptionAmount = (amountOut: CurrencyAmount<C1>) => {
    return CurrencyAmount.fromFractionalAmount(
      currencyIn,
      amountOut.numerator,
      amountOut.denominator,
    )
  }
  return useQuery(['CNV_DEFAULT_REDENPTION'], async () => {
    return { calculateRedemptionAmount } as const
  })
}

const usePCNVRedenption = <C1 extends Currency, C2 extends Currency>(
  currencyOut: C1,
  currencyIn: C2,
) => {
  const chainId = useCurrentSupportedNetworkId()
  const { data, ...queryInfo } = useToken({
    address: CNV[chainId].address,
  })
  return useMemo(() => {
    const totalSupplyCNV = data?.totalSupply.value
    const calculateRedemptionAmount = (amountOut: CurrencyAmount<C1>) => {
      const ratio = new Percent(1, 10)
        .multiply(totalSupplyCNV.toString())
        .divide(PCNV_INITIAL_SUPPLY.toString())
      const amount = amountOut.multiply(ratio)
      return CurrencyAmount.fromFractionalAmount(currencyIn, amount.numerator, amount.denominator)
    }
    return { ...queryInfo, data: { calculateRedemptionAmount } } as const
  }, [data])
}

export const useCalculateRedemptionAmount = <C1 extends Currency, C2 extends Currency>(
  currencyOut: C1,
  currencyIn: C2,
) => {
  const defaultStrategy = useDefaultCNVRedenption(currencyOut, currencyIn)
  const pncvStrategy = usePCNVRedenption(currencyOut, currencyIn)
  if (currencyOut.wrapped.address === PCNV[currencyOut.chainId].address) return pncvStrategy
  return defaultStrategy
}
