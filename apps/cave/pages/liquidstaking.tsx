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
  const [isLargerThan1100] = useMediaQuery('(min-width: 1100px)')
  const [stakingGap, setStakingGap] = useState(8)
  const [wrap, setWrap] = useState<'wrap' | 'nowrap'>('nowrap')
  const [width, setWidth] = useState('')
  const [direction, setDirection] = useState<'row' | 'column'>('row')
  const [marginTop, setMarginTop] = useState(8)
  const [textAlign, setTextAlign] = useState<'justify' | 'center'>('justify')
  const [guideGap, setGuideGap] = useState(24)
  const [containerHeight, setConteinerHeight] = useState('')

  useEffect(() => {
    setStakingGap(isLargerThan1100 ? 8 : 3)
    setWrap(isLargerThan1100 ? 'nowrap' : 'wrap')
    setWidth(isLargerThan1100 ? '' : '530px')
    setDirection(isLargerThan1100 ? 'row' : 'column')
    setMarginTop(isLargerThan1100 ? 8 : 0)
    setTextAlign(isLargerThan1100 ? 'justify' : 'center')
    setGuideGap(isLargerThan1100 ? 24 : 7)
    setConteinerHeight(isLargerThan1100 ? '' : '1550px')
  }, [isLargerThan1100])

  return (
    <Box
      flex={1}
      width={'600px'}
      maxWidth="container.lg"
      overflow={'hidden'}
      m={'auto'}
      alignItems={'center'}
      textAlign="center"
      height={containerHeight}
    >
      <Heading as="h1" mt={16} fontSize="5xl">
        Liquid Staking
      </Heading>
      <Flex align={'center'} justify="center" direction={direction} mt={marginTop} gap={guideGap}>
        <Text maxW={520} textAlign={textAlign}>
          Stakers receive daily rewards to grow their <br /> CNV holdings and quarterly dividends
          <br />
          from Concave profits. Staking positions <br /> are represented by NFTs that are tradable
          <br />
          in Concave&apos;s native Marketplace.
        </Text>
        <GraphicGuide />
      </Flex>
      <LiquidLocksCards />
      <Flex alignItems="start" justifyContent="center" height="550">
        <Flex
          gap={stakingGap}
          justifyContent="center"
          alignItems="center"
          m={2}
          wrap={wrap}
          width={width}
        >
          {/* {StakingGroup.map((i) => {
            const { status, data, error, isFetching } = useGet_Last_Poolid_VaprQuery({
              poolID: i.poolID,
            })
            return (
              <StakeCard
                icon={i.icon}
                period={i.period}
                vAPR={status === 'success' && data.logStakingV1_PoolRewarded[0].base_vAPR}
                stakingLink={i.stakingLink}
                key={i.period}
              />
            )
          })} */}
        </Flex>
      </Flex>
    </Box>
  )
}

export default LiquidStaking
