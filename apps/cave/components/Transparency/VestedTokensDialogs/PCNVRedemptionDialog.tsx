import { Modal } from '@concave/ui'

import { ModalType } from '../../UserDashboard/redeem/RedeemTokensCard'
import { RedeemCard } from '../../UserDashboard/redeem/RedeemCard'
import { useRedeemPCNVCard } from '../../UserDashboard/redeem/useRedeemPCNVCard'

export const PCNVRedemptionDialog: React.FC<ModalType> = (props) => {
  const redeemCardProps = useRedeemPCNVCard()
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
