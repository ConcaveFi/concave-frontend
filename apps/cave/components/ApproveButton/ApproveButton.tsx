import { Currency, MaxUint256 } from '@concave/gemswap-sdk'
import { Button, ButtonProps } from '@concave/ui'
import { useModals } from 'contexts/ModalsContext'
import { BigNumberish } from 'ethers'
import { useApprove } from 'hooks/useApprove'
import { useAccount } from 'wagmi'

type ApproveButtonProps = ButtonProps & {
  autoHide?: boolean
  approveArgs: {
    currency: Currency
    amount: BigNumberish
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
  const [{ data: account }] = useAccount()
  const { connectModal } = useModals()
  if (!account?.address)
    return (
      <Button fontSize="2xl" {...buttonProps} onClick={connectModal.onOpen}>
        {'Connect wallet'}
      </Button>
    )

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
    if (approve.isError && approve.error['code'] !== 4001) return 'error'

    if (
      currency.wrapped.totalSupply.greaterThan(0) &&
      allowance?.amount?.greaterThan(currency.wrapped.totalSupply.numerator)
    )
      return 'successful'
    if (allowance?.value?.gte(amount.toString())) return 'successful'
    if (approve.isWaitingForConfirmation) return 'waitingWallet'
    if (approve.isWaitingTransactionReceipt) return 'pending'
    if (approve.isFeching) return 'feching'
    return 'default'
  })()
  const state = approveButtonAvailabelStates[stateKey]
  if ('cb' in state) state.cb()
  if ('successful' === stateKey && buttonProps.autoHide) return <></>
  if ('successful' === stateKey) return <Button {...buttonProps} />

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
