import { BigNumberish } from 'ethers'
import { Token } from 'gemswap-sdk'
import { useApprove } from './useApprove'

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
