<<<<<<< HEAD
<<<<<<< HEAD
import { SpinIcon } from '@concave/icons'
import { Card, Flex, Text } from '@concave/ui'
import { spinAnimation } from 'components/Treasury/Mobile/TreasuryManagementMobile'
import { useGet_All_Total_Pools_VaprQuery } from 'graphql/generated/graphql'
import { StakeAprCard } from './StakeAprCard'
=======
import { Flex, useBreakpointValue } from '@concave/ui'
import { GlassPanel } from 'components/Treasury/TreasuryManagementCard'
=======
import { Card, Flex, useBreakpointValue } from '@concave/ui'
>>>>>>> 5b8c2fabfe3fdf2264e3679e12c51bb9e925fec1
import { useEffect, useState } from 'react'
import StakeAprCard from './StakeAprCard'

function MarketplaceStakeCard(props: any) {
  const isLargerLayout = useBreakpointValue({ xl: true, base: true, md: false })

  const filters = [
    {
      title: '360 Days',
      length: '12m',
      marketvapr: 'Calculating',
      image: '/assets/marketplace/12mposition.png',
      diluted: true,
    },
    {
      title: '180 Days',
      length: '6m',
      marketvapr: 'Calculating',
      image: '/assets/marketplace/6mposition.png',
      diluted: false,
    },
    {
      title: '90 Days',
      length: '3m',
      marketvapr: 'Calculating',
      image: '/assets/marketplace/3mposition.png',
      diluted: false,
    },
    {
      title: '45 Days',
      length: '1m',
      marketvapr: 'Calculating',
      image: '/assets/marketplace/1mposition.png',
      diluted: false,
    },
  ]

  const [periods, setPeriods] = useState(null)

  useEffect(() => {
    setPeriods(
      filters.map((e, k) => {
        return (
          <StakeAprCard
            isLargerLayout={isLargerLayout}
            key={k}
            title={e.title}
            length={e.length}
            image={e.image}
            text={e.marketvapr}
            diluted={e.diluted}
          />
        )
      }),
    )
  }, [isLargerLayout])
>>>>>>> 487c38971d9fa0eb17e5b5902f30c56b7cd08383

export function MarketplaceStakeCard() {
  const { data, isLoading } = useGet_All_Total_Pools_VaprQuery()
  return (
    <Card
<<<<<<< HEAD
      px={6}
      py={10}
=======
>>>>>>> 5b8c2fabfe3fdf2264e3679e12c51bb9e925fec1
      zIndex={2}
      shadow="Block Up"
      w={{ base: '300px', md: '460px', xl: '300px' }}
      h={{ base: '283px', md: '168px', xl: '283px' }}
      style={{ alignContent: 'center', justifyContent: 'center' }}
<<<<<<< HEAD
      variant="secondary"
    >
      {!isLoading ? (
        data?.logStakingV1_PoolRewarded
          ?.sort((current, before) => (current.poolID < before.poolID ? 1 : -1))
          .map((e, k) => {
            return (
              <StakeAprCard
                vAPR={e.base_vAPR + data?.rebaseStakingV1[0][`bondVaprPool${e.poolID}`]}
                key={k}
                poolId={e.poolID}
                diluted
              />
            )
          })
      ) : (
        <Flex direction={'column'} align="center" gap={2}>
          <Text color={'text.low'} fontWeight={'bold'} fontSize="30px">
            Loading ...
          </Text>
          <SpinIcon animation={spinAnimation(2)} />
        </Flex>
      )}
=======
      justify="center"
      variant="secondary"
    >
      <Flex
        direction={{ md: 'row', base: 'column', xl: 'column' }}
        gap={{ base: -10, md: 5, xl: -10 }}
        position="relative"
      >
        {periods}
      </Flex>
>>>>>>> 5b8c2fabfe3fdf2264e3679e12c51bb9e925fec1
    </Card>
  )
}
