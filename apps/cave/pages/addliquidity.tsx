import { Flex, Heading } from '@concave/ui'
import { AddLiquidityCard } from 'components/LiquidityPool/AddLiquidity'
import React from 'react'

export default function AddLiquidity() {
  return (
    <>
      <Flex direction="column" justify="center" align="center" w="100%" h="full" gap={6}>
        <Heading fontSize="3xl" w="500px">
          Add liquidity
        </Heading>
        <AddLiquidityCard
          borderWidth={2}
          variant="primary"
          p={4}
          w="500px"
          gap={4}
          shadow="Up for Blocks"
        />
      </Flex>
    </>
  )
}
