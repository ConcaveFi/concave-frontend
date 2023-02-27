import { BoxProps, Modal } from '@concave/ui'

import { RedeemCard } from './RedeemCard'
import { useRedeemACNVCard } from './useRedeemACNVCard'

export const RedemACNVCard = (props: BoxProps) => {
  const redeemCardProps = useRedeemACNVCard()
  return <RedeemCard {...redeemCardProps} {...props} />
}
