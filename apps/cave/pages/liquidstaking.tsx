import { Button, Container, Flex, Heading, HStack, Text } from '@concave/ui'
import StakeCard from 'components/LiquidStaking/StakeCard'
import GraphicGuide from 'components/LiquidStaking/GraphicGuide'

interface StakingGroupProps {
  icon: string
  period: string
  vapr: string
  stakedCNV: string
  stakingLink: string
}

const StakingGroup: Array<StakingGroupProps> = [
  {
    icon: '12m',
    period: '12 months',
    vapr: '6,342',
    stakedCNV: '83,431',
    stakingLink: '',
  },
  {
    icon: '6m',
    period: '6 months',
    vapr: '1,002',
    stakedCNV: '42,690',
    stakingLink: '',
  },
  {
    icon: '3m',
    period: '3 months',
    vapr: '266',
    stakedCNV: '33,333',
    stakingLink: '',
  },
  {
    icon: '1m',
    period: '1 month',
    vapr: '17',
    stakedCNV: '690,420',
    stakingLink: '',
  },
]

function LiquidStaking() {
  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Container maxW="container.lg" borderRadius={0} border="" textAlign="center">
      <Heading as="h1" mt={16} mb={3} fontSize="5xl">
        Liquid Staking
      </Heading>
      <HStack mt={8} spacing={14}>
        <Text maxW={520} textAlign="right">
          Liquid Staking allows you to access your funds even when you&apos;re staking them. The
          funds remain in escrow, but aren&apos;t totally inaccessible. In this scenario, you are
          able to trade the locked-staking positions in the form of NFTs in the secondary
          marketplace.
        </Text>
        <GraphicGuide />
      </HStack>

      <Flex direction="row" gap={8} position="relative" mt={16}>
        {StakingGroup.map((s) => (
          <StakeCard
            icon={s.icon}
            period={s.period}
            vapr={s.vapr}
            stakedCNV={s.stakedCNV}
            stakingLink={s.stakingLink}
            key={s.period}
          />
        ))}
      </Flex>
      {/* <Modal
        bluryOverlay={true}
        title="Stake CNV"
        isOpen={isOpen}
        onClose={onClose}
        sx={{
          alignItems: 'center',
          gap: 1,
          shadow: 'Up for Blocks',
        }}
      ></Modal> */}
    </Container>
  )
}

export default LiquidStaking
