import { Box, Flex, Heading, Text } from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import { MyPositions } from 'components/LiquidityPoolPositions/MyPositions'
import { usePositionsState } from 'components/LiquidityPoolPositions/hooks/usePositionsState'

const Pools = () => {
  const state = usePositionsState()
  return (
    <Box w={'100%'} overflowY={'hidden'} apply="scrollbar.secondary">
      <Flex
        align={'center'}
        w={'100%'}
        borderRadius={0}
        gap={4}
        textAlign="center"
        direction="column"
      >
        <>
          <Heading as="h1" mt={16} mb={3} fontSize="5xl">
            {'Liquidity Pools'}
          </Heading>
          <Flex mt={0} align="center" gap={10} width="full" justify="center" alignItems={'center'}>
            <Text maxW={520} textAlign={'center'}>
              Liquidity providers earn a 0.25% fee on all trades proportional to their share of the
              pool. Fees are added to the pool, accrue in real time and can be claimed by
              withdrawing your liquidity.
            </Text>
          </Flex>

          <Flex
            direction="column"
            float={'left'}
            position="relative"
            justify={'center'}
            align="center"
            width="full"
            gap={5}
            p={{ base: 0, sm: 4 }}
          >
            <MyPositions state={state} />
          </Flex>
        </>
      </Flex>
    </Box>
  )
}

Pools.Meta = {
  title: 'Concave | Liquidity Pools',
  description: `View your Liquidity Pool Positions and add liquidity to Concave supported pools. It is a pool of two tokens that allows users to exchange between them.`,
}

export default withPageTransition(Pools)
