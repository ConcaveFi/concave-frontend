import { Box, Button, Flex, Image, Stack, Text, TextProps, useDisclosure } from '@chakra-ui/react'
import { Percent } from '@concave/core'
import { stakingPools } from '@concave/marketplace'
import { Card, HStack } from '@concave/ui'
import { Loading } from 'components/Loading'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { compactFormat } from 'utils/bigNumberMask'

import { useAccount } from 'wagmi'
import { StakeData } from './hooks/useLiquidStakeData'
import { useLiquidValues } from './hooks/useLiquidValues'
import { StakeModal } from './StakeModal/StakeModal'

type StakeCardProps = {
  status: 'loading' | 'error' | 'idle' | 'success'
  poolId: number
  stakeData: StakeData
}
export const StakeCard = ({ status, poolId, stakeData }: StakeCardProps) => {
  const chainId = useCurrentSupportedNetworkId()
  const { address } = useAccount()
  const { data, isLoading } = useLiquidValues(chainId, poolId)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { stakingV1Pools, stakingV1Cap } = data || {}
  if (!stakingV1Pools?.balance)
    return (
      <HStack justifyContent={`space-around`} flex={1}>
        <Loading size="sm" isLoading={true} />
      </HStack>
    )

  const { totalVAPR } = stakeData || {}
  const pools = stakingV1Pools?.balance.toString() || '0'
  const poolsCapacity = stakingV1Cap?.add(stakingV1Pools?.balance).toString() || '0'
  const loadBarPercent = new Percent(pools, poolsCapacity)
  const loadBarProps = {
    percent: loadBarPercent,
    loading: isLoading,
    currentlyStaked: compactFormat(stakingV1Pools?.balance),
    stakingCap: compactFormat(stakingV1Pools?.balance?.add(stakingV1Cap)),
  } as const

  return (
    <>
      <Card
        variant="primary"
        p={[6, 4]}
        maxW={{ base: '180px', md: '240px' }}
        fontWeight={'bold'}
        align="center"
      >
        <ImageContainer
          poolId={poolId}
          totalVAPR={
            { loading: 'loading', error: 'error fetching', success: totalVAPR?.toFixed(2) + '%' }[
              status
            ]
          }
        />
        <LoadBar {...loadBarProps} />
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
        loadBar={<LoadBar {...loadBarProps} />}
        status={status}
        poolId={poolId}
        isOpen={isOpen}
        onClose={onClose}
        stakeData={stakeData}
      />
    </>
  )
}

type ImageContainerProps = {
  poolId: number
  totalVAPR: string
}
const ImageContainer: React.FC<ImageContainerProps> = ({ poolId, totalVAPR }) => (
  <Box w="full" py={5} shadow="down" borderRadius="full">
    <Info title="Stake pool" label={stakingPools[poolId].days + ' days'} textAlign="center" />
    <Image
      w={'120%'}
      userSelect={'none'}
      src={`/assets/liquidstaking/${stakingPools[poolId].days}d-logo.png`}
      alt="stake period logo"
    />
    <Info title="Total vAPR" label={totalVAPR} textAlign="center" />
  </Box>
)

type LoadBarProps = {
  percent: Percent
  loading: boolean
  currentlyStaked: string
  stakingCap: string
}
const LoadBar = ({ percent, currentlyStaked, loading, stakingCap }: LoadBarProps) => (
  <>
    {/* Header */}
    <Stack color="text.low" w="full" px={1} isInline justify="space-between" mt={3}>
      <Text fontSize={'xs'} fontWeight={'bold'}>
        Currently staked
      </Text>
      <Text fontSize={'xs'} fontWeight={'bold'}>
        Staking cap
      </Text>
    </Stack>
    {/* Loading Bar */}
    <Flex
      width={'full'}
      position="relative"
      height="32px"
      shadow={'down'}
      rounded="2xl"
      my={2}
      p={1}
    >
      <Flex w="full" height={'full'} overflow="hidden" rounded={'inherit'}>
        <Flex
          transform={`translateX(-${100 - +percent.toSignificant(3)}%)`}
          width={`full`}
          height="full"
          apply={'background.metalBrighter'}
          rounded="full"
        />
      </Flex>

      <Flex position={'absolute'} mx={-1} width="full" justify={'space-between'} px={3}>
        {loading && <Text>Loading...</Text>}
        {!loading && (
          <>
            <Text>{currentlyStaked}</Text>
            <Text>{stakingCap}</Text>
          </>
        )}
      </Flex>
    </Flex>
    {/* Values */}
  </>
)

const loadBarFontSize = {
  primary: { base: 'xs', md: 'sm' },
  secondary: 'sm',
}

const loadBarTextPx = {
  primary: '3',
  secondary: '10',
} as const

const loadBarTextJustify = {
  primary: 'space-between',
  secondary: 'space-between',
} as const

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
