import { CurrencyAmount, MaxUint256, Token } from '@concave/gemswap-sdk'
import { Button, ButtonProps } from '@concave/ui'
import { useModals } from 'contexts/ModalsContext'
import { BigNumberish } from 'ethers'
import { useAccount } from 'wagmi'
import { useApprove } from './useApprove'

export const useApproval = (currencyAmount: CurrencyAmount<Token>, address: string) => {
  return useApprovalWhenNeeded(
    currencyAmount.currency,
    address,
    currencyAmount.numerator.toString(),
  )
}

type UseApprovalReturnType = ReturnType<typeof useApproval>

export const ApproveButton = ({
  useApproveInfo: [needsApprove, approve, label, isLoading],
  ...buttonProps
}: {
  useApproveInfo: UseApprovalReturnType
} & ButtonProps) => {
  const [{ data: account }] = useAccount()
  const { connectModal } = useModals()

  if (!account?.address)
    return (
      <Button fontSize="2xl" {...buttonProps} onClick={connectModal.onOpen}>
        {'Connect Wallet'}
      </Button>
    )

  if (isLoading) {
    return <></>
  }

  if (!needsApprove) {
    return <></>
  }

  return (
    <Button fontSize="2xl" {...buttonProps} onClick={approve}>
      {label}
    </Button>
  )
}

export const useApprovalWhenNeeded = (
  token: Token,
  spender: string,
  amount: BigNumberish = MaxUint256.toString(),
) => {
  const { allowance, ...approve } = useApprove(token, spender)
  const label = (() => {
    if (approve.isWaitingTransactionReceipt) return 'Waiting block confirmation'

    if (allowance.isError) {
      return 'Error on request'
    }

    if (allowance?.value?.gte(amount)) {
      return 'Approved'
    }
    if (approve.isWaitingForConfirmation) {
      return 'Approve in your wallet'
    }
    return `Approve ${token.symbol}`
  })()

  return [
    !allowance.isSuccess || allowance?.value.toString() === '0',
    () => {
      approve.sendApproveTx()
    },
    label,
    allowance.isLoading,
  ] as const
}
