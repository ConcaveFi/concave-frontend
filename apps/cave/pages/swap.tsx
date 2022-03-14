import { Container, Flex, HStack } from '@concave/ui'
import React from 'react'
import GcnvTitle from 'components/GcnvTitle'
import { CandleStickCardMemo } from 'components/CandleStickCard'
import { SwapCard } from 'components/Swap/SwapCard'
import { useSwap } from 'components/Swap/useSwap'

const cardProps = {
  shadow: 'up',
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
            {...cardProps}
            w={['100%', 410, 500, 500]}
            bgImage="/assets/blackboard.png"
            align="stretch"
            backdropFilter={'blur(5px)'}
          />
          <SwapCard
            swap={swap}
            buttonLabel="Swap"
            active="swap"
            {...cardProps}
            w={['100%', 410, 500, 500, 400]}
            bgGradient="linear(to-tr, secondary.150, secondary.100)"
          />
        </Flex>
      </Flex>
    </Container>
  )
}

export default Swap
