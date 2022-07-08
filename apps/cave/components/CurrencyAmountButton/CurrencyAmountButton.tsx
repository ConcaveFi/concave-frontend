import { Currency, CurrencyAmount } from '@concave/core'
import { Button, ButtonProps } from '@concave/ui'
import { useModals } from 'contexts/ModalsContext'
import { useApprove } from 'hooks/useApprove'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useAccount } from 'wagmi'

export enum CurrencyButtonState {
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

  const states: { [states in CurrencyButtonState]: ButtonProps } = {
    [CurrencyButtonState.disconected]: { children: 'Connect wallet', onClick: connectModal.onOpen },
    [CurrencyButtonState.pending]: {
      disabled: true,
      isLoading: true,
      loadingText: 'Approval pending',
    },
    [CurrencyButtonState.error]: { disabled: true, children: 'Error occurred' },
    [CurrencyButtonState.default]: {
      children: `Approve ${symbol}`,
      onClick: () => approve.sendApproveTx(),
    },
    [CurrencyButtonState.feching]: {
      disabled: true,
      isLoading: true,
      loadingText: `Loading ${symbol} info`,
    },
    [CurrencyButtonState.insufficient]: { disabled: true, children: `Insufficient ${symbol}` },
    [CurrencyButtonState.waitingWallet]: {
      disabled: true,
      isLoading: true,
      loadingText: 'Approve in wallet',
    },
    [CurrencyButtonState.successful]: { disabled: true, children: 'Approved' },
  } as const

  const stateKey: CurrencyButtonState = (() => {
    if (!address) return CurrencyButtonState.disconected
    if (balance.data?.lessThan(amount)) return CurrencyButtonState.insufficient
    if (currency.isNative) return CurrencyButtonState.successful
    if (approve.isError && approve.error['code'] !== 4001) return CurrencyButtonState.error
    if (totalSupply.greaterThan(0) && allowance?.greaterThan(totalSupply))
      return CurrencyButtonState.successful
    if (allowance?.greaterThan(amount)) return CurrencyButtonState.successful
    if (approve.isWaitingForConfirmation) return CurrencyButtonState.waitingWallet
    if (approve.isWaitingTransactionReceipt) return CurrencyButtonState.pending
    if (approve.isFetching) return CurrencyButtonState.feching
    if (allowance?.lessThan(amount)) return CurrencyButtonState.default
    if (amount.equalTo(0)) return CurrencyButtonState.successful
  })()
  return {
    approved: stateKey === CurrencyButtonState.successful,
    stateKey,
    state: states[stateKey],
  }
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
