import { Currency, CurrencyAmount } from '@concave/core'
import { Button, ButtonProps } from '@concave/ui'
import { useModals } from 'contexts/ModalsContext'
import { useApprove } from 'hooks/useApprove'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useAccount } from 'wagmi'

export const useCurrencyButtonState = (amount: CurrencyAmount<Currency>, spender: string) => {
  const { address } = useAccount()
  const { connectModal } = useModals()
  const currency = amount.currency
  const symbol = currency.symbol
  const totalSupply = currency.wrapped.totalSupply
  const balance = useCurrencyBalance(currency, { watch: true })
  const { allowance, ...approve } = useApprove(currency.wrapped, spender)

  const disabled = true
  const isLoading = true
  const props = {
    disconected: { children: 'Connect wallet', onClick: connectModal.onOpen },
    pending: { disabled, isLoading, loadingText: 'Approval pending' },
    error: { disabled, children: 'Error occurred' },
    default: { children: `Approve ${symbol}`, onClick: () => approve.sendApproveTx() },
    fetching: { disabled, isLoading, loadingText: `Loading ${symbol} info` },
    insufficient: { disabled, children: `Insufficient ${symbol}` },
    waitingWallet: { disabled, isLoading, loadingText: 'Approve in wallet' },
    successful: { disabled, children: 'Approved' },
  } as const

  const state: keyof typeof props = (() => {
    if (!address) return 'disconected'
    if (balance.data?.lessThan(amount)) return 'insufficient'
    if (currency.isNative) return 'successful'
    if (approve.isError && approve.error['code'] !== 4001) return 'error'
    if (totalSupply.greaterThan(0) && allowance?.amount?.greaterThan(totalSupply))
      return 'successful'
    if (allowance?.amount?.greaterThan(amount)) return 'successful'
    if (approve.isWaitingForConfirmation) return 'waitingWallet'
    if (approve.isWaitingTransactionReceipt) return 'pending'
    if (approve.isFetching) return 'fetching'
    if (allowance?.amount?.lessThan(amount)) return 'default'
    if (amount.equalTo(0)) return 'successful'
  })()

  return {
    approved: state === 'successful',
    state,
    buttonProps: props[state],
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

  return <Button {...buttonProps} {...currencyButtonState.buttonProps}></Button>
}
