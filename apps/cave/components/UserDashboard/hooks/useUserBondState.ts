import { BondAbi, BOND_ADDRESS, ChainId, Percent } from '@concave/core'
import { getCurrentBlockTimestamp } from 'components/Bond/BondState'
import { BigNumber, Contract, utils } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as providers } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

export type BondPosition = {
  owed: BigNumber;
  redeemed: BigNumber;
  elapsed: Percent;
  elapsedTimestamp: number,
  creation: number;
  creationTimestamp: number;
  redeemTimestamp: number;
  redeemDate: number;
  creationDate: string;
  claimable: BigNumber,
  bonding: BigNumber,
  isClaimable: boolean,
}

type PositionType = { owed: BigNumber, redeemed: BigNumber, creation: BigNumber }
export const useUserBondState = () => {
  const { address } = useAccount()
  const chainId = useCurrentSupportedNetworkId()

  return useQuery(['userBondState', address, chainId], async () => {
    const currentBlockTime = await getCurrentBlockTimestamp(chainId)
    const bondingContract = new Contract(BOND_ADDRESS[chainId], BondAbi, providers(chainId))
    const getUserPositionsLength = await bondingContract.getUserPositionCount(address) as BigNumber
    const termData: BigNumber = await bondingContract.term()
    const positions = await Promise.all(new Array(getUserPositionsLength.toNumber()).fill(null).map(async (_, i) => {
      const { owed, redeemed, creation }: PositionType = await bondingContract.positions(address, i)
      const elapsedTime = currentBlockTime - creation.toNumber()
      const elapsed = new Percent(elapsedTime, termData.toNumber())
      const isClaimable = elapsedTime > termData.toNumber()

      const claimable = isClaimable ? owed.sub(redeemed) : BigNumber.from(0)
      const bonding = isClaimable ? BigNumber.from(0) : owed
      const creationTimestamp = creation.mul(1000).toNumber()
      const redeemTimestamp = termData.mul(1000).add(creationTimestamp).toNumber()
      return {
        owed,
        redeemed,
        elapsed,
        elapsedTimestamp: elapsedTime,
        claimable,
        isClaimable,
        bonding,
        creation: creation.toNumber(),
        creationTimestamp,
        creationDate: new Date(creationTimestamp).toLocaleDateString(),
        redeemTimestamp,
        redeemDate: new Date(redeemTimestamp).toLocaleDateString(),
      }
    }))
    return positions.reduce((prev, current) => {
      return {
        owed: prev.owed.add(current.owed),
        bonding: prev.bonding.add(current.bonding),
        redeemed: prev.redeemed.add(current.redeemed),
        claimable: prev.claimable.add(current.claimable),
        positions: [...prev.positions, current] as BondPosition[]
      }
    }, {
      bonding: BigNumber.from(0),
      claimable: BigNumber.from(0),
      redeemed: BigNumber.from(0),
      owed: BigNumber.from(0),
      positions: []
    })
  })
}

export type UseUserBondState = ReturnType<typeof useUserBondState>