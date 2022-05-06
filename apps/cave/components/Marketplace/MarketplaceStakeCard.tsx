import { Card, Flex, useMediaQuery } from '@concave/ui'
import { useEffect, useState } from 'react'
import StakeAprCard from './StakeAprCard'

function MarketplaceStakeCard(props: any) {
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)')
  const [direction, setDirection] = useState<'row' | 'column'>('column')
  const [width, setWidth] = useState('300px')
  const [height, setHeight] = useState('283px')

  useEffect(() => {
    setDirection(isLargerThan1200 ? 'column' : 'row')
    setHeight(isLargerThan1200 ? '283px' : '168px')
    setWidth(isLargerThan1200 ? '300px' : '460px')
  }, [isLargerThan1200])
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
      title: '180 Days',
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
            isLargerThan1200={isLargerThan1200}
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
  }, [isLargerThan1200])

  return (
    <Card
      zIndex={2}
      p={7}
      gap={2}
      shadow="Block Up"
      w={width}
      h={height}
      style={{ alignContent: 'center', justifyContent: 'center' }}
      variant="secondary"
    >
      <Flex direction={direction} gap={-10} position="relative" mt={-2}>
        {periods}
      </Flex>
    </Card>
  )
}

export default MarketplaceStakeCard
