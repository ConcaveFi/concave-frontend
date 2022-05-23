import { ButtonProps } from '@concave/ui'
import { useAccount } from 'wagmi'
import { useModals } from 'contexts/ModalsContext'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { Currency, CurrencyAmount } from '@concave/gemswap-sdk'
import { NoValidPairsError, UsePairResult } from '../hooks/usePair'

export const useAddLiquidityButtonProps = (
  pair: UsePairResult,
  amount0: CurrencyAmount<Currency>,
  amount1: CurrencyAmount<Currency>,
  onAddLiquidityClick: () => void,
): ButtonProps => {
  const [{ data: account }] = useAccount()

  const currency0Balance = useCurrencyBalance(amount0?.currency, { watch: true })
  const currency1Balance = useCurrencyBalance(amount1?.currency, { watch: true })

  const { connectModal } = useModals()

  /*
    Not Connected
  */
  if (!account?.address) return { children: 'Connect wallet', onClick: connectModal.onOpen }

  if (!amount0 || !amount1 || amount0.currency.wrapped.equals(amount1.currency))
    return { isDisabled: true, children: `Invalid pair` }

  if (pair.isLoading) return { isLoading: true, loadingText: `Fetching pair` }

  /*
    Enter an amount
  */
  if (amount0.equalTo(0) || amount1.equalTo(0))
    return { isDisabled: true, children: `Enter an amount` }

  /*
    Insufficient Funds
  */
  if (currency0Balance.data?.lessThan(amount0))
    return {
      children: `Insufficient ${amount0.currency.symbol}`,
      isDisabled: true,
    }

  if (currency1Balance.data?.lessThan(amount1))
    return {
      children: `Insufficient ${amount1.currency.symbol}`,
      isDisabled: true,
    }

  /*
    Create Pair
  */
  if (!pair.data)
    return { children: 'Create a pair', isDisabled: false, onClick: onAddLiquidityClick }

  /*
    Add Liquidity
  */
  return {
    children: pair.error === NoValidPairsError ? 'Create liquidity' : 'Add liquidity',
    onClick: onAddLiquidityClick,
  }
}
