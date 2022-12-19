import { BondAbi, BOND_ADDRESS } from '@concave/core'
import { getCurrentBlockTimestamp } from 'components/Bond/BondState'
import { Contract, utils } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as providers } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'

type BondPosition = {
  creationTimestamp: number
  creationDate: string
  length: number
  elapsed: number
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
    const termData = await bondingContract.term()

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
      let length = currentBlockTimestamp - positionData.creation
      let elapsed = length / termData > 1 ? 1 : length / termData

      totalPending += +(+utils.formatEther(positionData.redeemed))
      totalOwed += +(+utils.formatEther(positionData.owed))

      positionDataArray.push({
        creationTimestamp: creationTimestampMs,
        creationDate: new Date(creationTimestampMs).toLocaleDateString(),
        length: length,
        elapsed: elapsed,
        owed: +(+utils.formatEther(positionData.owed)).toFixed(4),
        redeemed: +(+utils.formatEther(positionData.redeemed)).toFixed(4),
      })
    }

    return {
      totalPending: totalPending.toLocaleString(undefined, { maximumFractionDigits: 4 }),
      totalOwed: totalOwed.toLocaleString(undefined, { maximumFractionDigits: 4 }),
      positions: positionDataArray,
    }
  })
}
