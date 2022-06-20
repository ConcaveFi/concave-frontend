import { Flex, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { BondMarketplacePosition } from './BondMarketplacePosition'
import { BondPreferredCard } from './BondPreferredCard'
import { BondVesting } from './BondVesting'

export const BondVestingModal = () => {
  const { isOpen, onClose } = useDisclosure()

  return (
    <Modal size={'5xl'} motionPreset="slideInBottom" isOpen={true} onClose={onClose} isCentered>
      <ModalOverlay backdropBlur={'20px'} />
      <ModalContent flexDirection={'row'} m="auto">
        <Flex direction={'column'} maxW="1200px">
          <BondMarketplacePosition variant="primary" />
          <BondVesting mt={'-60px'} />
        </Flex>
        <BondPreferredCard />
      </ModalContent>
    </Modal>
  )
}
