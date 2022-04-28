import { Container, Flex, Heading, HStack, Text, useMediaQuery } from '@concave/ui'
import StakeCard from 'components/LiquidStaking/StakeCard'
import GraphicGuide from 'components/LiquidStaking/GraphicGuide'

interface StakingGroupProps {
  icon: string
  period: string
  vapr: string
  stakingLink: string
}

const StakingGroup: Array<StakingGroupProps> = [
  {
    icon: '360d',
    period: '360 days',
    vapr: '6,342',
    stakingLink: '',
  },
  {
    icon: '180d',
    period: '180 days',
    vapr: '1,002',
    stakingLink: '',
  },
  {
    icon: '90d',
    period: '90 days',
    vapr: '266',
    stakingLink: '',
  },
  {
    icon: '45d',
    period: '45 days',
    vapr: '17',
    stakingLink: '',
  },
]

function LiquidStaking() {
  const [isLargerThan1200] = useMediaQuery('(min-width: 1300px)')
  const [isLargerThan950] = useMediaQuery('(min-width: 950px)')
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

      <Flex
        alignItems="start"
        bg={'black'}
        justifyContent="center"
        border=" 2px solid  white"
        height="700"
      >
        <Flex justifyContent="center" alignItems="center" bg={'yellow'} m={2} wrap="wrap">
          {StakingGroup.map((s) => (
            <StakeCard
              icon={s.icon}
              period={s.period}
              vapr={s.vapr}
              stakingLink={s.stakingLink}
              key={s.period}
            />
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}

export default LiquidStaking

{
  /* <Flex
          direction={'row'}
          gap={8}
          position="relative"
          mt={isLargerThan950 ? 16 : 0}
          border=" 2px solid  white"
          maxWidth={!isLargerThan950 ? 700 : {}}
          wrap={isLargerThan1200 ? 'nowrap' : 'wrap'}
          transform={!isLargerThan1200 ? 'scale(0.7)' : ''}
          transition="all"
          transitionDuration={'0.4s'}
          justifyContent="center"
          alignItems={'start'}
        >
          {StakingGroup.map((s) => (
            <StakeCard
              icon={s.icon}
              period={s.period}
              vapr={s.vapr}
              stakingLink={s.stakingLink}
              key={s.period}
            />
          ))}
        </Flex> */
}
