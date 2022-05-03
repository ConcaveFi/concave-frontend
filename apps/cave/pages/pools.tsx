import { Flex, Heading, Text } from '@concave/ui'
import { MyPositions } from 'components/Positions/MyPositions'
import React from 'react'
import { useAccount } from 'wagmi'

export default function PositionsView() {
  const [{ data: account }] = useAccount()
  if (!account) {
    return <Text>Please, login</Text>
  }
  return (
    <Flex direction="column" mt={8} gap={6}>
      <Heading fontSize="2xl">My Liquidity Position</Heading>
      <MyPositions account={account} />
    </Flex>
  )
}
