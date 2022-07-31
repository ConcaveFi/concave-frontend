import { stakingPools } from '@concave/marketplace'
import { Flex, Image, Text } from '@concave/ui'
import { numberMask } from 'utils/numberMask'

interface StakeAprCardProps {
  poolId: number
  APR: number
}
const StakeAprCard = ({ APR, poolId }: StakeAprCardProps) => (
  <Flex direction={{ base: 'row', md: 'column', xl: 'row' }} align="center" justify={'center'}>
    <Info title="Stake pool" info={`${stakingPools[poolId].days} days`} />
    <Image my="-1" boxSize={'70px'} src={imageByStakepool[poolId]} alt={`stake-period-${length}`} />
    <Info title="APR" info={`${numberMask(APR)}%`} />
  </Flex>
)

type InfoProps = { title: string; info: string }
const Info = ({ info, title }: InfoProps) => (
  <Flex direction={'column'} flex={1} mt={0}>
    <Text fontSize="xs" color="text.low" fontWeight="medium">
      {title}
    </Text>
    <Text fontSize="s" color="white" fontWeight="bold">
      {info}
    </Text>
  </Flex>
)

const imageByStakepool = [
  '/assets/marketplace/12mposition.png',
  '/assets/marketplace/6mposition.png',
  '/assets/marketplace/3mposition.png',
  '/assets/marketplace/1mposition.png',
]
export default StakeAprCard
