import { Button, ButtonProps } from '@concave/ui'
import { BigNumberish } from 'ethers'
import { CurrencyAmount, ROUTER_ADDRESS, Token } from 'gemswap-sdk'
import { currencyAmountToBigNumber } from 'lib/util'
import { useApprove } from './useApprove'

export const useApproval = (currencyAmount: CurrencyAmount<Token>) => {
  return useApprovalWhenNeeded(
    currencyAmount.currency,
    ROUTER_ADDRESS[currencyAmount.currency.chainId],
    currencyAmountToBigNumber(currencyAmount),
  )
}

type UseApprovalType = ReturnType<typeof useApproval>

export const ApproveButton = ({
  useApproveInfo: [needsApprove, approve, label],
  ...buttonProps
}: {
  useApproveInfo: UseApprovalType
} & ButtonProps) => {
  if (!needsApprove) {
    return <></>
  }

  return (
    <Button mt={2} p={6} fontSize="2xl" variant={'primary'} {...buttonProps} onClick={approve}>
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
    !allowance.isSuccess || allowance?.value.toString() === '0',
    () => {
      approve.sendApproveTx()
    },
    label,
  ] as const
}
