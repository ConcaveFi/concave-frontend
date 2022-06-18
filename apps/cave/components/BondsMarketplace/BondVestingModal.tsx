import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { BondMarketplacePosition } from './BondMarketplacePosition'
import { BondVesting } from './BondVesting'

export const BondVestingModal = () => {
  const { isOpen, onClose } = useDisclosure()
  return (
    <Modal motionPreset="slideInBottom" isOpen={true} onClose={onClose} isCentered>
      <ModalOverlay backdropBlur={'8px'} />
      <ModalContent>
        <BondMarketplacePosition variant="primary" />
        <BondVesting mt={'-80px'} />
      </ModalContent>
    </Modal>
  )
}
