import { BoxProps, Modal } from '@concave/ui'

import { RedeemCard } from '../../UserDashboard/redeem/RedeemCard'
import { useRedeemBBTCNVCard } from '../../UserDashboard/redeem/useRedeemBBTCNVCard'

export const BBTCNVRedemptionDialog: React.FC<{ onClose: VoidFunction; isOpen: boolean }> = (
  props,
) => {
  return (
    <>
      <Modal
        bluryOverlay
        title={`Redeem bbtCNV`}
        motionPreset="slideInBottom"
        isOpen={props.isOpen}
        onClose={props.onClose}
        preserveScrollBarGap
        isCentered
        bodyProps={{ p: 0 }}
      >
        <RedemBBTCard />
      </Modal>
    </>
  )
}

export const RedemBBTCard = (props: BoxProps) => {
  const redeemCardProps = useRedeemBBTCNVCard()
  return <RedeemCard {...redeemCardProps} {...props} />
}