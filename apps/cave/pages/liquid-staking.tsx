import { Box, Card, Flex, Heading, Text, useMediaQuery } from '@concave/ui'
import StakeCard from 'components/LiquidStaking/StakeCard'
import GraphicGuide from 'components/LiquidStaking/GraphicGuide'
import { useEffect, useState } from 'react'
import {
  useGet_Last_Poolid_VaprQuery,
  useGet_Stakingv1_Last100_LockQuery,
} from 'graphql/generated/graphql'
import { formatEther } from 'ethers/lib/utils'
import LiquidLocksCards from 'components/LiquidStaking/LiquidLocksCards'
import { withPageTransition } from 'components/PageTransition'

interface StakingGroupProps {
  icon: string
  period: string
  vapr: string
  stakingLink: string
  poolID: number
}

const StakingGroup: Array<StakingGroupProps> = [
  {
    icon: '360d',
    period: '360 days',
    vapr: '6,342',
    stakingLink: '',
    poolID: 0,
  },
  {
    icon: '180d',
    period: '180 days',
    vapr: '1,002',
    stakingLink: '',
    poolID: 1,
  },
  {
    icon: '90d',
    period: '90 days',
    vapr: '266',
    stakingLink: '',
    poolID: 2,
  },
  {
    icon: '45d',
    period: '45 days',
    vapr: '17',
    stakingLink: '',
    poolID: 3,
  },
]

function LiquidStaking() {
  return (
    <Flex
      width={{ base: 'full', xl: 'full', lg: 'full', md: 'full' }}
      justify={'start'}
      align="center"
      direction={'column'}
    >
      <Heading as="h1" mt={8} fontSize={{ base: '4xl', sm: '5xl' }}>
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
        <Text textAlign={{ xl: 'justify', base: 'center' }} fontSize={{ base: 'sm', sm: 'md' }}>
          Stakers receive daily rewards to grow their <br /> CNV holdings and quarterly dividends
          <br />
          from Concave profits. Staking positions <br /> are represented by NFTs that are tradable
          <br />
          in Concave&apos;s native Marketplace.
        </Text>
        <GraphicGuide />
      </Flex>
      <Flex
        justifyContent="center"
        maxW={{ base: '330px', md: '420px', xl: 'full' }}
        // height={{ xl: '550px', base: '1100px' }}
      >
        <Flex
          gap={{ xl: 8, base: 1, md: 3 }}
          justifyContent="center"
          alignItems="center"
          wrap={{ xl: 'nowrap', base: 'wrap' }}
        >
          {StakingGroup.map((i) => {
            return (
              <StakeCard
                icon={i.icon}
                period={i.period}
                poolId={i.poolID}
                stakingLink={i.stakingLink}
                key={i.period}
              />
            )
          })}
        </Flex>
      </Flex>
      <LiquidLocksCards />
    </Flex>
  )
}

LiquidStaking.Meta = {
  title: 'Concave | Liquid Staking',
  description: `With Liquid Staking, positions receive boosted rewards based on term length. Investors in the longest-term positions will receive the highest returns.`,
}

export default withPageTransition(LiquidStaking)
