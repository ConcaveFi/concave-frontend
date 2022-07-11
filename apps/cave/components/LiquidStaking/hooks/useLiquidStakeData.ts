import { StakingPool, stakingPools } from '@concave/marketplace'
import { useGet_All_Total_Pools_VaprQuery } from 'graphql/generated/graphql'

export const useLiquidStakeData = () => {
  const { data: stakingV1, isLoading } = useGet_All_Total_Pools_VaprQuery()
  const poolRewards = stakingV1?.logStakingV1_PoolRewarded
  const stakeData = poolRewards
    ?.map((poolReward) => {
      const baseEmissions = stakingV1.rebaseStakingV1[0][`bondVaprPool${poolReward.poolID}`] * 100
      const bondEmissions =
        stakingV1.logStakingV1_PoolRewarded.find((obj) => obj.poolID === poolReward.poolID)
          .base_vAPR * 100
      const totalVAPR = baseEmissions + bondEmissions
      return {
        poolId: poolReward.poolID,
        baseEmissions,
        bondEmissions,
        totalVAPR,
        ...stakingPools[+(poolReward.poolID || 0)],
      } as const
    })
    .sort((current, previus) => current.poolId - previus.poolId)

  return { stakeData, isLoading }
}
export type StakeData = {
  poolId: number
  baseEmissions: number
  bondEmissions: number
  totalVAPR: number
} & StakingPool
