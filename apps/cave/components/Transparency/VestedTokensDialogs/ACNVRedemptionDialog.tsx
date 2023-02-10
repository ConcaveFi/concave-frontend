import { Modal } from '@concave/ui'

import { ModalType } from '../../UserDashboard/redeem/RedeemTokensCard'
import { RedeemCard } from '../../UserDashboard/redeem/RedeemCard'
import { useRedeemACNVCard } from '../../UserDashboard/redeem/useRedeemACNVCard'

export const ACNVRedemptionDialog: React.FC<ModalType> = (props) => {
  const redeemCardProps = useRedeemACNVCard()
  return (
    <>
      <Modal
        bluryOverlay
        title={`Redeem ${redeemCardProps.redeemFields.amountOut.currency.symbol}`}
        motionPreset="slideInBottom"
        isOpen={props.isOpen}
        onClose={props.onClose}
        preserveScrollBarGap
        isCentered
        bodyProps={{ p: 0 }}
      >
        <RedeemCard {...redeemCardProps} />
      </Modal>
    </>
  )
}
