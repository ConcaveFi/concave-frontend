import { Modal } from '@concave/ui'

import { ModalType } from '../../UserDashboard/redeem/RedeemTokensCard'
import { RedeemCard } from '../../UserDashboard/redeem/RedeemCard'
import { useRedeemBBTCard } from '../../UserDashboard/redeem/useRedeemBBTCard'

export const BBTCNVRedemptionDialog: React.FC<ModalType> = (props) => {
  const redeemCardProps = useRedeemBBTCard()
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
