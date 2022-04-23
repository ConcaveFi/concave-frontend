import { Flex, Heading, Text } from '@concave/ui'
import { MyPositions } from 'components/Positions/MyPositions'
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
    <View title="My Liquidity Position">
      <MyPositions account={account} />
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
