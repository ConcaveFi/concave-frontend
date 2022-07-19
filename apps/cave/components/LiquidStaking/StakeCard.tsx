import { Box, Button, Flex, Image, Stack, Text, TextProps, useDisclosure } from '@chakra-ui/react'
import { Percent } from '@concave/core'
import { StakingPool } from '@concave/marketplace'
import { Card } from '@concave/ui'
import { utils } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { numberMask } from 'utils/numberMask'
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

  const loadBarPercent = new Percent(
    stakingV1Pools?.balance?.toString() || '0',
    stakingV1Cap?.toString() || '0',
  )

  const loadBarProps = {
    percent: loadBarPercent,
    loading: isLoading,
    currentlyStaked: numberMask(+utils.formatEther(stakingV1Pools?.balance || 0)),
    stakingCap: numberMask(+utils.formatEther(stakingV1Pools?.balance?.add(stakingV1Cap) || 0)),
  } as const

  return (
    <>
      <Card
        variant="primary"
        p={[6, 4]}
        maxW={{ base: '160px', md: '200px' }}
        fontWeight={'bold'}
        align="center"
      >
        <ImageContainer stakingPool={props.stakeData} totalVAPR={totalVAPR?.toFixed(2) + '%'} />
        <LoadBar variant="primary" {...loadBarProps} />
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
        loadBar={<LoadBar variant="secondary" {...loadBarProps} />}
        isOpen={isOpen}
        onClose={onClose}
        stakeData={props.stakeData}
      />
    </>
  )
}

type ImageContainerProps = { stakingPool: StakingPool; totalVAPR: string }
const ImageContainer: React.FC<ImageContainerProps> = ({ stakingPool, totalVAPR }) => (
  <Box py={5} h={{ base: '290px', md: '333px' }} shadow="down" borderRadius="100px/90px">
    <Info title="Stake pool" label={stakingPool.days + ' days'} textAlign="center" />
    <Image
      userSelect={'none'}
      src={`/assets/liquidstaking/${stakingPool.days}d-logo.svg`}
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
  variant: 'primary' | 'secondary'
}
const LoadBar = ({ percent, currentlyStaked, loading, stakingCap, variant }: LoadBarProps) => (
  <>
    {/* Header */}
    <Stack color="text.low" fontSize={12} isInline justify="space-between" mt={3}>
      <Text fontWeight={'bold'}>Currently staked</Text>
      <Text fontWeight={'bold'}>Staking cap</Text>
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
      <Flex
        width={`${percent.toSignificant(3)}%`}
        height="full"
        apply={'background.metalBrighter'}
        rounded="full"
      />
      <Flex
        position={'absolute'}
        mx={-1}
        fontSize={loadBarFontSize[variant]}
        justify={loadBarTextJustify[variant]}
        width="full"
        px={loadBarTextPx[variant]}
        fontWeight={'bold'}
      >
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
  secondary: 'md',
}

const loadBarTextPx = {
  primary: '0',
  secondary: '10',
} as const

const loadBarTextJustify = {
  primary: 'space-around',
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
