import {
  Modal,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Card } from '@concave/ui'
import { BigNumber } from 'ethers'
import { truncateNumber } from 'utils/truncateNumber'
import { StakeData } from '../hooks/useLiquidStakeData'
import Emissions from './Emissions'
import { FloatingDescriptions } from './FloatingDescriptions'
import StakeInfo from './StakeInfo'
import StakeInput from './StakeInput'

type StakeModalProps = {
  isOpen: boolean
  onClose: VoidFunction
  stakeData: StakeData
  stakeValues: { currentlyStaked: BigNumber; stakingCap: BigNumber; percent: number }
}
export const StakeModal = ({ isOpen, onClose, stakeData, stakeValues }: StakeModalProps) => {
  const { baseEmissions, bondEmissions, poolId, totalVAPR } = stakeData || {}
  const {
    isOpen: isDescritionsOpen,
    onOpen: onOpenDescriptions,
    onClose: onCloseDescription,
  } = useDisclosure()
  const type = useBreakpointValue<'modal' | 'card'>({ base: 'modal', xl: 'card' })

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
            type={type}
          />
          <Emissions
            onCloseDescription={onCloseDescription}
            onOpenDescription={onOpenDescriptions}
            totalVAPR={totalVAPR?.toFixed(2) + '%'}
            baseEmissions={baseEmissions?.toFixed(2) + '%'}
            bondEmissions={bondEmissions?.toFixed(2) + '%'}
            poolid={poolId}
          />
          <VStack gap={4} w="full" justify={'center'} align="center">
            <StakeInfo
              currentlyStaked={truncateNumber(stakeValues?.currentlyStaked || 0)}
              percent={stakeValues?.percent}
              poolId={stakeData?.poolId}
              stakingCap={truncateNumber(stakeValues?.stakingCap || 0)}
            />
            <StakeInput onClose={onClose} poolId={poolId} />
          </VStack>
        </Card>
      </ModalContent>
    </Modal>
  )
}
