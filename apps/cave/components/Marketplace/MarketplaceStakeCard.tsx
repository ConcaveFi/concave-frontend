import { Card, Flex } from '@concave/ui'
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

  return (
    <Card
      p={7}
      gap={2}
      shadow="Block Up"
      w="300px"
      h="283px"
      style={{ alignContent: 'center', justifyContent: 'center' }}
    >
      <Flex direction="column" gap={-10} position="relative" mt={-2}>
        {filters.map((e, k) => {
          return (
            <StakeAprCard
              key={k}
              title={e.title}
              length={e.length}
              image={e.image}
              text={e.marketvapr}
              diluted={e.diluted}
            />
          )
        })}
      </Flex>
    </Card>
  )
}

export default MarketplaceStakeCard
