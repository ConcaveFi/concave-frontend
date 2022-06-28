import { SpinIcon } from '@concave/icons'
import { Card, Flex, Text, useBreakpointValue, useMediaQuery } from '@concave/ui'
import { spinAnimation } from 'components/Treasury/Mobile/TreasuryManagementMobile'
import { GlassPanel } from 'components/Treasury/TreasuryManagementCard'
import { useGet_All_Total_Pools_VaprQuery } from 'graphql/generated/graphql'
import { useEffect, useState } from 'react'
import StakeAprCard from './StakeAprCard'

function MarketplaceStakeCard(props: any) {
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

  const { data, isLoading } = useGet_All_Total_Pools_VaprQuery()
  return (
    <Card
      px={6}
      py={10}
      zIndex={2}
      shadow="Block Up"
      w={{ base: '300px', md: '460px', xl: '300px' }}
      h={{ base: '283px', md: '168px', xl: '283px' }}
      style={{ alignContent: 'center', justifyContent: 'center' }}
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
    </Card>
  )
}

export default MarketplaceStakeCard
