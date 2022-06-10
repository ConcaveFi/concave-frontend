import { NonFungibleTokenInfo } from '@concave/marketplace-sdk'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { formatFixed } from 'utils/formatFixed'

interface RedeemCardViewerProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
}

export const createRedeemState = ({ nonFungibleTokenInfo }: RedeemCardViewerProps) => {
  const { maturity, userReward } = nonFungibleTokenInfo
  const curValue = userReward.totalRewards
  const initialBal = userReward.amountDeposited
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
