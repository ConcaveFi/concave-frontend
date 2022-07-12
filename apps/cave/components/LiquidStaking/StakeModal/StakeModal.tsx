import {
  Modal,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Card } from '@concave/ui'
import { StakeData } from '../hooks/useLiquidStakeData'
import { Emissions } from './Emissions'
import { FloatingDescriptions } from './FloatingDescriptions'
import { StakeInfo } from './StakeInfo'
import { StakeInput } from './StakeInput'

type StakeModalProps = {
  isOpen: boolean
  onClose: VoidFunction
  stakeData: StakeData
  loadBar: JSX.Element
}
export const StakeModal = ({ isOpen, onClose, stakeData, loadBar }: StakeModalProps) => {
  const { poolId } = stakeData || {}
  const {
    isOpen: isDescritionsOpen,
    onOpen: onOpenDescriptions,
    onClose: onCloseDescription,
  } = useDisclosure()
  const descriptionType = useBreakpointValue<'modal' | 'card'>({ base: 'modal', xl: 'card' })
  const informationType = { modal: 'click', card: 'hover' } as const
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay backdropFilter={'blur(15px)'} />
      <ModalContent width={{ base: '340px', md: '650px' }} flexDirection="row">
        <Card
          direction={{ base: 'column', md: 'row' }}
          maxW={{ base: '340px', md: 'full' }}
          variant="primary"
          roundedLeft={{ base: '3xl', md: '8.75rem' }}
          roundedRight="3xl"
          overflow="visible"
          p={6}
          gap={4}
        >
          <FloatingDescriptions
            onClose={onCloseDescription}
            isOpen={isDescritionsOpen}
            type={descriptionType}
          />
          <Emissions
            onCloseDescription={onCloseDescription}
            onOpenDescription={onOpenDescriptions}
            poolId={poolId}
            stakeInformationType={informationType[descriptionType]}
            {...stakeData}
          />
          <VStack gap={4} w="full" justify={'center'} align="center">
            <StakeInfo stakingPool={stakeData} loadBar={loadBar} />
            <StakeInput onClose={onClose} poolId={poolId} stakingPool={stakeData} />
          </VStack>
        </Card>
      </ModalContent>
    </Modal>
  )
}
