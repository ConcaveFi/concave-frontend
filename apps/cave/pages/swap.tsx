import { SpinIcon } from '@concave/icons'
import { Flex } from '@concave/ui'
import { CandleStickCardMemo } from 'components/CandleStickCard'
import GcnvTitle from 'components/GcnvTitle'
import { SwapCard } from 'components/Swap/SwapCard'
import { useSwap } from 'components/Swap/useSwap'
import React from 'react'

const cardProps = {
  h: [350, 400],
  gap: 2,
  p: 6,
}

function Swap() {
  const swap = useSwap({
    inputTokens: ['WETH', 'BTC', 'WAVES', 'USDT', 'NEO', 'LINK', 'XMR', 'ETH', 'DAI'],
    outputTokens: ['XMR', 'ETH', 'DAI', 'FRAX'],
  })

  return (
    <Flex direction="column" gap={12}>
      {/* TODO: Solve bug on SwapStatus, i dont know why, but with the popover on settings swap */}
      <SpinIcon></SpinIcon>

      <GcnvTitle title="Swap gCNV" description="Swap gCNV here" />

      <Flex gap={4} flexWrap="wrap" justify="center">
        <CandleStickCardMemo
          from={swap.from.symbol}
          to={swap.to.symbol}
          variant="secondary"
          {...cardProps}
          h={['100%', 470, 400]}
          w={['100%', '100%', 500, 567, 567]}
          align="stretch"
        />
        <SwapCard
          swap={swap}
          buttonLabel="Swap"
          variant="primary"
          active="swap"
          {...cardProps}
          h={['100%', 400]}
          w={['100%', '100%', 500, 567, 400]}
        />
      </Flex>
    </Flex>
  )
}

export default Swap
