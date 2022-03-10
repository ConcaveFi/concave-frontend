import { Container, Flex, HStack } from '@concave/ui'
import { useQuery } from '@apollo/client'
import React from 'react'
import GcnvTitle from 'components/GcnvTitle'
import { QUERY_TEST } from 'graphql/test'
import { CandleStickCardMemo } from 'components/CandleStickCard'
import { SwapCard } from 'components/Swap/SwapCard'
import { useSwap } from 'components/Swap/useSwap'

function Swap() {
  const { loading, error, data } = useQuery(QUERY_TEST)
  const swap = useSwap({
    inputTokens: ['XMR', 'ETH', 'DAI', 'FRAX'],
    outputTokens: ['XMR', 'ETH', 'DAI', 'FRAX'],
  })

  return (
    <Container maxW="container.xl">
      <Flex direction="column" gap={12}>
        <GcnvTitle title="Swap gCNV" description="Swap gCNV here" />
        <HStack gap={4} flexWrap="wrap" justify="center">
          <CandleStickCardMemo from={swap.from.symbol} to={swap.to.symbol} />
          <SwapCard swap={swap} buttonLabel="Swap" active="swap" />
        </HStack>
      </Flex>
    </Container>
  )
}

export default Swap
