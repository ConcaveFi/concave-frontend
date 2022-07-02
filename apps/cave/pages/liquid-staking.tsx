import { Flex, Heading, Text } from '@concave/ui'
import GraphicGuide from 'components/LiquidStaking/GraphicGuide'
import { useLiquidStakeData } from 'components/LiquidStaking/hooks/useLiquidStakeData'
import { useLiquidValues } from 'components/LiquidStaking/hooks/useLiquidValues'
import LiquidLocksCards from 'components/LiquidStaking/LiquidLocksCards'
import { StakeCard } from 'components/LiquidStaking/StakeCard'
import StakeCardOld from 'components/LiquidStaking/StakeCard_old'
import { withPageTransition } from 'components/PageTransition'
import { truncateNumber } from 'utils/truncateNumber'

interface StakingGroupProps {
  icon: string
  period: string
  stakingLink: string
  poolID: number
}

const StakingGroup: Array<StakingGroupProps> = [
  {
    icon: '360d',
    period: '360 days',
    stakingLink: '',
    poolID: 0,
  },
  {
    icon: '180d',
    period: '180 days',
    stakingLink: '',
    poolID: 1,
  },
  {
    icon: '90d',
    period: '90 days',
    stakingLink: '',
    poolID: 2,
  },
  {
    icon: '45d',
    period: '45 days',
    stakingLink: '',
    poolID: 3,
  },
]

function LiquidStaking() {
  const { stakeData } = useLiquidStakeData()

  return (
    <Flex
      width={{ base: 'full', xl: 'full', lg: 'full', md: 'full' }}
      justify={'start'}
      align="center"
      direction={'column'}
      p="0px"
    >
      <Heading as="h1" mt={{ base: 12, md: 8 }} fontSize={{ base: '4xl', sm: '5xl' }}>
        Liquid Staking
      </Heading>
      <Flex
        align={'center'}
        justify="center"
        direction={{ xl: 'row', base: 'column' }}
        mt={{ xl: 8, base: 0 }}
        gap={{ xl: 24, base: 2 }}
        textColor="white"
      >
        <Text
          maxW={520}
          textAlign={{ xl: 'justify', base: 'center' }}
          fontSize={{ base: 'sm', sm: 'md' }}
        >
          Stakers are incentivized with daily rewards and <br /> quarterly dividends to grow their
          CNV holdings
          <br />
          with profit from the protocol. Staked positions
          <br />
          are represented by NFTs that are tradable
          <br />
          in Concave&apos;s native Marketplace.
        </Text>
        <GraphicGuide />
      </Flex>
      <Flex
        alignItems="start"
        justifyContent="center"
        maxW={{ base: '330px', md: '420px', lg: '450px', xl: 'full' }}
        height={{ xl: '550px', base: '1100px' }}
      >
        <Flex
          gap={{ xl: 8, lg: 8, base: 1, md: 3 }}
          justifyContent="center"
          alignItems="center"
          wrap={{ xl: 'nowrap', base: 'wrap' }}
        >
          {stakeData?.map((stake, index) => (
            <StakeCard key={index} props={stake} />
          ))}
          {/* {StakingGroup.map((i) => {
            return (
              <StakeCardOld
                icon={i.icon}
                period={i.period}
                poolId={i.poolID}
                stakingLink={i.stakingLink}
                key={i.period}
              />
            )
          })} */}
        </Flex>
      </Flex>
      <LiquidLocksCards />
    </Flex>
  )
}

LiquidStaking.Meta = {
  title: `Concave | Liquid Staking`,
  description: `With Liquid Staking, positions receive boosted rewards based on term length. Investors in the longest-term positions will receive the highest returns.`,
}

export default withPageTransition(LiquidStaking)
