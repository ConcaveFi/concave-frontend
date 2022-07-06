import {
  Modal,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Card } from '@concave/ui'
import { BigNumber, utils } from 'ethers'
import { numberMask } from 'utils/numberMask'
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
            poolId={poolId}
            {...stakeData}
          />
          <VStack gap={4} w="full" justify={'center'} align="center">
            <StakeInfo
              poolRewards={stakeData}
              currentlyStaked={numberMask(+utils.formatEther(stakeValues?.currentlyStaked || 0))}
              percent={stakeValues?.percent}
              poolId={stakeData?.poolId}
              stakingCap={numberMask(+utils.formatEther(stakeValues?.stakingCap || 0))}
            />
            <StakeInput onClose={onClose} poolId={poolId} poolRewards={stakeData} />
          </VStack>
        </Card>
      </ModalContent>
    </Modal>
  )
}
