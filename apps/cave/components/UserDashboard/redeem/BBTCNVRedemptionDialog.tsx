import { BoxProps } from '@concave/ui'

import { RedeemCard } from '../../UserDashboard/redeem/RedeemCard'
import { useRedeemBBTCNVCard } from '../../UserDashboard/redeem/useRedeemBBTCNVCard'

export const RedemBBTCard = (props: BoxProps) => {
  const redeemCardProps = useRedeemBBTCNVCard()

  return <RedeemCard {...redeemCardProps} {...props} />
}
