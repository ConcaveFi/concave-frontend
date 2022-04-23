import { Card, Flex, Heading, Text } from '@concave/ui'
import { AddLiquidityContent } from 'components/Positions/AddLiquidity'
import { useRouter } from 'next/router'
import React from 'react'
import { useAccount } from 'wagmi'

export default function PositionsView() {
  const [{ data: account }] = useAccount()
  const router = useRouter()
  const { operation } = router.query
  if (!account) {
    return <Text>Please, login</Text>
  }

  return (
    <View title="Add liquidity">
      <Card variant="primary" p={4} w={'500px'} gap={4} shadow={'Up for Blocks'}>
        <AddLiquidityContent userAddress={account.address} />
      </Card>
    </View>
  )
}

const View = ({ title, children }) => {
  return (
    <Flex maxW="container.md" direction="column" justifyContent="center" h="full" gap={6}>
      <Heading fontSize="2xl">{title}</Heading>
      {children}
    </Flex>
  )
}
