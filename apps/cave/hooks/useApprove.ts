import { BigNumber, BigNumberish, Contract } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { CurrencyAmount, Token, MaxUint256 } from '@concave/core'
import { erc20ABI, useAccount, useSigner } from 'wagmi'
import { useQuery } from 'react-query'
import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider'
import { concaveProvider } from 'lib/providers'

export const useAllowance = (token: Token, spender: string, userAddress: string) => {
  const {
    data: value,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery<BigNumber>(
    ['allowance', token?.address, userAddress],
    async () => {
      const tokenContract = new Contract(token.address, erc20ABI, concaveProvider(token.chainId))
      return await tokenContract.allowance(userAddress, spender)
    },
    {
      enabled: !!token?.address && !!userAddress && !!spender,
      retry: false,
    },
  )

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
  const { data: signer } = useSigner()
  const {
    data: tx,
    isLoading: isWaitingForConfirmation,
    isSuccess: isTransactionSent,
    isError,
    error,
    refetch: sendApproveTx,
  } = useQuery<TransactionResponse>(
    ['approve', token?.address, spender],
    async () => {
      const tokenContract = new Contract(token.address, erc20ABI, signer)
      return await tokenContract.approve(spender, amountToApprove)
    },
    { enabled: false, retry: false },
  )
  const { data: receipt, isLoading: isWaitingTransactionReceipt } = useQuery<TransactionReceipt>(
    ['receipt', tx?.hash],
    () => tx.wait(1),
    { enabled: !!tx, onSuccess },
  )

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
