import { Flex, Heading, Text } from '@concave/ui'
import { AddLiquidityCard } from 'components/LiquidityPool/AddLiquidity'
import React from 'react'

export default function AddLiquidity() {
  return (
    <>
      <Flex
        align={'center'}
        w={'100%'}
        borderRadius={0}
        gap={4}
        textAlign="center"
        direction="column"
      >
        <Heading as="h1" mt={16} mb={3} fontSize="5xl">
          Add Liquidity Pools
        </Heading>
        <Flex mt={0} align="center" gap={10} width="full" justify="center" alignItems={'center'}>
          <Text maxW={520} textAlign={'center'}>
            Tip: When you add liquidity, you will receive pool tokens representing your position.
            These tokens automatically earn fees proportional to your share of the pool, and can be
            redeemed at any time.
          </Text>
        </Flex>
        <Flex
          direction="column"
          float={'left'}
          position="relative"
          justify={'center'}
          align="center"
          width="full"
          p={4}
        >
          <AddLiquidityCard
            borderWidth={2}
            variant="primary"
            p={4}
            w="500px"
            gap={6}
            shadow="Up for Blocks"
          />
        </Flex>
      </Flex>
    </>
  )
}
