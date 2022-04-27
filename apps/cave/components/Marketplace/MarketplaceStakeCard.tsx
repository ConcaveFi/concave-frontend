import { Card, Flex } from '@concave/ui'
import StakeAprCard from './StakeAprCard'

function MarketplaceStakeCard(props: any) {
  const filters = [
    {
      title: '12 Month',
      length: '12m',
      marketvapr: '6342%',
      image: '/assets/marketplace/12mposition.png',
      diluted: true,
    },
    {
      title: '6 Month',
      length: '6m',
      marketvapr: '1002%',
      image: '/assets/marketplace/6mposition.png',
      diluted: false,
    },
    {
      title: '3 Month',
      length: '3m',
      marketvapr: '266%',
      image: '/assets/marketplace/3mposition.png',
      diluted: false,
    },
    {
      title: '1 Month',
      length: '1m',
      marketvapr: '17%',
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
