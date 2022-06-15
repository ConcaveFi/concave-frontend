import { StakingPosition } from '@concave/marketplace'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { formatFixed } from 'utils/formatFixed'

interface RedeemCardViewerProps {
  stakingPosition: StakingPosition
}

export const createRedeemState = ({ stakingPosition }: RedeemCardViewerProps) => {
  const { maturity } = stakingPosition
  const curValue = stakingPosition.currentValue
  const initialBal = stakingPosition.initialValue
  const gainedAmt = curValue.sub(initialBal)

  return {
    maturity,
    curValue,
    initialBal,
    gainedAmt,
  }
}

export const bigNumberMask = (number: BigNumber) => {
  if (number.eq(0)) {
    return `0`
  }
  if (+formatEther(number) < 0.01) {
    return `<.01`
  }
  return formatFixed(number)
}
