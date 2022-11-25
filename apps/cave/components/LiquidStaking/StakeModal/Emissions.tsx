import { stakingPools } from '@concave/marketplace'
import { Flex, Image, Text, useBreakpointValue } from '@concave/ui'
import { StakeData } from '../hooks/useLiquidStakeData'
import { StakeInformation } from './StakeInformation'

type EmissionsProps = {
  status: 'loading' | 'error' | 'idle' | 'success'
  poolId: number
  onOpenDescription: VoidFunction
  onCloseDescription: VoidFunction
  stakeInformationType: 'hover' | 'click'
} & StakeData

export function Emissions({
  poolId,
  status,
  onCloseDescription,
  onOpenDescription,
  stakeInformationType,
  ...stakeData
}: EmissionsProps) {
  const mobileUI = useBreakpointValue({ base: true, md: false })
  return (
    <Flex direction={{ base: 'row', md: 'column' }}>
      <Flex
        mx="auto"
        p={4}
        w="240px"
        h="full"
        maxW={mobileUI && '120px'}
        shadow="down"
        borderRadius={'full'}
        textAlign="center"
        align={'center'}
        justify="center"
        direction={'column'}
      >
        <Info info={stakingPools[poolId].days + ' days'} title="Stake period" />
        <Image
          mx="auto"
          src={`/assets/liquidstaking/${stakingPools[poolId].days}d-logo.png`}
          alt="stake period logo"
        />
        <Info
          title="Total vAPR"
          info={
            {
              loading: 'loading',
              error: 'error fetching',
              success: stakeData?.totalVAPR?.toFixed(2) + '%',
            }[status]
          }
        />
        <Image
          mx="auto"
          src={`/assets/liquidstaking/modal-moreinfo-logo.svg`}
          alt="more info logo"
          mt={2}
        />
        <Image
          display={{ base: 'none', md: 'flex' }}
          src={`/assets/liquidstaking/modal-arrow-logo.svg`}
          alt="arrow down logo"
        />
        {!mobileUI && (
          <StakeInformation
            status={status}
            type={stakeInformationType}
            onDisable={onCloseDescription}
            onShow={onOpenDescription}
            bondingEmissions={stakeData?.bondEmissions}
            baseEmissions={stakeData?.baseEmissions}
          />
        )}
      </Flex>

      <Image
        display={{ base: 'block', md: 'none' }}
        src={`/assets/liquidstaking/modal-arrow-logo.svg`}
        width="60px"
        mr={'-6px'}
        alt="arrow down logo"
        transform={'rotate(-90deg)'}
      />
      {mobileUI && (
        <StakeInformation
          status={status}
          type={stakeInformationType}
          onDisable={onCloseDescription}
          onShow={onOpenDescription}
          bondingEmissions={stakeData.bondEmissions}
          baseEmissions={stakeData.baseEmissions}
        />
      )}
    </Flex>
  )
}

type InfoProps = { title: string; info: string | number }
const Info = ({ title, info }: InfoProps) => (
  <>
    <Text color="text.low" fontSize="sm">
      {title}
    </Text>
    <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold">
      {info}
    </Text>
  </>
)
