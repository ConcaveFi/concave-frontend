import { ChevronRightIcon } from '@concave/icons'
import { Button, Card, Flex, Heading, Text } from '@concave/ui'
import { usePositionsState } from 'components/LiquidityPoolPositions/hooks/usePositionsState'
import { PairsAccordion } from 'components/LiquidityPoolPositions/MyPositions'
import { useRouter } from 'next/router'

export function LiquiditySnapshot() {
  const state = usePositionsState('user')
  const router = useRouter()
  return (
    <Card w="90%" h="85%" m="auto" p="10" variant="primary" shadow={'2xl'}>
      <Flex w="full" justify={'space-between'}>
        <Flex direction={'column'} align="start">
          <Heading fontWeight={'semibold'} variant="H5" apply="background.text-brightBlue">
            My liquidity position
          </Heading>
          <Text fontSize={'2xl'} color="text.low" fontWeight={'semibold'}>
            Liquidity provider rewards
          </Text>
        </Flex>
        <Button variant={'secondary'} size="lg" onClick={() => router.push('/pools')}>
          Go to Your pools <ChevronRightIcon />
        </Button>
      </Flex>
      <Text mb="5" textAlign={'start'} fontWeight="semibold" fontSize={'18px'} color="text.low">
        Liquidity providers earn a 0.25% fee on all trades proportional to their share of the pool.
        Fees are added to the pool, accrue in real time and can be claimed by withdrawing your
        liquidity.
      </Text>

      <PairsAccordion pairs={state.pairs} maxH="420px" />
    </Card>
  )
}
