import { Currency, MaxUint256 } from '@concave/gemswap-sdk'
import { Button, ButtonProps } from '@concave/ui'
import { BigNumberish } from 'ethers'
import { useApprove } from 'hooks/useApprove'

type ApproveButtonProps = ButtonProps & {
  autoHide?: boolean
  approveArgs: {
    currency: Currency
    amount: BigNumberish
    contract: string
    onSuccess?: () => void
  }
}

/**
 *
 * @param autoHide auto hide when amount is approved
 * @param approveArgs.currency currency to approve on contract
 * @param contract contract to approve
 */
export const ApproveButton = ({ approveArgs, ...buttonProps }: ApproveButtonProps) => {
  const { currency, contract, amount = MaxUint256.toString() } = approveArgs
  const { allowance, ...approve } = useApprove(currency.wrapped, contract)
  const approveButtonAvailabelStates = {
    default: { enable: true, label: `Approve ${currency.symbol}` },
    feching: { enable: false, label: `Loading ${currency.symbol} info` },
    pending: { enable: false, label: 'Approval pending' },
    waitingWallet: { enable: false, label: 'Approve in wallet' },
    successful: {
      enable: false,
      label: 'Approved',
      callback: () => approveArgs.onSuccess?.(),
    },
    error: { enable: true, label: 'Error occurred' },
  }

  const stateKey: keyof typeof approveButtonAvailabelStates = (() => {
    if (currency.isNative) return 'successful'
    if (approve.isFeching) return 'feching'
    if (allowance?.value?.gte(amount)) return 'successful'
    if (approve.isWaitingTransactionReceipt) return 'pending'
    if (approve.isWaitingForConfirmation) return 'waitingWallet'
    if (approve.isTransactionSent) return 'successful'
    if (approve.isError) return 'error'
    return 'default'
  })()

  const state = approveButtonAvailabelStates[stateKey]
  if ('callback' in state) state.callback()
  if ('successful' === stateKey && buttonProps.autoHide) return <></>
  if ('successful' === stateKey && buttonProps.children) return <Button {...buttonProps} />

  return (
    <Button {...buttonProps} disabled={!state.enable} onClick={() => approve.sendApproveTx()}>
      {state.label}
    </Button>
  )
}
