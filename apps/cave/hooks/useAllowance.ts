import { useMemo } from 'react'
import { contractABI } from 'lib/contractoABI'
import { erc20ABI, useContractRead } from 'wagmi'

export const useAllowance = (userAddress: string, contract: string, term: string) => {
  return useContractRead(
    { addressOrName: contract, contractInterface: contractABI },
    term,
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
