import { Currency, ROUTER_ADDRESS } from '@concave/core'
import { Trade, TradeType } from '@concave/gemswap-sdk'
import { ButtonProps } from '@concave/ui'
import { useCurrencyButtonState } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { isAddress } from 'ethers/lib/utils'
import { swapSupportedChains } from 'pages/gemswap'
import { toPercent } from 'utils/toPercent'
import { useAccount, useNetwork } from 'wagmi'
<<<<<<<< HEAD:apps/cave/components/AMM/Swap/hooks/useSwapButtonProps.tsx
import { NoValidPairsError } from '../../hooks/usePair'
import { InsufficientLiquidityError } from '../../hooks/useTrade'
import { useSwapSettings } from '../Settings'
========
import { NoValidPairsError } from './usePair'
import { InsufficientLiquidityError } from './useTrade'
import { useSwapSettings } from '../Swap/Settings'
>>>>>>>> 3f7e77a4 (CE 631: Refactor file structure (#490)):apps/cave/components/AMM/hooks/useSwapButtonProps.tsx

export const useSwapButtonProps = ({
  trade,
  error,
  recipient,
  onSwapClick,
}: {
  trade: Trade<Currency, Currency, TradeType>
  error: string
  recipient: string
  onSwapClick: () => void
}): ButtonProps => {
  const { isConnecting } = useAccount()
  const { chain } = useNetwork()
  const currencyIn = trade.inputAmount?.currency
  const useCurrencyState = useCurrencyButtonState(
    trade.inputAmount,
    ROUTER_ADDRESS[trade.inputAmount?.currency.chainId],
  )
  const isExpertMode = useSwapSettings((s) => s.settings.expertMode)
  if (useCurrencyState.state === 'disconected') return useCurrencyState.buttonProps
  /*
    Not Connected
  */
  if (isConnecting) return { isLoading: true }

  /*
    Select a token
  */
  if (!currencyIn || !trade.outputAmount?.currency)
    return { children: 'Select a token', isDisabled: true }

  /*
    Network Stuff
  */
  if (chain?.id !== currencyIn.chainId) return { children: 'Network mismatch', isDisabled: true }
  if (!swapSupportedChains.includes(chain?.id))
    return {
      children: 'Unsupported chain',
      isDisabled: true,
    }

  /* 
    SOON Wrap / Unwrap
  */
  const currencyOut = trade.outputAmount?.currency
  if (currencyIn.isNative && currencyIn.wrapped.equals(currencyOut))
    return { children: 'Wrap (soon)', isDisabled: true }
  if (currencyOut?.isNative && currencyIn.equals(currencyOut.wrapped))
    return { children: 'Unwrap (soon)', isDisabled: true }

  /*
    Price impact
  */
  if (!isExpertMode && trade.priceImpact?.greaterThan(toPercent(20)))
    return { children: 'Price impact is too high', isDisabled: true }

  /*
    Trade Error
  */
  if (error === NoValidPairsError)
    return {
      isDisabled: true,
      children: `No liquidity`, // Try enabling multi-hop trades
    }

  if (error === InsufficientLiquidityError)
    return { children: `Not enough liquidity`, isDisabled: true }

  /*
    Enter an amount
  */
  if (!trade.inputAmount || trade.inputAmount?.equalTo(0))
    return { isDisabled: true, children: 'Enter an amount' }

  if (recipient && !isAddress(recipient)) return { children: 'Invalid recipient', isDisabled: true }

  if (!useCurrencyState.approved) return useCurrencyState.buttonProps

  /*
    Swap
  */
  return {
    children: 'Swap',
    onClick: onSwapClick,
  }
}
