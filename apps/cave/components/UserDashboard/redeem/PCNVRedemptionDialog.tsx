import { BoxProps, Modal } from '@concave/ui'

import { RedeemCard } from '../../UserDashboard/redeem/RedeemCard'
import { useRedeemPCNVCard } from '../../UserDashboard/redeem/useRedeemPCNVCard'

export const RedeemPCNVCard = (props: BoxProps) => {
  const redeemCardProps = useRedeemPCNVCard()
  return <RedeemCard {...redeemCardProps} {...props} />
}
