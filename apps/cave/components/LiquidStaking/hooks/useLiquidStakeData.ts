import { useGet_All_Total_Pools_VaprQuery } from 'graphql/generated/graphql'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
export const useLiquidStakeData = () => {
  const {
    data: stakingV1,
    isLoading: isLoadingVAPR,
    isSuccess: isSuccessVAPR,
    isError: isErrorVAPR,
  } = useGet_All_Total_Pools_VaprQuery()
  const chainID = useCurrentSupportedNetworkId()
  const poolRewards = stakingV1?.logStakingV1_PoolRewarded

  const stakeData = poolRewards
    ?.map((t) => {
      const baseEmissions = stakingV1.rebaseStakingV1[0][`bondVaprPool${t.poolID}`] * 100
      const bondEmissions =
        stakingV1.logStakingV1_PoolRewarded.find((obj) => obj.poolID === t.poolID).base_vAPR * 100
      const totalVAPR = baseEmissions + bondEmissions
      return {
        poolId: t.poolID,
        baseEmissions,
        bondEmissions,
        totalVAPR,
      }
    })
    .sort((current, previus) => current.poolId - previus.poolId)

  return { stakeData }
}
export type StakeData = {
  poolId: number
  baseEmissions: number
  bondEmissions: number
  totalVAPR: number
}
