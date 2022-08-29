import { Currency, CurrencyAmount, Erc20Abi, Token } from '@concave/core'
import { useContractRead } from 'wagmi'
import { UseContractReadConfig } from 'wagmi/dist/declarations/src/hooks/contracts/useContractRead'

type UseTotalSupply = Omit<ReturnType<typeof useContractRead>, 'data'> & {
  data: CurrencyAmount<Token>
}

export const useTotalSupply = (
  currency: Currency,
  config?: UseContractReadConfig,
): UseTotalSupply =>
  useContractRead({
    addressOrName: currency.wrapped.address,
    contractInterface: Erc20Abi,
    functionName: 'totalSupply',
    enabled: Boolean(currency),
    select: (totalSupply) => CurrencyAmount.fromRawAmount(currency, totalSupply.toString()) as any,
    ...config,
  }) as unknown as UseTotalSupply
