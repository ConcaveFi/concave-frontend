import { Flex, Image, Text, useBreakpointValue } from '@concave/ui'
import { POOL_ID_TO_DAYS } from 'utils/contants'
import { StakeInformations } from './StakeInformations'

type EmissionsProps = {
  baseEmissions: string
  bondEmissions: string
  totalVAPR: string
  poolid: number
  onOpenDescription: VoidFunction
  onCloseDescription: VoidFunction
}

function Emissions({
  baseEmissions,
  bondEmissions,
  poolid,
  totalVAPR,
  onCloseDescription,
  onOpenDescription,
}: EmissionsProps) {
  const mobileUI = useBreakpointValue({ base: true, md: false })
  return (
    <Flex direction={{ base: 'row', md: 'column' }}>
      <Flex
        mx="auto"
        pt={5}
        pb={3}
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
        <Info info={POOL_ID_TO_DAYS[poolid] + ' days'} title="Stake period" />
        <Image
          mx="auto"
          src={`/assets/liquidstaking/${POOL_ID_TO_DAYS[poolid]}d-logo.svg`}
          alt="stake period logo"
        />
        <Info title="Total vAPR" info={totalVAPR} />
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
          <StakeInformations
            onDisable={onCloseDescription}
            onShow={onOpenDescription}
            bondingEmissions={bondEmissions}
            baseEmissions={baseEmissions}
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
        <StakeInformations
          onDisable={onCloseDescription}
          onShow={onOpenDescription}
          bondingEmissions={bondEmissions}
          baseEmissions={baseEmissions}
        />
      )}
    </Flex>
  )
}

type InfoProps = { title: string; info: string }
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

export default Emissions
