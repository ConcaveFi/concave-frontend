import { ROUTER_ADDRESS } from '@concave/gemswap-sdk'
import { ButtonProps } from '@concave/ui'
import { useModals } from 'contexts/ModalsContext'
import { isAddress } from 'ethers/lib/utils'
import { useApprove } from 'hooks/useApprove'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { usePermit } from 'hooks/usePermit'
import { swapSupportedChains } from 'pages/gemswap'
import { useAccount } from 'wagmi'
import { NoValidPairsError } from '../hooks/usePair'
import { InsufficientLiquidityError, UseTradeResult } from '../hooks/useTrade'

export const useSwapButtonProps = ({
  trade,
  recipient,
  onSwapClick,
}: {
  trade: UseTradeResult
  recipient: string
  onSwapClick: () => void
}): ButtonProps => {
  const [{ data: account }] = useAccount()
  const networkId = useCurrentSupportedNetworkId()

  const inputAmount = trade.data.inputAmount
  const outputAmount = trade.data.outputAmount

  const currencyIn = inputAmount?.currency
  const currencyInBalance = useCurrencyBalance(currencyIn, { watch: true })

  const [token, spender] = [currencyIn?.wrapped, ROUTER_ADDRESS[currencyIn?.chainId]]
  const permit = usePermit(token, spender)
  const { allowance, ...approve } = useApprove(token, spender)

  const { connectModal } = useModals()

  /*
    Not Connected
  */
  if (!account?.address) return { children: 'Connect wallet', onClick: connectModal.onOpen }

  if (networkId !== currencyIn.chainId) return { children: 'Network mismatch', isDisabled: true }
  if (!swapSupportedChains.includes(networkId))
    return {
      children: 'Unsupported chain',
      onClick: () => account.connector.switchChain(currencyIn.chainId).catch(() => {}),
    }

  /*
    Trade loaded
  */
  if (trade.isLoading) return { isLoading: true }

  /*
    Trade Error
  */
  if (trade.error === NoValidPairsError)
    return {
      isDisabled: true,
      children: `No liquidity`, // Try enabling multi-hop trades
    }

  if (trade.error === InsufficientLiquidityError)
    return { children: `Not enough liquidity`, isDisabled: true }

  /*
    Fetching user data (Allowance & Balance)
  */
  if (allowance.isLoading || currencyInBalance.isLoading) return { isLoading: true }
  if (allowance.isError || currencyInBalance.isError)
    return { children: `Error fetching account data`, isDisabled: true }

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
      children: `Insufficient ${inputAmount.currency.symbol} balance`,
      isDisabled: true,
    }

  /*
    Permit / Approve
  */
  if (currencyIn.isToken) {
    if (approve.isWaitingForConfirmation)
      return { loadingText: 'Approve in your wallet', isLoading: true }
    if (approve.isWaitingTransactionReceipt)
      return { loadingText: 'Waiting approval confirmation', isLoading: true }
    if (permit.isLoading) return { loadingText: 'Sign in your wallet', isLoading: true }

    const permitErroredOrWasNotInitializedYet = permit.isError || permit.isIdle
    const allowanceIsNotEnough = allowance.isSuccess && !!allowance.amount?.lessThan(inputAmount)

    if (
      (permitErroredOrWasNotInitializedYet && allowanceIsNotEnough) ||
      allowanceIsNotEnough ||
      allowance.value.isZero()
    )
      return !permit.isSupported || permit.isError
        ? { children: `Approve ${currencyIn.symbol}`, onClick: () => approve.sendApproveTx() }
        : { children: `Permit ${currencyIn.symbol}`, onClick: () => permit.signPermit() }
  }

  if (recipient && !isAddress(recipient)) return { children: 'Invalid recipient', isDisabled: true }

  /* 
    Wrap / Unwrap, ETH <-> WETH
  */
  const currencyOut = outputAmount?.currency
  if (currencyIn.isNative && currencyIn.wrapped.equals(currencyOut))
    return { children: 'Wrap', onClick: onSwapClick }
  if (currencyOut?.isNative && currencyIn.equals(currencyOut.wrapped))
    return { children: 'Unwrap', onClick: onSwapClick }

  /*
    Swap
  */
  return {
    children: 'Swap',
    onClick: onSwapClick,
  }
}
