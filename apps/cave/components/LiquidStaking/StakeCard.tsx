import { Box, Button, Flex, Image, Stack, Text, TextProps, useDisclosure } from '@chakra-ui/react'
import { Card } from '@concave/ui'
import { utils } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { poolIdToDays } from 'utils/contants'
import { truncateNumber } from 'utils/truncateNumber'
import { useAccount } from 'wagmi'
import { StakeData } from './hooks/useLiquidStakeData'
import { useLiquidValues } from './hooks/useLiquidValues'
import { StakeModal } from './StakeModal/StakeModal'

type StakeCardProps = { stakeData: StakeData }
export const StakeCard = (props: StakeCardProps) => {
  const chainId = useCurrentSupportedNetworkId()
  const { poolId, totalVAPR } = props.stakeData
  const { address } = useAccount()

  const { data, isLoading } = useLiquidValues(chainId, poolId)
  const { stakingV1Pools, stakingV1Cap } = data || {}
  const { isOpen, onOpen, onClose } = useDisclosure()
  const percent =
    (+utils.formatEther(stakingV1Pools?.balance || 0) / +utils.formatEther(stakingV1Cap || 0)) * 100

  return (
    <>
      <Card
        variant="primary"
        p={[6, 4]}
        maxW={{ base: '160px', md: '200px' }}
        fontWeight={'bold'}
        align="center"
      >
        <ImageContainer poolId={poolId} totalVAPR={totalVAPR?.toFixed(2) + '%'} />
        <LoadBard
          percent={percent}
          loading={isLoading}
          currentlyStaked={truncateNumber(stakingV1Pools?.balance || 0, 1)}
          stakingCap={truncateNumber(stakingV1Pools?.balance?.add(stakingV1Cap) || 0, 1)}
        />
        <Button
          mt={4}
          onClick={onOpen}
          fontSize="md"
          variant="primary"
          w="92.5%"
          h="40px"
          disabled={!address}
        >
          Stake
        </Button>
      </Card>
      <StakeModal
        stakeValues={{
          currentlyStaked: stakingV1Pools?.balance,
          percent,
          stakingCap: stakingV1Cap,
        }}
        isOpen={isOpen}
        onClose={onClose}
        stakeData={props.stakeData}
      />
    </>
  )
}

type ImageContainerProps = { poolId: number; totalVAPR: string }
const ImageContainer: React.FC<ImageContainerProps> = ({ poolId, totalVAPR }) => (
  <Box py={5} h={{ base: '290px', md: '333px' }} shadow="down" borderRadius="100px/90px">
    <Info title="StakePool" label={poolIdToDays[poolId] + ' days'} textAlign="center" />
    <Image
      userSelect={'none'}
      src={`/assets/liquidstaking/${poolIdToDays[poolId]}d-logo.svg`}
      alt="stake period logo"
    />
    <Info title="Total vAPR" label={totalVAPR} textAlign="center" />
  </Box>
)

type LoadBarProps = {
  percent: number
  loading: boolean
  currentlyStaked: string
  stakingCap: string
}
const LoadBard = ({ percent, currentlyStaked, loading, stakingCap }: LoadBarProps) => (
  <>
    {/* Header */}
    <Stack color="text.low" fontSize={12} isInline justify="space-between" mt={3}>
      <Text fontWeight={'bold'}>Currently Staked</Text>
      <Text fontWeight={'bold'}>Staking Cap</Text>
    </Stack>
    {/* Loading Bar */}
    <Flex width={'full'} height="28px" shadow={'down'} rounded="2xl" my={2} p={1}>
      <Flex width={`${percent}%`} height="full" apply={'background.metalBrighter'} rounded="full" />
    </Flex>
    {/* Values */}
    <Flex
      fontSize={{ base: '11px', md: '14px' }}
      justify={'space-around'}
      width="full"
      mt={'-30px'}
    >
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>{currentlyStaked}</Text>
          <Text>{stakingCap}</Text>
        </>
      )}
    </Flex>
  </>
)

type InfoProps = { title: string; label: string }
const Info: React.FC<InfoProps & TextProps> = ({ title, label, ...props }) => (
  <>
    <Text color="text.low" fontSize="sm" {...props}>
      {title}
    </Text>
    <Text fontSize="lg" fontWeight="bold" {...props}>
      {label}
    </Text>
  </>
)
