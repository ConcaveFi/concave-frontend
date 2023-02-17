import { BoxProps, Modal } from '@concave/ui'

import { RedeemCard } from './RedeemCard'
import { useRedeemACNVCard } from './useRedeemACNVCard'

export const ACNVRedemptionDialog: React.FC<{ onClose: VoidFunction; isOpen: boolean }> = (
  props,
) => {
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
