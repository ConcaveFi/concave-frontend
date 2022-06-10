import { NonFungibleTokenInfo } from '@concave/marketplace-sdk'
import { formatDistanceToNowStrict, format } from 'date-fns'

export interface NFTPositionHeaderProps {
  nonFungibleTokenInfo: NonFungibleTokenInfo
  active: boolean
  toogleActive: VoidFunction
}

export const useNFTLockedPositionState = ({
  nonFungibleTokenInfo,
  active,
  toogleActive,
}: NFTPositionHeaderProps) => {
  const { poolID, maturity, tokenId } = nonFungibleTokenInfo
  const redeemInDays = formatDistanceToNowStrict(maturity * 1000, { unit: 'day' })
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
