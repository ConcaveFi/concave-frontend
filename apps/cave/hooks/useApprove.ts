import { CurrencyAmount, MaxUint256, Token } from '@concave/core'
import { TransactionReceipt } from '@ethersproject/abstract-provider'
import { BigNumberish } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry/'
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'

export const useAllowance = (token: Token, spender: string, userAddress: string) => {
  const {
    data: value,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useContractRead({
    addressOrName: token?.address,
    contractInterface: erc20ABI,
    functionName: 'allowance',
    args: [userAddress, spender],
    chainId: token?.chainId,
    enabled: !!(token?.address && spender && userAddress),
  })

  return {
    isError,
    isLoading,
    isSuccess,
    error,
    value,
    formatted: value && formatUnits(value, token?.decimals),
    amount: value && CurrencyAmount.fromRawAmount(token, value.toString()),
    refetch,
  }
}

export const useContractApprove = (
  token: Token,
  spender: string,
  amountToApprove: BigNumberish = MaxUint256.toString(),
  { onSuccess }: { onSuccess: (receipt: TransactionReceipt) => void },
) => {
  const { registerTransaction } = useTransactionRegistry()
  const {
    data: tx,
    isLoading: isWaitingForConfirmation,
    isSuccess: isTransactionSent,
    isError,
    error,
    writeAsync: sendApproveTx,
  } = useContractWrite({
    contractInterface: erc20ABI,
    addressOrName: token?.address,
    functionName: 'approve',
    args: [spender, amountToApprove],
    onSuccess: (tx) => {
      registerTransaction(tx, { type: 'approve', tokenSymbol: token.symbol })
    },
  })

  const { data: receipt, isLoading: isWaitingTransactionReceipt } = useWaitForTransaction({
    hash: tx?.hash,
    onSuccess,
  })

  return {
    isWaitingForConfirmation,
    isWaitingTransactionReceipt,
    isTransactionSent,
    isError,
    error,
    tx,
    receipt,
    sendApproveTx,
  }
}

export const useApprove = (
  token: Token,
  spender: string,
  amount: BigNumberish = MaxUint256.toString(),
) => {
  const { address, isConnecting } = useAccount()
  const allowance = useAllowance(token, spender, address)
  const approve = useContractApprove(token, spender, amount, {
    onSuccess: () => allowance.refetch(),
  })

  return { allowance, ...approve, isFetching: isConnecting || allowance.isLoading }
}
