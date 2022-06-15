import { BigNumber, BigNumberish, Contract } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { CurrencyAmount, Token, MaxUint256 } from '@concave/core'
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { TransactionReceipt } from '@ethersproject/abstract-provider'
import { useTransactionRegistry } from './useTransactionRegistry'

export const useAllowance = (token: Token, spender: string, userAddress: string) => {
  const {
    data: value,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useContractRead({ addressOrName: token.address, contractInterface: erc20ABI }, 'allowance', {
    args: [userAddress, spender],
    chainId: token.chainId,
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
  } = useContractWrite({ contractInterface: erc20ABI, addressOrName: token.address }, 'approve', {
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
  const { data: account, isLoading } = useAccount()
  const allowance = useAllowance(token, spender, account?.address)
  const approve = useContractApprove(token, spender, amount, {
    onSuccess: () => allowance.refetch(),
  })

  return { allowance, ...approve, isFeching: isLoading || allowance.isLoading }
}
