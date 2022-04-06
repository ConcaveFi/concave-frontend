import { formatUnits } from 'ethers/lib/utils'
import { TokenType } from 'lib/tokens'
import { useEffect, useMemo } from 'react'
import { erc20ABI, useContractWrite, useContractRead, useWaitForTransaction } from 'wagmi'
import { MaxUint256 } from '@ethersproject/constants'

export const useApprovalWhenNeeded = (
  token: TokenType,
  spender: string,
  userAddress: string,
  amount: string,
) => {
  const [allowanceTokenA, syncAllowance] = useAllowance(token, spender, userAddress)
  const [approvalTokenA, requestApprove] = useApproval(token, spender)

  const [approveAConfirmation] = useWaitForTransaction({ wait: approvalTokenA.data?.wait })
  useEffect(() => {
    if (approveAConfirmation.data) syncAllowance()
  }, [approveAConfirmation.data, syncAllowance])
  const formattedAllowance =
    allowanceTokenA.data && parseFloat(formatUnits(allowanceTokenA.data, token.decimals))
  const needsApprove: boolean = formattedAllowance < +amount
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

export const useApproval = (token: TokenType, spender: string) =>
  useContractWrite(
    { addressOrName: token.address, contractInterface: erc20ABI },
    'approve',
    { args: [spender, MaxUint256] }
  )

// export const useApproval = (token: TokenType, spender: string, amountToApprove: BigNumberish) =>
//   useContractWrite(
//     { addressOrName: token.address, contractInterface: erc20ABI },
//     'approve',
//     useMemo(
//       () => ({
//         skip: !token.address || !amountToApprove || !spender,
//         args: amountToApprove && [spender, parseUnits(amountToApprove.toString(), token.decimals)],
//       }),
//       [spender, token, amountToApprove],
//     ),
//   )