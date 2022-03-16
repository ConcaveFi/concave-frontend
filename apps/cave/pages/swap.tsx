import { Container, Flex } from '@concave/ui'
import React from 'react'
import GcnvTitle from 'components/GcnvTitle'
import { CandleStickCardMemo } from 'components/CandleStickCard'
import { SwapCard } from 'components/Swap/SwapCard'
import { useSwap } from 'components/Swap/useSwap'

const cardProps = {
  h: [350, 400],
  gap: 2,
  p: 8,
}

function Swap() {
  const swap = useSwap({
    inputTokens: ['XMR', 'ETH', 'DAI', 'FRAX'],
    outputTokens: ['XMR', 'ETH', 'DAI', 'FRAX'],
  })

  return (
    <Container maxW="container.xl">
      <Flex direction="column" gap={12}>
        <GcnvTitle title="Swap gCNV" description="Swap gCNV here" />
        <Flex gap={4} flexWrap="wrap" justify="center">
          <CandleStickCardMemo
            from={swap.from.symbol}
            to={swap.to.symbol}
            variant="secondary"
            {...cardProps}
            w="100%"
            minW={410}
            maxW={500}
            align="stretch"
          />
          <SwapCard
            swap={swap}
            buttonLabel="Swap"
            variant="primary"
            active="swap"
            {...cardProps}
            w="100%"
            minW={410}
            maxW={500}
          />
        </Flex>
      </Flex>
    </Container>
  )
}

export default Swap
