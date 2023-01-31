import { CurrencyAmount, MaxUint256, Token } from '@concave/core'
import { StakingV1Contract } from '@concave/marketplace'
import { TransactionReceipt } from '@ethersproject/abstract-provider'
import { useErrorModal } from 'contexts/ErrorModal'
import { BigNumber, BigNumberish } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry/'
import { concaveProvider } from 'lib/providers'
import { useMemo } from 'react'
import {
  erc20ABI,
  erc721ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  useSigner,
  useWaitForTransaction,
  Address,
  usePrepareContractWrite,
} from 'wagmi'
import { useTransaction } from './TransactionsRegistry/useTransaction'
import { useCurrentSupportedNetworkId } from './useCurrentSupportedNetworkId'
import { usePermit } from './usePermit'

export const useAllowance = (token: Token, spender: Address, userAddress: Address) => {
  const {
    data: value,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useContractRead({
    address: token?.address,
    abi: erc20ABI,
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
  spender: Address,
  amountToApprove: BigNumberish = MaxUint256.toString(),
  { onSuccess }: { onSuccess: (receipt: TransactionReceipt) => void },
) => {
  const { registerTransaction } = useTransactionRegistry()
  const errorModal = useErrorModal()
  const { address } = useAccount()

  const { config } = usePrepareContractWrite({
    abi: erc20ABI,
    address: token?.address,
    functionName: 'approve',
    args: [spender, BigNumber.from(amountToApprove)],
  })

  const {
    data: tx,
    isLoading: isWaitingForConfirmation,
    isSuccess: isTransactionSent,
    isError,
    error,
    writeAsync: sendApproveTx,
    reset,
  } = useContractWrite({
    ...config,
    onMutate: () => {
      // if user doesn't sign nor reject in 45 seconds, reset state
      setTimeout(() => reset(), 45 * 1000)
    },
    onError: (e) => {
      if (e.name === 'UserRejectedRequestError') {
        reset()
        return
      }

      errorModal.onOpen(e, { spender, amountToApprove: amountToApprove.toString() })
      setTimeout(() => reset(), 4000)
    },
    onSuccess: (tx) => {
      registerTransaction(tx.hash, { type: 'approve', tokenSymbol: token.symbol })
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
  spender: Address,
  amount: BigNumberish = MaxUint256.toString(),
  { deadline }: { deadline: number },
) => {
  const { address, isConnecting } = useAccount()
  const allowance = useAllowance(token, spender, address)
  const approve = useContractApprove(token, spender, MaxUint256.toString(), {
    onSuccess: () => allowance.refetch(),
  })
  const permit = usePermit(
    CurrencyAmount.fromRawAmount(token, amount.toString()),
    spender,
    deadline,
  )
  return useMemo(
    () => ({ allowance, ...approve, permit, isFetching: isConnecting || allowance.isLoading }),
    [allowance, approve, isConnecting, permit],
  )
}

export const useApproveForAll = (props: {
  erc721: Address
  operator: Address
  approved: boolean
}) => {
  const account = useAccount()
  const owner = account.address
  const approve = useContractRead({
    address: props.erc721,
    abi: erc721ABI,
    functionName: 'isApprovedForAll',
    args: [owner, props.operator],
    enabled: !!(props?.erc721 && props.operator),
  })
  const { data: signer } = useSigner()
  const chainId = useCurrentSupportedNetworkId()

  const approveTx = useTransaction(
    () => {
      const contract = new StakingV1Contract(concaveProvider(chainId))
      return contract.setApprovalForAll(signer, props.operator, props.approved)
    },
    {
      onSuccess: (tx) => {
        approve.refetch()
      },
    },
  )

  return {
    isLoading: approve.isLoading || approve.isRefetching,
    isOK: !approve.isLoading && !!approve.data === props.approved,
    ...approveTx,
  }
}
