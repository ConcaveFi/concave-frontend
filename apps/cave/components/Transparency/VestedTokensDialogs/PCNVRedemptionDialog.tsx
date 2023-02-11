import { BoxProps, Modal } from '@concave/ui'

import { ModalType } from '../../UserDashboard/redeem/RedeemTokensCard'
import { RedeemCard } from '../../UserDashboard/redeem/RedeemCard'
import { useRedeemPCNVCard } from '../../UserDashboard/redeem/useRedeemPCNVCard'

export const PCNVRedemptionDialog: React.FC<ModalType> = (props) => {
  return (
    <>
      <Modal
        bluryOverlay
        title={`Redeem pCNV`}
        motionPreset="slideInBottom"
        isOpen={props.isOpen}
        onClose={props.onClose}
        preserveScrollBarGap
        isCentered
        bodyProps={{ p: 0 }}
      >
        <RedeemPCNVCard />
      </Modal>
    </>
  )
}

export const RedeemPCNVCard = (props: BoxProps) => {
  const redeemCardProps = useRedeemPCNVCard()
  return <RedeemCard {...redeemCardProps} {...props} />
}
