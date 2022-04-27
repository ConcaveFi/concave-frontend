import { Card, Flex, Heading, Text } from '@concave/ui'
import { AddLiquidityContent } from 'components/Positions/AddLiquidity'
import React from 'react'
import { useAccount } from 'wagmi'

export default function PositionsView() {
  const [{ data: account }] = useAccount()
  if (!account) {
    return <Text>Please, login</Text>
  }

  return (
    <Flex maxW="container.md" direction="column" justifyContent="center" h="full" gap={6}>
      <Heading fontSize="2xl">Add liquidity</Heading>
      <Card variant="primary" p={4} w={'500px'} gap={4} shadow={'Up for Blocks'}>
        <AddLiquidityContent userAddress={account.address} />
      </Card>
    </Flex>
  )
}
