import { Flex, Modal } from '@concave/ui'
import { StakeData } from '../hooks/useLiquidStakeData'
import Emissions from './Emissions'

type StakeModalProps = { isOpen: boolean; onClose: VoidFunction; stakeData: StakeData }
export const StakeModal = ({ isOpen, onClose, stakeData }: StakeModalProps) => {
  const { baseEmissions, bondEmissions, poolId, totalVAPR } = stakeData || {}
  return (
    <Modal
      bluryOverlay={true}
      title="Stake CNV"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{
        roundedLeft: { base: '3xl', md: '8.75rem' },
        roundedRight: '3xl',
        p: { md: 6, base: 8 },
      }}
      titleAlign="center"
      size="2xl"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW={{ base: '310px', sm: '340px', md: 'full' }}
        gap={6}
      >
        <Emissions
          period={poolId}
          // vaprText={!isErrorVAPR ? vaprText : 'Error Loading vAPR'}
          totalVAPR={totalVAPR}
          icon={''}
          baseVAPR={baseEmissions}
          vapr={bondEmissions}
          //   onToggle={onToggleFloatingCards}
          //   onShow={onOpenFloatingCards}
          //   onDisable={onCloseFloatingCards}
          // setShowFloatingCards={setShowFloatingCards}
        />
        {/*
        <Modal
          preserveScrollBarGap
          isOpen={showFloatingCards && mobileUI}
          title="Informations"
          onClose={onCloseFloatingCards}
          motionPreset="slideInBottom"
          isCentered
          bluryOverlay
        >
          <Flex maxHeight={'800px'} mt="-10" mb={10}>
            <FloatingDescriptions />
          </Flex>
        </Modal>
        <VStack mt={{ base: 0, sm: 8 }} spacing={8}>
          <StakeInfo
            period={props.period}
            stakedCNV={
              pools?.balance ? Number(ethers.utils.formatEther(pools?.balance)).toFixed(0) : '0'
            }
            CNVCap={
              pools?.balance && stakingCap
                ? `${Number(
                    +ethers.utils.formatEther(pools?.balance) +
                      +ethers.utils.formatEther(stakingCap),
                  ).toFixed(0)}`
                : '0'
            }
            capPercentage={
              pools?.balance &&
              stakingCap &&
              (+ethers.utils.formatEther(pools?.balance) /
                (+ethers.utils.formatEther(stakingCap) +
                  +ethers.utils.formatEther(pools?.balance))) *
                100
            }
          />
          <StakeInput period={props.period} poolId={props.poolId} onClose={onClose} />
        </VStack> */}
      </Flex>
    </Modal>
  )
}
