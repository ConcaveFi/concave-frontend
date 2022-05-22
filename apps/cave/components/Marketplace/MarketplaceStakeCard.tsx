import { Card, Flex, useBreakpointValue, useMediaQuery } from '@concave/ui'
import { useEffect, useState } from 'react'
import StakeAprCard from './StakeAprCard'

function MarketplaceStakeCard(props: any) {
  const isLargerLayout = useBreakpointValue({ xl: true, base: false })

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

  return (
    <Card
      zIndex={2}
      gap={2}
      shadow="Block Up"
      w={{ xl: '300px', base: '460px' }}
      h={{ xl: '283px', md: '168px' }}
      style={{ alignContent: 'center', justifyContent: 'center' }}
      variant="secondary"
    >
      <Flex direction={{ xl: 'column', base: 'row' }} gap={-10} position="relative">
        {periods}
      </Flex>
    </Card>
  )
}

export default MarketplaceStakeCard
