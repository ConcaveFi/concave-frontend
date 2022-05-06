import { CurrencyAmount, ROUTER_ADDRESS, Token } from '@concave/gemswap-sdk'
import { Button, ButtonProps } from '@concave/ui'
import { BigNumberish } from 'ethers'
import { useApprove } from './useApprove'

export const useApproval = (currencyAmount: CurrencyAmount<Token>) => {
  return useApprovalWhenNeeded(
    currencyAmount.currency,
    ROUTER_ADDRESS[currencyAmount.currency.chainId],
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

export const useApprovalWhenNeeded = (token: Token, spender: string, amount: BigNumberish) => {
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
    return `Approve to use ${token.symbol}`
  })()

  return [
    !allowance.isSuccess || approve.isLoading || allowance?.value.toString() === '0',
    () => {
      approve.sendApproveTx()
    },
    label,
    approve.isLoading,
  ] as const
}
