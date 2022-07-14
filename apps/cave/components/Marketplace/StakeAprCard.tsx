<<<<<<< HEAD
import { Flex, Image, Text, useBreakpointValue } from '@concave/ui'
=======
import { Flex, Image, Text } from '@concave/ui'
>>>>>>> 487c38971d9fa0eb17e5b5902f30c56b7cd08383

interface StakeAprCardProps {
  poolId: number
  diluted: boolean
  vAPR?: string | number
}
export const StakeAprCard = (props: StakeAprCardProps) => {
  const isLargerLayout = useBreakpointValue({ xl: true, base: true, md: false })
  return isLargerLayout ? <DefaultLayout props={props} /> : <MobileLayout props={props} />
}

const MobileLayout = ({ props }: { props: StakeAprCardProps }) => {
  const { diluted, poolId, vAPR } = props

  return (
    <Flex
      direction={'column'}
      align="center"
      justify={'center'}
      flex={1}
      height="170px"
      position="relative"
    >
      <Text fontSize="xs" color="text.low" fontWeight="medium">
        Stake Pool
      </Text>
      <Text fontSize="s" color="white" fontWeight="bold">
        {/* {vAPR} */}
      </Text>
      <Flex position={'relative'} height="40px" width={'full'} align="center">
        <Flex position={'absolute'} width="full">
          <Image
            h="70px"
            w="70px"
            src={stakeImage[poolId]}
            alt={`stake-period-${length}`}
            mx="auto"
          />
        </Flex>
      </Flex>
      <Text fontSize="xs" color="text.low" fontWeight="medium">
        {!diluted && 'v'}APR
      </Text>

      <Text fontSize="s" color="white" fontWeight="bold">
        {'text'}
      </Text>
    </Flex>
  )
}

const DefaultLayout = ({ props }: { props: StakeAprCardProps }) => {
  const { poolId, diluted, vAPR } = props
  return (
    <Flex width={'full'} direction={'column'}>
      <Flex align={'center'}>
        <Flex direction={'column'} flex={1}>
          <Text fontSize="xs" color="text.low" fontWeight="medium">
            Stake Pool
          </Text>
          <Text fontSize="s" color="white" fontWeight="bold">
            {stakePeriod[poolId] + ' days'}
          </Text>
        </Flex>
        <Image h="65px" w="65px" src={stakeImage[poolId]} alt={`stake-period-${length}`} />
        <Flex direction={'column'} flex={1}>
          <Text fontSize="xs" color="text.low" fontWeight="medium">
            vAPR
          </Text>
          <Text fontSize="s" color="white" fontWeight="bold">
            {(+vAPR * 100).toFixed(2) + '%'}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

//TODO: there are 3 locations with same logic, merge it
const stakeImage = {
  0: '/assets/marketplace/12mposition.png',
  1: '/assets/marketplace/6mposition.png',
  2: '/assets/marketplace/3mposition.png',
  3: '/assets/marketplace/1mposition.png',
}

const stakePeriod = {
  0: 360,
  1: 180,
  2: 90,
  3: 45,
}
