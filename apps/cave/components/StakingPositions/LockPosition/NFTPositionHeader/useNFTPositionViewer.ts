import { StakingPosition } from '@concave/marketplace'
import { formatDistanceToNow } from 'date-fns'

export interface NFTPositionHeaderProps {
  stakingPosition: StakingPosition
  active: boolean
  toogleActive: VoidFunction
}

export const useNFTLockedPositionState = ({
  stakingPosition,
  active,
  toogleActive,
}: NFTPositionHeaderProps) => {
  const { poolID, maturity, tokenId } = stakingPosition
  const redeemInDays = !maturity || formatDistanceToNow(maturity * 1000).replace('about', '')

  const period = {
    0: '360 Days',
    1: '180 Days',
    2: '90 Days',
    3: '45 Days',
  }[poolID]

  const imgNameByPeriod = {
    0: '12mposition.png',
    1: '6mposition.png',
    2: '3mposition.png',
    3: '1mposition.png',
  }[poolID]

  const redeemDate = new Date(maturity * 1000)

  return {
    tokenId,
    period,
    redeemDate,
    imgNameByPeriod,
    redeemInDays,
    active,
    toogleActive,
  }
}

function getUnit(time: number): 'hour' | 'minute' | 'day' {
  // 86400000 = 24 hours in miliseconds
  // 3600000 = 1 hours in miliseconds
  if (time < 86400000) return 'hour'
  if (time < 3600000) return 'minute'
  return 'day'
}
