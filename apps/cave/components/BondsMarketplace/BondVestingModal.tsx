import { Flex, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { CNV, DAI } from '@concave/core'
import { CandleStickCard } from 'components/AMM'
import { TokenInfoCard } from 'components/TokenInfoCard'
import { BondMarketplacePosition } from './BondMarketplacePosition'
import { BondPreferredCard } from './BondPreferredCard'
import { BondVesting } from './BondVesting'

export const BondVestingModal = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  return (
    <Modal size={'5xl'} motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropBlur={'20px'} />
      <ModalContent flexDirection={'row'} m="auto" gap={'16'} justifyContent="center">
        <Flex direction={'column'} maxW="1200px">
          <BondMarketplacePosition variant="primary" />
          <BondVesting mt={'-60px'} />
        </Flex>
        <Flex direction={'column'} gap={16}>
          <CandleStickCard from={DAI[1]} to={CNV[1]} />
          <TokenInfoCard />
        </Flex>

        {/* <BondPreferredCard /> */}
      </ModalContent>
    </Modal>
  )
}
