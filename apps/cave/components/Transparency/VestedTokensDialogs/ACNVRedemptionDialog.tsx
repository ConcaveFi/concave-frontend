import { BoxProps, Modal } from '@concave/ui'

import { ModalType } from '../../UserDashboard/redeem/RedeemTokensCard'
import { RedeemCard } from '../../UserDashboard/redeem/RedeemCard'
import { useRedeemACNVCard } from '../../UserDashboard/redeem/useRedeemACNVCard'

export const ACNVRedemptionDialog: React.FC<ModalType> = (props) => {
  return (
    <>
      <Modal
        bluryOverlay
        title={`Redeem ACNV`}
        motionPreset="slideInBottom"
        isOpen={props.isOpen}
        onClose={props.onClose}
        preserveScrollBarGap
        isCentered
        bodyProps={{ p: 0 }}
      >
        <RedemACNVCard />
      </Modal>
    </>
  )
}

export const RedemACNVCard = (props: BoxProps) => {
  const redeemCardProps = useRedeemACNVCard()
  return <RedeemCard {...redeemCardProps} {...props} />
}
