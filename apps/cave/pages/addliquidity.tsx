import { Flex, Heading, Text } from '@concave/ui'
import { AddLiquidityCard } from 'components/AMM/AddLiquidity/AddLiquidity'
import { withPageTransition } from 'components/PageTransition'

export function AddLiquidity() {
  return (
    <>
      <Flex
        textAlign="center"
        direction="column"
        borderRadius={0}
        align={'center'}
        w={'100%'}
        gap={4}
      >
        <Heading
          fontSize={{ base: '4xl', sm: '5xl' }}
          apply="background.text-brightBlue"
          fontWeight="semibold"
          as="h1"
          mt={16}
          mb={3}
        >
          Add Liquidity Pools
        </Heading>
        <Flex
          apply="background.text-brightBlue"
          alignItems={'center'}
          justify="center"
          align="center"
          width="full"
          gap={10}
          mt={0}
        >
          <Text maxW={520} textAlign={'center'}>
            Tip: When you add liquidity, you will receive pool tokens representing your position.
            These tokens automatically earn fees proportional to your share of the pool, and can be
            redeemed at any time.
          </Text>
        </Flex>
        <Flex
          position="relative"
          direction="column"
          justify={'center'}
          float={'left'}
          align="center"
          width="full"
          mt={4}
        >
          <AddLiquidityCard />
        </Flex>
      </Flex>
    </>
  )
}

AddLiquidity.Meta = {
  title: 'Concave | Add Liquidity',
  description: `Add liquidity to Concave's liquidity pool to earn fees.`,
}

export default withPageTransition(AddLiquidity)
