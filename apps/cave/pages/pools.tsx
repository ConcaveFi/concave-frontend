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
    <Flex maxW="container.md" direction="column" justifyContent="center" h="full" gap={6}>
      <Heading fontSize="2xl">My Liquidity Position</Heading>
      <MyPositions account={account} />
    </Flex>
  )
}
