import { ChevronRightIcon } from '@concave/icons'
import { Button, Card, Flex, Heading, Text } from '@concave/ui'
import { usePositionsState } from 'components/LiquidityPoolPositions/hooks/usePositionsState'
import { PairsAccordion } from 'components/LiquidityPoolPositions/MyPositions'
import { useRouter } from 'next/router'

export function LiquiditySnapshot() {
  const state = usePositionsState('user')
  const router = useRouter()
  return (
    <Card w="90%" h="100%" m="auto" p="10" variant="primary" shadow={'2xl'}>
      <Flex
        gap={4}
        w="full"
        justify={'space-between'}
        direction={{ base: 'column-reverse', xl: 'row' }}
      >
        <Flex direction={'column'} align={{ base: 'center', xl: 'start' }}>
          <Heading
            fontSize={{ base: 'lg' }}
            fontWeight={'semibold'}
            variant="H5"
            apply="background.text-brightBlue"
          >
            My liquidity position
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'xl' }} color="text.bright" fontWeight={'semibold'}>
            Liquidity provider rewards
          </Text>
        </Flex>
        <Button variant={'secondary'} size="lg" onClick={() => router.push('/pools')}>
          Go to Your pools <ChevronRightIcon />
        </Button>
      </Flex>
      <Text
        mb="5"
        textAlign={{ base: 'center', xl: 'start' }}
        fontSize={{ base: 'md', lg: '18px' }}
        color="text.low"
      >
        Liquidity providers earn a 0.25% fee on all trades proportional to their share of the pool.
        Fees are added to the pool, accrue in real time and can be claimed by withdrawing your
        liquidity.
      </Text>

      <PairsAccordion pairs={state.pairs} maxH="420px" />
    </Card>
  )
}
