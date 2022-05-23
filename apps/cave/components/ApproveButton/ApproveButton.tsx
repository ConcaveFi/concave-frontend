import { Currency, MaxUint256 } from '@concave/gemswap-sdk'
import { Button, ButtonProps } from '@concave/ui'
import { BigNumberish } from 'ethers'
import { useApprove } from 'hooks/useApprove'

type ApproveButtonProps = ButtonProps & {
  autoHide?: boolean
  approveArgs: {
    currency: Currency
    amount?: BigNumberish
    spender: string
    onSuccess?: () => void
  }
}
type ApproveButtonState = {
  [states: string]: { enable?: boolean; isLoading?: boolean; label: string; cb?: () => void }
}

/**
 *
 * @param autoHide auto hide when amount is approved
 * @param approveArgs.currency currency to approve on contract
 * @param spender address of spender
 */
export const ApproveButton = ({ approveArgs, ...buttonProps }: ApproveButtonProps) => {
  const { currency, spender, amount = MaxUint256.toString() } = approveArgs
  const { allowance, ...approve } = useApprove(currency.wrapped, spender)
  const approveButtonAvailabelStates: ApproveButtonState = {
    default: { enable: true, label: `Approve ${currency.symbol}` },
    feching: { isLoading: true, label: `Loading ${currency.symbol} info` },
    pending: { isLoading: true, label: 'Approval pending' },
    waitingWallet: { isLoading: true, label: 'Approve in wallet' },
    successful: {
      label: 'Approved',
      cb: () => approveArgs.onSuccess?.(),
    },
    error: { enable: false, label: 'Error occurred' },
  }

  const stateKey: keyof typeof approveButtonAvailabelStates = (() => {
    if (currency.isNative) return 'successful'
    if (approve.isFeching) return 'feching'
    if (allowance?.value?.gte(amount)) return 'successful'
    if (approve.isWaitingTransactionReceipt) return 'pending'
    if (approve.isWaitingForConfirmation) return 'waitingWallet'
    if (approve.isTransactionSent) return 'successful'
    if (approve.isError && approve.error['code'] !== 4001) return 'error'
    return 'default'
  })()
  const state = approveButtonAvailabelStates[stateKey]
  if ('cb' in state) state.cb()
  if ('successful' === stateKey && buttonProps.autoHide) return <></>
  if (('successful' === stateKey || buttonProps.isDisabled) && buttonProps.children) {
    return <Button {...buttonProps} />
  }

  return (
    <Button
      {...buttonProps}
      disabled={!state.enable || buttonProps.disabled}
      onClick={() => approve.sendApproveTx()}
      isLoading={state.isLoading}
      loadingText={state.label}
    >
      {state.label}
    </Button>
  )
}
