import { StakingPosition } from '@concave/marketplace'
import { formatDistanceToNow } from 'date-fns'
import { poolImages } from 'utils/poolImages'

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
    0: '360 days',
    1: '180 days',
    2: '90 days',
    3: '45 days',
  }[poolID]

  const imgNameByPeriod = poolImages[poolID]

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
