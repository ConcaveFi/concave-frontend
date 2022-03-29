import { useMemo } from 'react'
import { erc20ABI, useContractRead } from 'wagmi'

export const useAllowance = (userAddress: string, contract: string) => {
  return useContractRead(
    { addressOrName: contract, contractInterface: erc20ABI },
    'allowance',
    useMemo(
      () => ({
        skip: !userAddress,
        args: [userAddress],
        overrides: { from: userAddress },
      }),
      [userAddress],
    ),
  )
}
