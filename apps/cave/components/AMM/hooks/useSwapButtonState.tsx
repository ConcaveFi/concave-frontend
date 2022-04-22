import { ButtonProps } from '@concave/ui'
import { Currency, ROUTER_ADDRESS, Trade, TradeType } from 'gemswap-sdk'
import { useAccount } from 'wagmi'
import { useModals } from 'contexts/ModalsContext'
import { useApprove } from 'hooks/useApprove'
import { usePermit } from 'hooks/usePermit'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { NoValidPairsError } from './usePair'

export const useSwapButtonState = ({
  currencyIn,
  trade,
  tradeError,
  onSwapClick,
}: {
  currencyIn: Currency
  trade: Trade<Currency, Currency, TradeType>
  tradeError: string
  onSwapClick: () => void
}): ButtonProps => {
  const [{ data: account }] = useAccount()
  const currencyInBalance = useCurrencyBalance(currencyIn)

  const [token, spender] = [currencyIn.wrapped, ROUTER_ADDRESS[currencyIn?.chainId]]
  const permit = usePermit(token, spender)
  const { allowance, ...approve } = useApprove(token, spender)

  const { connectModal } = useModals()

  const inputAmount = trade?.inputAmount
  const outputAmount = trade?.outputAmount

  /*
    Not Connected
  */
  if (!account?.address) return { children: 'Connect Wallet', onClick: connectModal.onOpen }

  /*
    Trade Error
  */
  if (tradeError === NoValidPairsError.message)
    return {
      isDisabled: true,
      children: `Insufficient liquidity`, // Try enabling multi-hop trades
    }

  /*
    Fetching user data (Allowance & Balance)
  */
  if (allowance.isLoading || currencyInBalance.isLoading) return { isLoading: true }
  if (allowance.isError || currencyInBalance.isError)
    return { children: `Error fetching account data`, isDisabled: true }

  /*
    Enter an amount
  */
  if (!inputAmount) return { isDisabled: true, children: 'Enter an amount' }

  /*
    Insufficient Funds
  */
  if (inputAmount?.greaterThan(currencyInBalance.data?.value.toString()))
    return {
      children: `Insufficient ${trade.inputAmount.currency.symbol} balance`,
      isDisabled: true,
    }

  /*
    Permit / Approve
  */
  if (approve.isWaitingForConfirmation)
    return { loadingText: 'Approve in your wallet', isLoading: true }
  if (approve.isWaitingTransactionReceipt)
    return { loadingText: 'Waiting block confirmation', isLoading: true }
  if (permit.isLoading) return { loadingText: 'Sign in your wallet', isLoading: true }

  const permitErroredOrWasNotInitializedYet = permit.isError || permit.isIdle
  const allowanceIsNotEnough =
    allowance.isSuccess && !!inputAmount?.greaterThan(allowance.value.toString())

  if (
    (permitErroredOrWasNotInitializedYet && allowanceIsNotEnough) ||
    allowanceIsNotEnough ||
    allowance.value.isZero()
  )
    return !permit.isSupported || permit.isError
      ? { children: `Approve ${currencyIn.symbol}`, onClick: () => approve.sendApproveTx() }
      : { children: `Permit ${currencyIn.symbol}`, onClick: () => permit.signPermit() }

  /* 
    Wrap / Unwrap, ETH <-> WETH
  */
  const currencyOut = outputAmount?.currency
  if (currencyIn.isNative && currencyIn.wrapped.equals(currencyOut)) return { children: 'Wrap' }
  if (currencyOut?.isNative && currencyIn.equals(currencyOut.wrapped)) return { children: 'Unwrap' }

  /*
    Swap
  */
  return {
    children: 'Swap',
    onClick: onSwapClick,
  }
}
