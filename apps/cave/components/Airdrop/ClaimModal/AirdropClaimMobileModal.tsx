import { CloseButton, Flex, Heading, HStack, Image, Modal, Text } from '@concave/ui'
import { useAirdrop } from 'contexts/AirdropContext'
import { AirdropClaimCard } from '../AirdropClaimCard'

export function AirdropClaimMobileModal() {
  const { isOpen, onClose } = useAirdrop()

  return (
    <AirdropModal onClose={onClose} isOpen={isOpen}>
      <AirdropClaimCard />
    </AirdropModal>
  )
}
function AirdropModal(props) {
  return (
    <Modal
      bodyProps={{
        borderGradient: '',
        align: 'center',
        shadow: 'up',
        p: 2,
        gap: 2,
        pb: 6
      }}
      motionPreset="slideInBottom"
      bluryOverlay
      isCentered
      title="Claim your airdrops!"
      {...props}
    >
      <Image
        src="./assets/airdrop/airdrops.png"
        alt="airdrop rain"
        maxW={'75%'}
      />
      {props.children}
    </Modal>
  )
}
