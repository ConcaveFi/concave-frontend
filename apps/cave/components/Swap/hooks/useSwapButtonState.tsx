import { ButtonProps, Stack, Text } from '@concave/ui'
import { Currency, ROUTER_ADDRESS, Trade, TradeType } from 'gemswap-sdk'
import { useAccount } from 'wagmi'
import { useModals } from 'contexts/ModalsContext'
import { useApprove } from 'hooks/useApprove'
import { usePermit } from 'hooks/usePermit'
import { SwapSettings } from '../Settings'
import { useCurrencyBalance } from './useCurrencyBalance'
import { NoValidPairsError } from './usePair'
import { useSwapTransaction } from './useSwapTransaction'

export const useSwapButtonState = ({
  currencyIn,
  trade,
  tradeError,
  settings,
  onOpenSwapConfirmationModal,
}: {
  currencyIn: Currency
  trade: Trade<Currency, Currency, TradeType>
  tradeError: string
  settings: SwapSettings
  onOpenSwapConfirmationModal: () => void
}): ButtonProps => {
  const [{ data: account }] = useAccount()

  const currencyInBalance = useCurrencyBalance(currencyIn)

  const [token, spender] = [currencyIn.wrapped, ROUTER_ADDRESS[currencyIn?.chainId]]
  const permit = usePermit(token, spender)
  const { allowance, ...approve } = useApprove(token, spender)

  const { connectModal } = useModals()

  const swapTx = useSwapTransaction(trade, settings)

  const inputAmount = trade?.inputAmount
  const outputAmount = trade?.outputAmount

  /*
    Trade Error
  */
  if (tradeError === NoValidPairsError.message)
    return {
      isDisabled: true,
      children: (
        <Stack>
          <Text fontSize="sm">{`Insufficient liquidity for this trade`}</Text>
          {/* {!settings.multihops && `Try enabling multi-hop trades`} */}
        </Stack>
      ),
    }

  /*
    Not Connected
  */
  if (!account?.address) return { children: 'Connect Wallet', onClick: connectModal.onOpen }

  /*
    Fetching user data (Allowance & Balance)
  */
  if (allowance.isLoading || currencyInBalance.isLoading) return { isLoading: true }
  if (allowance.isError || currencyInBalance.isError)
    return { children: `Error fetching account data`, isDisabled: true }

  /*
    Insufficient Funds
  */
  if (inputAmount?.greaterThan(currencyInBalance.data?.value.toString()))
    return { children: `Insufficient ${trade.inputAmount.currency.symbol} balance` }

  /*
    Permit / Approve
  */
  if (approve.isWaitingUserConfirmation)
    return { loadingText: 'Approve in your wallet', isLoading: true }
  if (approve.isWaitingTransactionReceipt)
    return { loadingText: 'Waiting block confirmation', isLoading: true }
  if (permit.isLoading) return { loadingText: 'Sign in your wallet', isLoading: true }

  const permitErroredOrWasNotInitializedYet = permit.isError || permit.isIdle
  const allowanceIsNotEnough =
    !!allowance.value && !!inputAmount?.greaterThan(allowance.value.toString())

  if ((permitErroredOrWasNotInitializedYet && allowanceIsNotEnough) || allowanceIsNotEnough)
    return !permit.isSupported || permit.isError
      ? { children: `Approve ${currencyIn.symbol}`, onClick: () => approve.sendApproveTx() }
      : { children: `Permit ${currencyIn.symbol}`, onClick: () => permit.signPermit() }

  /* 
    Wrap / Unwrap, ETH -> WETH
  */
  const currencyOut = outputAmount?.currency
  if (currencyIn.isNative && currencyIn.wrapped.equals(currencyOut)) return { children: 'Wrap' }
  if (currencyOut?.isNative && currencyIn.equals(currencyOut.wrapped)) return { children: 'Unwrap' }

  /*
    Swap
  */
  return {
    children: 'Swap',
    onClick: () => {
      if (settings.expertMode) swapTx.sendSwapTx()
      else onOpenSwapConfirmationModal()
    },
  }
}
