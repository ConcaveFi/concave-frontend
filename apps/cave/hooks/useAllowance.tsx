import { CurrencyAmount, MaxUint256, Token } from '@concave/gemswap-sdk'
import { BigNumberish } from 'ethers'
import { useApprove } from './useApprove'

export const useApproval = (currencyAmount: CurrencyAmount<Token>, address: string) => {
  return useApprovalWhenNeeded(
    currencyAmount.currency,
    address,
    currencyAmount.numerator.toString(),
  )
}

type UseApprovalReturnType = ReturnType<typeof useApproval>

export const useApprovalWhenNeeded = (
  token: Token,
  spender: string,
  amount: BigNumberish = MaxUint256.toString(),
) => {
  const { allowance, ...approve } = useApprove(token, spender)
  const label = (() => {
    if (approve.isWaitingTransactionReceipt) return 'Approving'

    if (allowance.isError) {
      return 'Error on request'
    }

    if (allowance?.value?.gte(amount)) {
      return 'Approved'
    }
    if (approve.isWaitingForConfirmation) {
      return 'Approve in wallet'
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
