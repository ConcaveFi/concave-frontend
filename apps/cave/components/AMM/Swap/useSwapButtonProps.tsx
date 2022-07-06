import { Currency, CurrencyAmount } from '@concave/core'
import { Trade, TradeType } from '@concave/gemswap-sdk'
import { ButtonProps } from '@concave/ui'
import { isAddress } from 'ethers/lib/utils'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { swapSupportedChains } from 'pages/gemswap'
import { toPercent } from 'utils/toPercent'
import { useNetwork } from 'wagmi'
import { NoValidPairsError } from '../hooks/usePair'
import { InsufficientLiquidityError } from '../hooks/useTrade'
import { SwapSettings } from './Settings'

export const useSwapButtonProps = ({
  trade,
  error,
  inputAmount,
  outputAmount,
  recipient,
  settings,
  onSwapClick,
}: {
  trade: Trade<Currency, Currency, TradeType>
  error: string
  inputAmount: CurrencyAmount<Currency>
  outputAmount: CurrencyAmount<Currency>
  recipient: string
  settings: SwapSettings
  onSwapClick: () => void
}): ButtonProps => {
  const network = useNetwork()
  const currencyIn = inputAmount?.currency
  const currencyInBalance = useCurrencyBalance(currencyIn, { watch: true })

  /*
    Not Connected
  */
  if (network.isLoading) return { isLoading: true }

  /*
    Select a token
  */
  if (!currencyIn || !outputAmount?.currency)
    return { children: 'Select a token', isDisabled: true }

  /*
    Network Stuff
  */
  if (network.activeChain?.id !== currencyIn.chainId)
    return { children: 'Network mismatch', isDisabled: true }
  if (!swapSupportedChains.includes(network.activeChain?.id))
    return { children: 'Unsupported chain', isDisabled: true }

  /* 
    SOON Wrap / Unwrap
  */
  const currencyOut = outputAmount?.currency
  if (currencyIn.isNative && currencyIn.wrapped.equals(currencyOut))
    return { children: 'Wrap (soon)', isDisabled: true }
  if (currencyOut?.isNative && currencyIn.equals(currencyOut.wrapped))
    return { children: 'Unwrap (soon)', isDisabled: true }

  /*
    Price impact
  */
  if (!settings.expertMode && trade?.priceImpact.greaterThan(toPercent(20)))
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
  if (!inputAmount || inputAmount?.equalTo(0))
    return { isDisabled: true, children: 'Enter an amount' }

  /*
    Insufficient Funds
  */
  if (currencyInBalance.data?.lessThan(inputAmount))
    return {
      children: `Insufficient ${inputAmount.currency.symbol}`,
      isDisabled: true,
    }

  if (recipient && !isAddress(recipient)) return { children: 'Invalid recipient', isDisabled: true }

  /*
    Swap
  */
  return {
    children: 'Swap',
    onClick: onSwapClick,
  }
}
