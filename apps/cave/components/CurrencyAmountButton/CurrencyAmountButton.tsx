import { Currency, CurrencyAmount } from '@concave/core'
import { Button, ButtonProps } from '@concave/ui'
import { useModals } from 'contexts/ModalsContext'
import { useApprove } from 'hooks/useApprove'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useAccount } from 'wagmi'

enum State {
  default,
  feching,
  pending,
  waitingWallet,
  successful,
  insufficient,
  disconected,
  error,
}

export const useCurrencyButtonState = (amount: CurrencyAmount<Currency>, spender: string) => {
  const { address } = useAccount()
  const { connectModal } = useModals()
  const currency = amount.currency
  const symbol = currency.symbol
  const totalSupply = currency.wrapped.totalSupply
  const balance = useCurrencyBalance(currency, { watch: true })
  const {
    allowance: { amount: allowance },
    ...approve
  } = useApprove(currency.wrapped, spender)

  const states: { [states in State]: ButtonProps } = {
    [State.disconected]: { children: 'Connect wallet', onClick: connectModal.onOpen },
    [State.pending]: { disabled: true, isLoading: true, loadingText: 'Approval pending' },
    [State.error]: { disabled: true, children: 'Error occurred' },
    [State.default]: { children: `Approve ${symbol}`, onClick: () => approve.sendApproveTx() },
    [State.feching]: { disabled: true, isLoading: true, loadingText: `Loading ${symbol} info` },
    [State.insufficient]: { disabled: true, children: `Insufficient ${symbol}` },
    [State.waitingWallet]: { disabled: true, isLoading: true, loadingText: 'Approve in wallet' },
    [State.successful]: { disabled: true, children: 'Approved' },
  } as const

  const stateKey: State = (() => {
    if (!address) return State.disconected
    if (balance.data?.lessThan(amount)) return State.insufficient
    if (currency.isNative) return State.successful
    if (approve.isError && approve.error['code'] !== 4001) return State.error
    if (totalSupply.greaterThan(0) && allowance?.greaterThan(totalSupply)) return State.successful
    if (allowance?.greaterThan(amount)) return State.successful
    if (approve.isWaitingForConfirmation) return State.waitingWallet
    if (approve.isWaitingTransactionReceipt) return State.pending
    if (approve.isFetching) return State.feching
    if (allowance?.lessThan(amount)) return State.default
    if (amount.equalTo(0)) return State.successful
  })()
  return { approved: stateKey === State.successful, state: states[stateKey] }
}

type CurrencyAmountButton = {
  /**
   * auto hide when amount is approved
   */
  autoHide?: boolean
  /**
   * currency to approve on contract
   */
  currencyAmount: CurrencyAmount<Currency>
  /**
   * address of spender
   */
  spender: string
}

export const CurrencyAmountButton = ({
  currencyAmount,
  spender,
  autoHide,
  ...buttonProps
}: ButtonProps & CurrencyAmountButton) => {
  const currencyButtonState = useCurrencyButtonState(currencyAmount, spender)

  // if the button is disabled, we must not intervene
  if (buttonProps.disabled) {
    return <Button {...buttonProps}></Button>
  }

  // if the amount is approved and has a children, we will use this
  if (currencyButtonState.approved && buttonProps.children) {
    return <Button {...buttonProps}></Button>
  }

  // if the amount is approved, and autoHide is enable, we must not render
  if (currencyButtonState.approved && autoHide) {
    return <></>
  }

  return <Button {...buttonProps} {...currencyButtonState.state}></Button>
}
