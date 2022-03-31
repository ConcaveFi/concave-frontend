import { BigNumberish } from 'ethers'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { ContractAddress } from 'lib/contractAddress'
import { TokenType } from 'lib/tokens'
import { useEffect, useMemo } from 'react'
import { erc20ABI, useContractWrite, useContractRead, chain, useWaitForTransaction } from 'wagmi'

export const useApprovalWhenNeeded = (
  token: TokenType,
  chainId = chain.ropsten.id,
  userAddress: string,
  amount: number,
) => {
  const [allowanceTokenA, syncAllowance] = useAllowance(
    token,
    ContractAddress[chainId],
    userAddress,
  )
  const [approvalTokenA, requestApprove] = useApproval(
    token,
    ContractAddress[chain.ropsten.id],
    amount,
  )

  const [approveAConfirmation] = useWaitForTransaction({ wait: approvalTokenA.data?.wait })
  useEffect(() => {
    if (approveAConfirmation.data) syncAllowance()
  }, [approveAConfirmation.data, syncAllowance])
  const formattedAllowance =
    allowanceTokenA.data && parseFloat(formatUnits(allowanceTokenA.data, token.decimals))
  const needsApprove: boolean = formattedAllowance < amount
  const isBusy = allowanceTokenA.loading || approvalTokenA.loading
  return [needsApprove, requestApprove, isBusy] as const
}

/**
 *
 * @param tokenAddress address of token
 * @param spender address of router
 * @param userAddress address of wallet
 * @returns
 */
export const useAllowance = (token: TokenType, spender: string, userAddress: string) => {
  return useContractRead(
    { addressOrName: token.address, contractInterface: erc20ABI },
    'allowance',
    useMemo(
      () => ({
        skip: !userAddress,
        // watch: true,
        args: [userAddress, spender],
        overrides: { from: userAddress },
      }),
      [spender, userAddress],
    ),
  )
}

export const useApproval = (token: TokenType, spender: string, amountToApprove: BigNumberish) =>
  useContractWrite({ addressOrName: token.address, contractInterface: erc20ABI }, 'approve', {
    args: [spender, parseUnits(amountToApprove.toString(), token.decimals)],
  })
