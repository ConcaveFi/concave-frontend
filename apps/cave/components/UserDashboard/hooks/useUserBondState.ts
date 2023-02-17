import { BondAbi, BOND_ADDRESS, Percent } from '@concave/core'
import { getCurrentBlockTimestamp } from 'components/Bond/BondState'
import { BigNumber, Contract, utils } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as providers } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

export type BondPosition = {
  creationTimestamp: number
  creationDate: string
  elapsed: Percent
  owed: number
  redeemed: number
}
export const useUserBondState = () => {
  const { address } = useAccount()
  const networkId = useCurrentSupportedNetworkId()

  return useQuery('userBondState', async () => {
    const currentBlockTimestamp = await getCurrentBlockTimestamp(networkId)

    const bondingContract = new Contract(BOND_ADDRESS[networkId], BondAbi, providers(networkId))
    const getUserPositionsLength = await bondingContract.getUserPositionCount(address)
    const termData: BigNumber = await bondingContract.term()

    let oldest = 0
    let oldestCreationTimestamp = 0

    let totalPending = 0
    let totalOwed = 0
    let positionDataArray: BondPosition[] = []

    for (let i = 0; i < +getUserPositionsLength; i++) {
      const positionData = await bondingContract.positions(address, i)
      if (i === getUserPositionsLength - 1) {
        oldest += +positionData.creation
        oldestCreationTimestamp += +positionData.creation
      }

      const creationTimestampMs = +positionData.creation * 1000
      const length = currentBlockTimestamp - positionData.creation
      totalPending += +(+utils.formatEther(positionData.redeemed))
      totalOwed += +(+utils.formatEther(positionData.owed))

      positionDataArray.push({
        creationTimestamp: creationTimestampMs,
        creationDate: new Date(creationTimestampMs).toLocaleDateString(),
        elapsed: new Percent(length, termData.toNumber()),
        owed: +(+utils.formatEther(positionData.owed)).toFixed(4),
        redeemed: +(+utils.formatEther(positionData.redeemed)).toFixed(4),
      })
    }

    return {
      totalPending: totalPending.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      totalOwed: totalOwed.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      positions: positionDataArray,
    }
  })
}
