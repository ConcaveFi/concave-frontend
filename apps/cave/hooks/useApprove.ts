import { BigNumber, BigNumberish, Contract } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { Token } from 'gemswap-sdk'
import { erc20ABI, useAccount, useProvider, useSigner } from 'wagmi'
import { MaxUint256 } from 'gemswap-sdk'
import { useQuery } from 'react-query'
import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider'
import { AVERAGE_BLOCK_TIME } from 'constants/blockchain'

export const useAllowance = (token: Token, spender: string, userAddress: string) => {
  const provider = useProvider()
  const {
    data: value,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery<BigNumber>(
    ['allowance', token?.address, userAddress],
    async () => {
      const tokenContract = new Contract(token.address, erc20ABI, provider)
      return await tokenContract.allowance(userAddress, spender)
    },
    {
      enabled: !!token.address && !!userAddress,
      retry: 3,
      refetchInterval: AVERAGE_BLOCK_TIME[token.chainId],
    },
  )

  return {
    isError,
    isLoading,
    isSuccess,
    value,
    formatted: value && formatUnits(value, token?.decimals),
    refetch,
  }
}

export const useContractApprove = (
  token: Token,
  spender: string,
  amountToApprove: BigNumberish = MaxUint256.toString(),
  { onSuccess }: { onSuccess: (recipt: TransactionReceipt) => void },
) => {
  const [{ data: signer }] = useSigner()
  const {
    data: tx,
    isLoading: isWaitingForConfirmation,
    isSuccess: isTransactionSent,
    refetch: sendApproveTx,
  } = useQuery<TransactionResponse>(
    ['approve', token?.address, spender],
    async () => {
      const tokenContract = new Contract(token.address, erc20ABI, signer)
      return await tokenContract.approve(spender, amountToApprove)
    },
    { enabled: false },
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
  const [{ data: account }] = useAccount()
  const allowance = useAllowance(token, spender, account?.address)
  const approve = useContractApprove(token, spender, amount, {
    onSuccess: () => allowance.refetch(),
  })

  return { allowance, ...approve }
}
